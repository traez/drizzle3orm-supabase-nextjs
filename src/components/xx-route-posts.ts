import db from "@/db";
import { posts } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const offset = (page - 1) * limit;

  const _posts = await db
    .select()
    .from(posts)
    .orderBy(posts.id)
    .limit(limit)
    .offset(offset);

  return Response.json({ posts: _posts });
}
