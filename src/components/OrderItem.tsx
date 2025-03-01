import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/utils";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  orderItem: CartProductType;
}

export default function OrderItem({ orderItem }: OrderItemProps) {
  return (
    <div className="grid grid-cols-5 text-xs md:text-xs gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={orderItem.selectedImg.image}
            alt={orderItem.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(orderItem.name)}</div>
          <div>{truncateText(orderItem.selectedImg.color)}</div>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(orderItem.price)}</div>
      <div className="justify-self-center">{orderItem.quantity}</div>
      <div className="justify-self-end font-semibold">
        ${(orderItem.price * orderItem.quantity).toFixed(2)}
      </div>
    </div>
  );
}
