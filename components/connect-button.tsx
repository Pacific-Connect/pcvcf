// components/connect-button.tsx
"use client";

import { useState, useTransition } from "react";

type Status = "NONE" | "PENDING" | "ACCEPTED" | "REJECTED";

export default function ConnectButton({
  targetId,
  initialStatus,
}: {
  targetId: string;
  initialStatus: Status;
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isPending, startTransition] = useTransition();

  const disabled = status === "PENDING" || status === "ACCEPTED" || isPending;

  async function onConnect() {
    startTransition(async () => {
      try {
        const res = await fetch("/api/connections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetId }),
        });
        if (!res.ok) {
          const msg = await res.text();
          alert(msg || "Failed to send connection request");
          return;
        }
        setStatus("PENDING");
      } catch (e) {
        console.error(e);
        alert("Failed to send connection request");
      }
    });
  }

  if (status === "ACCEPTED") {
    return <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-800 text-sm">Connected</span>;
  }

  if (status === "PENDING") {
    return <span className="inline-block px-3 py-1 rounded bg-amber-100 text-amber-800 text-sm">Request sent</span>;
  }

  if (status === "REJECTED") {
    return (
      <button
        disabled={isPending}
        onClick={onConnect}
        className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
      >
        Send request again
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onConnect}
      className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-60"
    >
      Connect
    </button>
  );
}
