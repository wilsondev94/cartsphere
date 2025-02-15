"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "./SetColor";
import ToggleQuantity from "./ToggleQUantity";
import Button from "./reusables/Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/hook/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

function WhiteSpace() {
  return <div className="w-[30%] my-2" />;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();

  const { addProductToCart, cartProducts } = useCart();
  const [isProductIncart, setIsproductInCart] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: product.images[0],
    quantity: 0,
    price: product.price,
  });

  const handleColorSelect = useCallback(function (value: SelectedImgType) {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

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

  useEffect(() => {
    setIsproductInCart(false);

    if (cartProducts) {
      const existingProductIndex = cartProducts.findIndex(
        (ProductItem) => ProductItem.id === product.id
      );

      if (existingProductIndex > -1) {
        setIsproductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

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
        {isProductIncart ? (
          <>
            <p className="flex items-center gap-1 mb-2 text-slate-500">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
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
              <Button
                label="Add to cart"
                onClick={() => addProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
