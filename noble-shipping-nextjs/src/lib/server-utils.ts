import { db } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function generateUserId(role: string = 'staff'): Promise<string> {
    const prefix = role.toLowerCase() === 'admin' ? 'ADM' : 'STF'

    // Get the latest user ID to increment
    // This is a simple implementation. In a high-concurrency env, use a sequence or UUID.
    const result = await db.sql(`
    SELECT user_id FROM user 
    WHERE user_id LIKE '${prefix}%' 
    ORDER BY id DESC LIMIT 1
  `)

    let nextNum = 1
    if (result.length > 0) {
        const lastId = result[0].user_id
        const numPart = parseInt(lastId.replace(prefix, ''))
        if (!isNaN(numPart)) {
            nextNum = numPart + 1
        }
    }

    return `${prefix}${nextNum.toString().padStart(4, '0')}`
}

export async function saveProfilePicture(file: File): Promise<string> {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type')
    }

    const filename = `${uuidv4()}${path.extname(file.name)}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles')

    try {
        await writeFile(path.join(uploadDir, filename), buffer)
        return filename
    } catch (error) {
        console.error('Error saving profile picture:', error)
        throw new Error('Failed to save profile picture')
    }
}
