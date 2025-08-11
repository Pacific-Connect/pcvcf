// components/connect-button.tsx
"use client";

import { useState } from "react";

export default function ConnectButton({ targetId, disabled }: { targetId: string; disabled?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onClick() {
    if (disabled || status === "loading" || status === "sent") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to send connection");
      }
      setStatus("sent");
      setMessage("Request sent!");
    } catch (e: unknown) {
      setStatus("error");
      if (e instanceof Error) {
        setMessage(e.message || "Something went wrong");
      } else {
        setMessage("Something went wrong");
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled || status === "loading" || status === "sent"}
        className="px-3 py-1.5 rounded bg-blue-600 text-white disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : status === "sent" ? "Requested" : "Connect"}
      </button>
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
}
