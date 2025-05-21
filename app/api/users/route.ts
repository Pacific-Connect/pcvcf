import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const user = await db.user.delete({
      where: { id },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}