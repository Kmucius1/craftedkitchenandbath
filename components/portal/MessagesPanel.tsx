"use client";

import { useEffect, useState } from "react";

type Message = { id: string; author_type: "staff" | "client"; author_staff_name: string | null; body: string; created_at: string };

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function MessagesPanel({ projectId }: { projectId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/portal/messages?projectId=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setMessages(data?.messages || []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/portal/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, body: text }),
      });
      const data = await res.json();
      if (data?.ok && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setDraft("");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, minHeight: 320, display: "flex", flexDirection: "column", gap: 12 }}>
        {loading ? (
          <div style={{ fontSize: 13, color: "#6B7280" }}>Loading…</div>
        ) : messages.length === 0 ? (
          <div style={{ fontSize: 13, color: "#6B7280" }}>No messages yet — say hello.</div>
        ) : (
          messages.map((m) => (
            <div key={m.id} style={{ display: "flex", justifyContent: m.author_type === "client" ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  maxWidth: "75%",
                  background: m.author_type === "client" ? "#2B7CC1" : "#F1F3F5",
                  color: m.author_type === "client" ? "#fff" : "#1A202C",
                  borderRadius: 12,
                  padding: "10px 14px",
                }}
              >
                {m.author_type === "staff" && (
                  <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, opacity: 0.7 }}>{m.author_staff_name || "Crafted Team"}</div>
                )}
                <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{m.body}</div>
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6 }}>{fmt(m.created_at)}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Type a message…"
          rows={2}
          style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 8, padding: "10px 12px", fontSize: 13, fontFamily: "inherit", resize: "none" }}
        />
        <button
          onClick={send}
          disabled={sending || !draft.trim()}
          style={{
            background: sending || !draft.trim() ? "#7FA9CB" : "#2B7CC1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 20px",
            fontSize: 13,
            fontWeight: 600,
            cursor: sending || !draft.trim() ? "default" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
