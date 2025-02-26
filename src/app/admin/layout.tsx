import AdminNavbar from "@/components/AdminNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartsphere Admin Dashboard",
  description: "",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      {children}
    </div>
  );
}
