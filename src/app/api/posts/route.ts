import { db } from '@/db/index';
import { c2Posts, type InsertC2Posts } from "@/db/schema";
import { NextResponse } from 'next/server';
//import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const posts = await db.select().from(c2Posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const postData: InsertC2Posts = {
      title: body.title,
      content: body.content,
      userId: Number(body.userId),
    };

    const newPost = await db.insert(c2Posts).values(postData).returning();

    return NextResponse.json(newPost[0]);
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' }, 
      { status: 500 }
    );
  }
}
