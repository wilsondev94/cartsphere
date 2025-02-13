import ProductDetails from "@/components/ProductDetails";
import ReusableContainter from "@/components/ReusableContainter";
import { product } from "@/lib/utils";

interface ProductIdProps {
  productId?: string;
}
export default function Product({ params }: { params: ProductIdProps }) {
  console.log(params);
  return (
    <div className="p-8">
      <ReusableContainter>
        <ProductDetails product={product} />
      </ReusableContainter>
    </div>
  );
}
