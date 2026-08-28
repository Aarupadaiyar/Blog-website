"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Loader2, Send, MessageCircle } from "lucide-react";
import { DoodleUnderline, DoodleStar } from "./Doodles";

type Comment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string | Date;
};

const avatarColors = ["bg-yellow", "bg-accent-soft", "bg-green-soft"] as const;

function colorFor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return avatarColors[sum % avatarColors.length];
}

export default function CommentSection({ postId, comments }: { postId: string; comments: Comment[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setError("Add your name and a comment.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, authorName: name, authorEmail: email, body, companyWebsite }),
    });

    setSubmitting(false);
    if (!res.ok) {
      setError("Couldn't post that comment — try again.");
      return;
    }
    setSubmitted(true);
    setName("");
    setEmail("");
    setBody("");
  }

  return (
    <div className="relative mt-16 border-t-[1.6px] border-ink pt-10">
      <DoodleStar className="pointer-events-none absolute right-4 top-6 h-5 w-5 text-yellow opacity-80" />
      <p className="font-hand text-3xl text-accent-deep">join the conversation</p>
      <h2 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-ink">
        <MessageCircle size={22} className="text-accent" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>
      <DoodleUnderline className="mt-1 h-3 w-32 text-blue" />

      <div className="mt-8 space-y-5">
        {comments.length === 0 ? (
          <p className="text-sm text-ink-soft">No comments yet — be the first to leave a note.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-3 paper-card p-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.6px] border-ink text-sm font-bold text-ink ${colorFor(c.authorName)}`}
              >
                {c.authorName.trim().slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-ink">{c.authorName}</span>
                  <span className="text-xs text-ink-faint">{format(new Date(c.createdAt), "MMM d, yyyy")}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 paper-card p-5">
        <p className="text-sm font-bold text-ink">Leave a comment — no account needed</p>

        {submitted ? (
          <p className="mt-3 text-sm text-ink-soft">
            Thanks — your comment is in for a quick review and will appear once approved.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email (optional, not shown publicly)"
                className="rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you think?"
              rows={3}
              className="w-full resize-none rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
            {/* Honeypot — hidden from real visitors, catches simple bots */}
            <input
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="btn-sharp btn-sharp-fill"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={14} />}
              Post comment
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
