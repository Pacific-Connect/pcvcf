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
  try {
    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body cannot be empty" },
        { status: 400 }
      );
    }
    const { email, password } = body;
    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        email,
        password,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "User not found or update failed" },
      { status: 404 }
    );
  }
}
