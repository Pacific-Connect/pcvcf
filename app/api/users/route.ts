import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET all users
export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

// PUT to update user by ID
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, password } = body;

    // Validate required fields
    if (!id || !email || !password) {
      return NextResponse.json(
        { message: "ID, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await db.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user in the database
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        email,
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Update failed", details: error.message },
      { status: 500 }
    );
  }
}
