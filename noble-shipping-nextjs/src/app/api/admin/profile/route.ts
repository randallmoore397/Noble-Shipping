import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';
import { successResponse, errorResponse } from '@/lib/api-response';
import { saveProfilePicture } from '@/lib/server-utils';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, DEFAULT_PROFILE_PIC } from '@/lib/constants';

export async function GET() {
  try {
    const user = await requireAuth();

    // Fetch user with Staffs and roles
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        Staffs: true,
        roles: true
      }
    });

    if (!fullUser) {
      return errorResponse('User not found', null, 404);
    }

    const { password, ...userWithoutPassword } = fullUser;
    return successResponse({
      user: userWithoutPassword,
      staff: fullUser.Staffs[0] || null
    }, 'Profile fetched successfully');
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return errorResponse(error.message || 'Failed to fetch profile', null, 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Parse FormData for file upload support
    const formData = await request.formData();

    // Extract fields
    const first_name = formData.get('first_name') as string;
    const middle_name = formData.get('middle_name') as string || '';
    const last_name = formData.get('last_name') as string;
    const position = formData.get('position') as string || '';
    const gender = formData.get('gender') as string || '';
    const telephone_phone = formData.get('telephone_phone') as string || '';
    const mobile = formData.get('mobile') as string || '';
    const address = formData.get('address') as string || '';
    const address_two = formData.get('address_two') as string || '';
    const profile_pic_file = formData.get('profile_pic') as File | null;

    // Validate required fields
    if (!first_name || !last_name) {
      return errorResponse('First name and last name are required', null, 400);
    }

    // Validate profile picture if provided
    if (profile_pic_file && profile_pic_file.size > 0) {
      if (profile_pic_file.size > MAX_IMAGE_SIZE) {
        return errorResponse(`File size exceeds maximum of ${MAX_IMAGE_SIZE / 1024 / 1024}MB`, null, 400);
      }
      if (!ALLOWED_IMAGE_TYPES.includes(profile_pic_file.type)) {
        return errorResponse('Invalid file type. Allowed: JPEG, PNG, GIF, WebP', null, 400);
      }
    }

    // Save profile picture if new file provided
    let profilePicFilename: string | undefined;
    if (profile_pic_file && profile_pic_file.size > 0) {
      try {
        profilePicFilename = await saveProfilePicture(profile_pic_file);
      } catch (error) {
        console.error('Profile picture save error:', error);
        return errorResponse('Failed to save profile picture', null, 500);
      }
    }

    // Update staff profile
    await prisma.staffs.upsert({
      where: { user_id: user.id },
      update: {
        first_name,
        middle_name,
        last_name,
        position,
        gender,
        telephone_phone,
        mobile,
        address,
        address_two,
        ...(profilePicFilename && { profile_pic: profilePicFilename })
      },
      create: {
        user_id: user.id,
        first_name,
        middle_name,
        last_name,
        position,
        gender,
        telephone_phone,
        mobile,
        address,
        address_two,
        profile_pic: profilePicFilename || DEFAULT_PROFILE_PIC
      }
    });

    return successResponse({}, 'Profile updated successfully');
  } catch (error: any) {
    console.error('Profile update error:', error);
    return errorResponse(error.message || 'Failed to update profile', null, 500);
  }
}