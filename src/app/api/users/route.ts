import { db } from '@/db/index';
import { c2Users, type InsertC2Users } from "@/db/schema";
import { NextResponse } from 'next/server';
//import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const users = await db.select().from(c2Users);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const userData: InsertC2Users = {
      name: body.name,
      age: Number(body.age),
      email: body.email,
    };

    const newUser = await db.insert(c2Users).values(userData).returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' }, 
      { status: 500 }
    );
  }
}
