import AdminSidebar from "@/components/admin/AdminSidebar";
import { prisma } from "@/lib/prisma";

export const metadata = { robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pendingComments = await prisma.comment.count({ where: { status: "pending" } });

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <AdminSidebar pendingComments={pendingComments} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </div>
    </div>
  );
}
