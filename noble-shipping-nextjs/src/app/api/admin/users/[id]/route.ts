import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(params.id);
    const results = await db.sql('SELECT * FROM user WHERE id = ?', userId);

    if (results.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = results[0];

    // Get staff details
    const staffResults = await db.sql('SELECT * FROM staffs WHERE user_id = ?', userId);
    const staff = staffResults.length > 0 ? staffResults[0] : null;

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      ...userWithoutPassword,
      staff: staff
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const userId = parseInt(params.id);

    // Update user
    let updateQuery = 'UPDATE user SET email = ?, active = ?';
    const updateParams: any[] = [data.email, data.active === 'true' || data.active === true ? 1 : 0];

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateQuery += ', password = ?';
      updateParams.push(hashedPassword);
    }

    updateQuery += ' WHERE id = ?';
    updateParams.push(userId);

    await db.sql(updateQuery, ...updateParams);

    // Update or create staff profile
    // Check if staff exists
    const staffExists = await db.sql('SELECT id FROM staffs WHERE user_id = ?', userId);

    if (staffExists.length > 0) {
      await db.sql(`
        UPDATE staffs SET 
          first_name = ?, middle_name = ?, last_name = ?, position = ?, 
          gender = ?, telephone_phone = ?, mobile = ?, address = ?
        WHERE user_id = ?
      `,
        data.first_name, data.middle_name, data.last_name, data.position,
        data.gender, data.telephone_phone, data.mobile, data.address,
        userId
      );
    } else {
      await db.sql(`
        INSERT INTO staffs (
          user_id, first_name, middle_name, last_name, position, 
          gender, telephone_phone, mobile, address, datetime
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `,
        userId, data.first_name, data.middle_name, data.last_name, data.position,
        data.gender, data.telephone_phone, data.mobile, data.address
      );
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(params.id);

    // Delete staff first (foreign key)
    await db.sql('DELETE FROM staffs WHERE user_id = ?', userId);
    await db.sql('DELETE FROM user WHERE id = ?', userId);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('User delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}