import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/queries";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <Navbar categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
    </>
  );
}
