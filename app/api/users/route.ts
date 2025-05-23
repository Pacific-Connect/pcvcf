import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET all users
export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

// POST to create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await db.user.create({
      data: {
        email: body.email,
        password: body.password,
        isAdmin: body.isAdmin || false,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT to update user by ID
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, password } = body;

    if (!id || !email || !password) {
      return NextResponse.json(
        { message: "ID, email, and password are required" },
        { status: 400 }
      );
    }

    const userExists = await db.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
