import { NextResponse } from 'next/server';
import { Database } from '@sqlitecloud/drivers';

export async function GET() {
    const db = new Database(process.env.SQLITECLOUD_URL || process.env.DATABASE_URL!);
    try {
        const tables = await db.sql("SELECT name FROM sqlite_master WHERE type='table'");
        return NextResponse.json({ tables });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        db.close();
    }
}
