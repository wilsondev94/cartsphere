"use client";

import { CartProductType, SelectedImgType } from "./ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export default function SetColor({
  images,
  cartProduct,
  handleColorSelect,
}: SetColorProps) {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((img) => (
            <div
              key={img.color}
              className={`h-7 w-7 border-teal-300 rounded-full flex items-center justify-center ${
                cartProduct.selectedImg?.color === img.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
              onClick={() => handleColorSelect(img)}
            >
              <div
                style={{ background: img.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
