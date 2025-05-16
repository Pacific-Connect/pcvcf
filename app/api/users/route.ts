import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { email, password, isAdmin } = await request.json();
  try {
    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        email,
        password,
        isAdmin,
        updatedAt: new Date(), // Update the timestamp
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "User  not found or update failed" },
      { status: 404 }
    );
  }
}
