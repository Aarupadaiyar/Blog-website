"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminPostControls({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this post? This can't be undone.")) return;
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      alert("Could not delete this post.");
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl items-center gap-4 border-[1.6px] border-dashed border-accent bg-accent-soft px-5 py-2.5 text-sm sm:px-8">
      <span className="font-mono-label text-[0.65rem] text-accent-deep">ADMIN VIEW</span>
      <Link href={`/admin/posts/${postId}/edit`} className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent-deep">
        <Pencil size={14} />
        Edit
      </Link>
      <button onClick={handleDelete} className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-red-600">
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
}
