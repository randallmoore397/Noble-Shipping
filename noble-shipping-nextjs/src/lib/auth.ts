import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Bootstrap: Create default admin if none exists (idempotent check)
                try {
                    const adminCountResult = await db.sql`
                        SELECT COUNT(*) as count 
                        FROM user u
                        JOIN roles_users ru ON u.id = ru.user_id
                        JOIN role r ON ru.role_id = r.id
                        WHERE r.name = 'Admin'
                    `
                    const adminCount = adminCountResult[0]?.count || 0

                    if (adminCount === 0) {
                        console.log('No admin users found, creating default admin...')

                        // Create default admin user
                        const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@nobleshipping.com'
                        const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'
                        const hashedPassword = await bcrypt.hash(defaultPassword, 10)

                        // Ensure Admin role exists
                        await db.sql`
                            INSERT OR IGNORE INTO role (name, description) 
                            VALUES ('Admin', 'Administrator role with full access')
                        `

                        // Create admin user
                        const userResult = await db.sql`
                            INSERT INTO user (user_id, email, password, active, current_login_at, login_count, DateCreated)
                            VALUES ('SUP-MAX001', ${defaultEmail}, ${hashedPassword}, 1, ${new Date().toISOString()}, 0, ${new Date().toISOString()})
                            RETURNING id
                        `
                        
                        const userId = userResult[0]?.id
                        
                        // Get Admin role ID
                        const roleResult = await db.sql`SELECT id FROM role WHERE name = 'Admin'`
                        const roleId = roleResult[0]?.id
                        
                        // Link user to Admin role
                        await db.sql`
                            INSERT INTO roles_users (user_id, role_id) 
                            VALUES (${userId}, ${roleId})
                        `

                        // Create staff record
                        await db.sql`
                            INSERT INTO staffs (user_id, first_name, last_name, position, gender, user_attribute, profile_pic, datetime)
                            VALUES (${userId}, 'System', 'Administrator', 'System Admin', 'Male', 'Admin', 'default.png', ${new Date().toISOString()})
                        `

                        console.log(`Default admin created: ${defaultEmail}`)
                    }
                } catch (error) {
                    console.error('Default admin creation error:', error)
                    // Continue with login attempt even if bootstrap fails
                }

                const userResults = await db.sql`
                    SELECT u.*, r.name as role_name, s.first_name, s.last_name, s.position
                    FROM user u
                    LEFT JOIN roles_users ru ON u.id = ru.user_id
                    LEFT JOIN role r ON ru.role_id = r.id
                    LEFT JOIN staffs s ON u.id = s.user_id
                    WHERE u.email = ${credentials.email}
                `
                
                if (userResults.length === 0) {
                    return null
                }
                
                const userData = userResults[0]
                const user = {
                    ...userData,
                    roles: userResults.map(row => ({ name: row.role_name })).filter(r => r.name),
                    Staffs: userResults.filter(row => row.first_name).map(row => ({
                        first_name: row.first_name,
                        last_name: row.last_name,
                        position: row.position
                    }))
                }

                if (!user || !user.active) {
                    return null
                }

                // Verify user has at least one role (matches Flask-Security expectations)
                if (!user.roles || user.roles.length === 0) {
                    console.warn(`User ${user.email} has no roles assigned, denying login`)
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    return null
                }

                // Update login info
                // Get IP from request if possible, otherwise null
                // Note: In NextAuth v4 authorize callback, req is available
                const ip = req?.headers?.['x-forwarded-for'] || null

                try {
                    await db.sql`
                        UPDATE user 
                        SET current_login_at = ${new Date().toISOString()},
                            current_login_ip = ${typeof ip === 'string' ? ip : null},
                            login_count = login_count + 1
                        WHERE id = ${user.id}
                    `
                } catch (error) {
                    console.error('Failed to update login info:', error)
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    user_id: user.user_id,
                    roles: user.roles.map(r => r.name),
                    staff: user.Staffs[0] || null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = typeof user.id === 'string' ? parseInt(user.id) : user.id
                token.user_id = user.user_id
                token.roles = user.roles
                token.staff = user.staff
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number
                session.user.user_id = token.user_id as string
                session.user.roles = token.roles as string[]
                session.user.staff = token.staff as any
            }
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
}
