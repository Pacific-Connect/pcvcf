// lib/zoom.ts
import "server-only";

const API_BASE = "https://api.zoom.us/v2";

async function getS2SToken() {
  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    }
  );

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Zoom OAuth failed: ${res.status} ${txt}`);
  }
  const data = await res.json();
  return data.access_token as string;
}

/** Create a Zoom meeting under the configured host user. Returns meeting metadata. */
export async function createZoomMeeting(topic = "Career Fair 1:1", durationMin = 60) {
  const token = await getS2SToken();
  const hostUser = process.env.ZOOM_HOST_USER_ID || "me";

  const res = await fetch(`${API_BASE}/users/${encodeURIComponent(hostUser)}/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      type: 1, // instant meeting; change to 2 for scheduled
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        waiting_room: true,
        approval_type: 0, // auto-approve
        mute_upon_entry: true,
      },
      duration: durationMin,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Zoom create meeting failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return {
    meetingNumber: String(data.id),   // numeric meeting ID
    passcode: data.password || data.passcode || null,
    startUrl: data.start_url as string,
    joinUrl: data.join_url as string,
    topic: data.topic as string,
  };
}
