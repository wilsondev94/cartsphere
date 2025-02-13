import ProductDetails from "@/components/ProductDetails";
import RatingList from "@/components/RatingList";
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
        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <RatingList product={product} />
        </div>
      </ReusableContainter>
    </div>
  );
}
