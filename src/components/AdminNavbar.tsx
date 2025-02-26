"use client";

import Link from "next/link";
import Container from "./reusables/Container";
import AdminNavItem from "./AdminNavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12  overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>
          <Link href="/admin/add-product">
            <AdminNavItem
              label="Add product"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-product"}
            />
          </Link>
          <Link href="/admin/manage-product">
            <AdminNavItem
              label="Manage Product"
              icon={MdDns}
              selected={pathname === "/admin/manage-product"}
            />
          </Link>
          <Link href="/admin/manage-order">
            <AdminNavItem
              label="Manage Order"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-order"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
