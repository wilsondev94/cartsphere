"use client";

import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ToggleQuantity from "./ToggleQUantity";
import { useCart } from "@/hook/useCart";

interface ShoppingCartContentProps {
  product: CartProductType;
}
export default function ShoppingCartContent({
  product,
}: ShoppingCartContentProps) {
  const { removeProductFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 mad:gap-4">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={product.selectedImg.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${product.id}`}>
            {truncateText(product.name)}
          </Link>
          <div>{product.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500"
              onClick={() => removeProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">
        <ToggleQuantity
          quantityCounter={true}
          cartProduct={product}
          handleIncrease={() => increaseQuantity(product)}
          handleDecrease={() => decreaseQuantity(product)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(product.price * product.quantity)}
      </div>
    </div>
  );
}
