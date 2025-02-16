import Link from "next/link";
import Container from "./reusables/Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <div className="sticky top-0 bg-slate-200 z-30 shadow-sm">
      <div
        className="py-4
     border-b-[1px]"
      >
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">CS-LOGO</Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
