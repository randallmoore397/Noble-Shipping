// Authentication and Authorization Helper Functions
// Reusable helpers for protecting API routes and checking permissions

import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { db } from './prisma'
import type { UserWithRoles, Staff } from './types'

/**
 * Require Authentication
 * Throws error if user is not authenticated
 * Returns authenticated user with roles and staff profile
 */
export async function requireAuth(): Promise<UserWithRoles> {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error('Authentication required')
    }

    // Fetch full user data with roles and staff profile
    const userResults = await db.sql`
        SELECT u.*, r.name as role_name, s.*
        FROM user u
        LEFT JOIN roles_users ru ON u.id = ru.user_id
        LEFT JOIN role r ON ru.role_id = r.id
        LEFT JOIN staffs s ON u.id = s.user_id
        WHERE u.id = ${session.user.id}
    `
    
    if (userResults.length === 0) {
        throw new Error('User not found')
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

    if (!user) {
        throw new Error('User not found')
    }

    if (!user.active) {
        throw new Error('User account is inactive')
    }

    return user as UserWithRoles
}

/**
 * Require Specific Role(s)
 * Checks if user has at least one of the specified roles (case-insensitive)
 * Accepts single role string or array of roles
 * Matches Flask-Security's @roles_accepted decorator
 */
export async function requireRole(roles: string | string[]): Promise<UserWithRoles> {
    const user = await requireAuth()

    const roleNames = user.roles.map(r => r.name.toLowerCase())
    const requiredRoles = Array.isArray(roles) ? roles : [roles]
    const requiredRolesLower = requiredRoles.map(r => r.toLowerCase())

    const hasRole = requiredRolesLower.some(role => roleNames.includes(role))

    if (!hasRole) {
        throw new Error(`Required role(s): ${requiredRoles.join(', ')}`)
    }

    return user
}

/**
 * Require All Specified Roles
 * Checks if user has ALL of the specified roles (case-insensitive)
 * Matches Flask-Security's @roles_required decorator
 */
export async function requireAllRoles(roles: string[]): Promise<UserWithRoles> {
    const user = await requireAuth()

    const roleNames = user.roles.map(r => r.name.toLowerCase())
    const requiredRolesLower = roles.map(r => r.toLowerCase())

    const hasAllRoles = requiredRolesLower.every(role => roleNames.includes(role))

    if (!hasAllRoles) {
        throw new Error(`Required all roles: ${roles.join(', ')}`)
    }

    return user
}

/**
 * Require Admin Role
 * Shorthand for admin-only access
 */
export async function requireAdmin(): Promise<UserWithRoles> {
    return requireRole('Admin')
}

/**
 * Get Current User
 * Returns current user or null if not authenticated
 * Does not throw error
 */
export async function getCurrentUser(): Promise<UserWithRoles | null> {
    try {
        return await requireAuth()
    } catch {
        return null
    }
}

/**
 * Check if User Has Role
 * Returns boolean without throwing error
 */
export async function hasRole(role: string): Promise<boolean> {
    try {
        await requireRole(role)
        return true
    } catch {
        return false
    }
}

/**
 * Check if User is Admin
 * Returns boolean without throwing error
 */
export async function isAdmin(): Promise<boolean> {
    return hasRole('Admin')
}

/**
 * Check if User is Staff
 * Returns boolean without throwing error
 */
export async function isStaff(): Promise<boolean> {
    return hasRole('Staff')
}

/**
 * Update Login Information
 * Updates login timestamp, IP address, and login count
 */
export async function updateLoginInfo(
    userId: number,
    ipAddress: string
): Promise<void> {
    await db.sql`
        UPDATE user 
        SET current_login_at = ${new Date().toISOString()},
            current_login_ip = ${ipAddress},
            login_count = login_count + 1
        WHERE id = ${userId}
    `
}

/**
 * Check User Active Status
 * Verifies if user account is active
 */
export function checkUserActive(user: UserWithRoles): boolean {
    return user.active
}

/**
 * Get User's Staff Profile
 * Returns first staff profile or null
 */
export function getUserStaffProfile(user: UserWithRoles): Staff | null {
    return user.Staffs && user.Staffs.length > 0 ? user.Staffs[0] : null
}

/**
 * Check if User Has Any of Multiple Roles
 * Returns true if user has at least one of the specified roles
 */
export function userHasAnyRole(user: UserWithRoles, roles: string[]): boolean {
    const userRoleNames = user.roles.map(r => r.name)
    return roles.some(role => userRoleNames.includes(role))
}

/**
 * Check if User Has All Specified Roles
 * Returns true only if user has all specified roles
 */
export function userHasAllRoles(user: UserWithRoles, roles: string[]): boolean {
    const userRoleNames = user.roles.map(r => r.name)
    return roles.every(role => userRoleNames.includes(role))
}

/**
 * Get User Role Names
 * Returns array of role names for the user
 */
export function getUserRoles(user: UserWithRoles): string[] {
    return user.roles.map(r => r.name)
}
