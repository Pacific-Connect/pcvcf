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
    console.log("Updating user with ID:", params.id);

    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body cannot be empty" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Check if user exists before updating
    const userExists = await db.user.findUnique({
      where: { id: params.id },
    });

    console.log("User  exists:", userExists);

    if (!userExists) {
      return NextResponse.json({ error: "User  not found" }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        email,
        password, // Ensure this is hashed before saving
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Update failed", details: "Error.message" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json(
//         { error: "Request body cannot be empty" },
//         { status: 400 }
//       );
//     }

//     const { email, password } = body;

//     // Check if user exists before updating
//     const userExists = await db.user.findUnique({
//       where: { id: params.id },
//     });

//     if (!userExists) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const updatedUser = await db.user.update({
//       where: { id: params.id },
//       data: {
//         email,
//         password, // Ensure this is hashed before saving
//         updatedAt: new Date(),
//       },
//     });

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Update failed", details: "error.message" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await request.json();
//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json(
//         { error: "Request body cannot be empty" },
//         { status: 400 }
//       );
//     }
//     const { email, password } = body;
//     const updatedUser = await db.user.update({
//       where: { id: params.id },
//       data: {
//         email,
//         password,
//         updatedAt: new Date(),
//       },
//     });
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "User not found or update failed" },
//       { status: 404 }
//     );
//   }
// }
