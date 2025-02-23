import { NextResponse } from "next/server";
import { db } from "@/db";
import { c2Profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, username } = body;

    // Validate required fields
    if (!firstname || !lastname || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert only the profile data - let Drizzle handle the rest
    const newProfile = await db
      .insert(c2Profiles)
      .values({
        firstname,
        lastname,
        username,
      })
      .returning();

    return NextResponse.json(newProfile[0]);
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const profiles = await db.select().from(c2Profiles);
    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, firstname, lastname, username } = body;

    if (!id || !firstname || !lastname || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProfile = await db
      .update(c2Profiles)
      .set({
        firstname,
        lastname,
        username,
      })
      .where(eq(c2Profiles.id, id))
      .returning();

    return NextResponse.json(updatedProfile[0]);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing profile ID" },
        { status: 400 }
      );
    }

    const deletedProfile = await db
      .delete(c2Profiles)
      .where(eq(c2Profiles.id, parseInt(id)))
      .returning();

    if (!deletedProfile.length) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(deletedProfile[0]);
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
