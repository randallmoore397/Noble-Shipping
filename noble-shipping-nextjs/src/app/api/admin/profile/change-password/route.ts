import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const { current_password, new_password, email } = await request.json();

    // Verify email matches current user
    if (email && email !== user.email) {
      return errorResponse('Email does not match current user', null, 400);
    }

    // Fetch full user record with password from database
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, password: true }
    });

    if (!userWithPassword) {
      return errorResponse('User not found', null, 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(current_password, userWithPassword.password);
    if (!isCurrentPasswordValid) {
      return errorResponse('The Old Password you enter does not match, Try again', null, 400);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    });

    return successResponse(null, `Account Password has been reset for ${user.email}`);
  } catch (error: any) {
    console.error('Password change error:', error);
    return errorResponse(error.message || 'Failed to change password', null, 500);
  }
}