import Link from "next/link";
import Container from "./reusables/Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="pb-4 pt-12 flex justify-between flex-col md:flex-row">
          <FooterList>
            <h3 className="text-base font-bold">Shop categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold">Customer service</h3>
            <Link href="#">Contact us</Link>
            <Link href="#">Shipping policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Tvs</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold">About us</h3>
            <p className="text-sm mb-2">
              Cartsphere is a platform that allows you shop for your favorite
              latest gadgets and accessories. We offer a wide range of quality
              products at affordable prices. Give us a try today!
            </p>
            <p>
              &copy; {new Date().getFullYear()} Cartsphere. All rights reserved
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold">Follow us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
