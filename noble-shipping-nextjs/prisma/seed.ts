import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role with full access'
    }
  })

  const staffRole = await prisma.role.upsert({
    where: { name: 'Staff' },
    update: {},
    create: {
      name: 'Staff',
      description: 'Staff role with limited access'
    }
  })

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nobleshipping.com' },
    update: {},
    create: {
      user_id: 'admin001',
      email: 'admin@nobleshipping.com',
      password: hashedPassword,
      active: true,
      roles: {
        connect: { id: adminRole.id }
      }
    }
  })

  // Create staff profile for admin
  const existingStaff = await prisma.staffs.findFirst({
    where: { user_id: adminUser.id }
  })

  if (!existingStaff) {
    await prisma.staffs.create({
      data: {
        user_id: adminUser.id,
        first_name: 'System',
        last_name: 'Administrator',
        position: 'System Administrator',
        gender: 'Male',
        telephone_phone: '+231-770-961-810',
        mobile: '+231-770-961-810',
        address: 'ELWA Paynesville City, Liberia'
      }
    })
  }

  console.log('Admin setup completed successfully')
  console.log('Admin credentials: admin@nobleshipping.com / admin123')
  console.log('Real cargo data available from SQLite Cloud database')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })