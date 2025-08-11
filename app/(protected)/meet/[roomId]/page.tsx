// app/(protected)/meet/[roomId]/page.tsx
import { db } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import ZoomClient from "@/components/meeting/zoom-client";

export default async function MeetPage({ params: { roomId } }: { params: { roomId: string }}) {
  const auth = await requireUser();

  const room = await db.room.findUnique({
    where: { id: roomId },
    include: { participants: true },
  });
  if (!room) throw new Error("Room not found");

  // Only allow participants
  const isParticipant = room.participants.some(p => p.userId === auth.id);
  if (!isParticipant) throw new Error("Forbidden");

  // Join (idempotent)
  await db.roomParticipant.upsert({
    where: { roomId_userId: { roomId, userId: auth.id } },
    update: { leftAt: null },
    create: { roomId, userId: auth.id, role: "guest" },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Meeting</h1>

      {/* Host can click Start in a new tab; everyone else waits / joins via SDK */}
      {room.zoomStartUrl && room.createdById === auth.id && (
        <a
          href={room.zoomStartUrl}
          target="_blank"
          className="inline-block px-3 py-2 rounded bg-blue-600 text-white"
        >
          Start as host (opens Zoom)
        </a>
      )}

      <ZoomClient
        meetingNumber={room.zoomMeetingNumber!}
        passcode={room.zoomPasscode || undefined}
        userName={"Guest"}           // swap to real name if you store it
        userEmail={undefined}        // optional
      />
    </div>
  );
}
