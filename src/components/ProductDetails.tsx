"use client";

import { Rating } from "@mui/material";
import { useCallback, useState } from "react";
import SetColor from "./SetColor";
import ToggleQuantity from "./ToggleQUantity";
import ReusableButton from "./ReusableButton";
import ProductImage from "./ProductImage";

interface ProductDetailsProps {
  product: any;
}

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
    quantity: 1,
    price: product.price,
  });

  const handleColorSelect = useCallback(
    function (value: SelectedImgType) {
      setCartProduct((prev) => ({ ...prev, selectedImg: value }));
    },
    [cartProduct]
  );

  const handleIncrease = useCallback(
    function () {
      if (cartProduct.quantity === 99) return;
      setCartProduct((prev) => ({ ...prev, quantity: prev.quantity++ }));
    },
    [cartProduct]
  );

  const handleDecrease = useCallback(
    function () {
      if (cartProduct.quantity === 1) return;

      setCartProduct((prev) => ({ ...prev, quantity: prev.quantity-- }));
    },

    [cartProduct]
  );

  const productRating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
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
          <span className="font-semibold">CATEGORY :</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND :</span> {product.brand}
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
        <ToggleQuantity
          cartProduct={cartProduct}
          quantityCounter={""}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
        />
        <WhiteSpace />
        <div className="max-w-[300px]">
          <ReusableButton
            label="Add to cart"
            outline
            onClick={() => console.log("Add to cart")}
          />
        </div>
      </div>
    </div>
  );
}
