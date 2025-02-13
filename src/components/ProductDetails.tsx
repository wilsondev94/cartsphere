"use client";

import { Rating } from "@mui/material";
import { useCallback, useState } from "react";
import SetColor from "./SetColor";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: string;
  price: string;
  selectedImg: SelectedImgType;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

function WhiteSpace() {
  return <div className="w-[30%] my-2" />;
}

export default function ProjectDetails({ product }: ProductDetailsProps) {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images[0],
    quantity: product.quantity,
    price: product.price,
  });

  const handleColorSelect = useCallback(function (value: SelectedImgType) {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const productRating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>Images</div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <WhiteSpace />
        <div className="text-justify">{product.description}</div>
        <WhiteSpace />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <WhiteSpace />
        <SetColor
          images={product.images}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
        <WhiteSpace />
        <div>Quality</div>
        <WhiteSpace />
        <div>Add to cart</div>
      </div>
    </div>
  );
}
