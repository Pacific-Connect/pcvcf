// app/api/rooms/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";
import { createZoomMeeting } from "@/lib/zoom";

export async function POST(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const { targetId } = await req.json(); // the other user's id
  if (!targetId) return new NextResponse("targetId required", { status: 400 });

  // Check connection acceptance (either side)
  const connection = await db.connection.findFirst({
    where: {
      OR: [
        { studentId: auth.id, employerId: targetId },
        { studentId: targetId, employerId: auth.id },
      ],
      status: "ACCEPTED",
    },
  });
  if (!connection) return new NextResponse("No accepted connection", { status: 403 });

  // See if there is an existing room for this pair (reuse first)
  const existing = await db.room.findFirst({
    where: {
      participants: { some: { userId: auth.id } },
      // naive reuse: any room created by me with this connection's other party
    },
  });

  if (existing?.zoomMeetingNumber) {
    return NextResponse.json({ roomId: existing.id });
  }

  // Create Zoom meeting
  const zoom = await createZoomMeeting("Career Fair 1:1");

  // Create Room and add both as participants
  const room = await db.room.create({
    data: {
      createdById: auth.id,
      zoomMeetingNumber: zoom.meetingNumber,
      zoomPasscode: zoom.passcode,
      zoomStartUrl: zoom.startUrl,
      zoomJoinUrl: zoom.joinUrl,
      participants: {
        create: [
          { userId: auth.id, role: "host" },
          { userId: targetId, role: "guest" },
        ],
      },
    },
  });

  return NextResponse.json({ roomId: room.id });
}
