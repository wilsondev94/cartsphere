"use client";

import { useCart } from "@/hook/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "./reusables/Heading";
import Button from "./reusables/Button";
import ShoppingCartContent from "./ShoppingCartContent";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface ShoppingCartProps {
  currentUser: SafeUser | null;
}

export default function ShoppingCart({ currentUser }: ShoppingCartProps) {
  const router = useRouter();

  const { cartProducts, clearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your Cart is empty</div>
        <div>
          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack /> <span>Start shopping</span>
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <Heading title="Shopping cart" center />
      <div className="grid grid-cols-5 gap-4 text-sm pb-2 mt-8 items-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTIY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((product) => (
            <ShoppingCartContent key={product.id} product={product} />
          ))}
      </div>
      <div className="flex justify-between border-t-[1.5px] border-slate-200 py-4 gap-4">
        <div className="w-[90px]">
          <Button label="Clear cart" small outline onClick={clearCart} />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to Checkout"}
            small
            onClick={() => router.push(currentUser ? "/checkout" : "/login")}
          />

          <Link
            href="/"
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack /> <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
