// components/meeting/zoom-client.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";

type Props = {
  meetingNumber: string;
  passcode?: string;
  userName: string;
  userEmail?: string;
};

export default function ZoomClient({ meetingNumber, passcode, userName, userEmail }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      try {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/3.0.0/lib", "/av"); // adjust if version differs
        await ZoomMtg.preLoadWasm();
        await ZoomMtg.prepareWebSDK();
        ZoomMtg.i18n.load("en-US");
        ZoomMtg.i18n.reload("en-US");

        // 1) ask server for a signature
        const sigRes = await fetch("/api/zoom/signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetingNumber, role: 0 }), // attendee
        });
        if (!sigRes.ok) throw new Error(await sigRes.text());
        const { signature, sdkKey } = await sigRes.json();

        // 2) init client view
        ZoomMtg.init({
          leaveUrl: "/dashboard",
          disableInvite: true,
          success: () => {
            // 3) join meeting
            ZoomMtg.join({
              signature,
              sdkKey,
              meetingNumber,
              passWord: passcode || "",
              userName,
              userEmail,
              success: () => {},
              error: (err: unknown) => {
                if (typeof err === "object" && err !== null && "reason" in err) {
                  setError((err as { reason?: string }).reason || "Failed to join");
                } else {
                  setError("Failed to join");
                }
              },
            });
          },
          error: (err: unknown) => {
            if (typeof err === "object" && err !== null && "reason" in err) {
              setError((err as { reason?: string }).reason || "Zoom init failed");
            } else {
              setError("Zoom init failed");
            }
          },
        });
      } catch (e: unknown) {
        if (mounted) {
          if (e instanceof Error) {
            setError(e.message || "Error");
          } else {
            setError("Error");
          }
        }
      }
    }

    boot();
    return () => { mounted = false; };
  }, [meetingNumber, passcode, userName, userEmail]);

  return (
    <div>
      {error && <p className="text-red-600">Zoom error: {error}</p>}
      {/* Zoom renders its UI over the document; container not strictly required for client view */}
      <div ref={containerRef} />
    </div>
  );
}
