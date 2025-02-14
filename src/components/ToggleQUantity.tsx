"use client";

interface ToggleQuantityProps {
  quantityCounter: boolean;
  cartProduct: CartProductType;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

export default function ToggleQuantity({
  quantityCounter,
  cartProduct,
  handleDecrease,
  handleIncrease,
}: ToggleQuantityProps) {
  return (
    <div className="flex gap-8 items-center ">
      {quantityCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 items-center text-base">
        <button
          className="border-[1.2px] border-slate-300 px-2 rounded"
          onClick={handleDecrease}
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          className="border-[1.2px] border-slate-300 px-2 rounded"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}
