import Link from "next/link";
import Container from "./reusables/Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import CategoriesNavbar from "./CategoriesNavbar";
import SearchBar from "./SearchBar";

export default async function Navbar() {
  const user = await getCurrentUser();
  const currentUser = user
    ? { ...user, emailVerified: user.emailVerified ?? null }
    : null;

  return (
    <div className="sticky top-0 bg-slate-200 z-30 shadow-sm">
      <div
        className="py-4
     border-b-[1px]"
      >
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">CS-LOGO</Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <CategoriesNavbar />
    </div>
  );
}
