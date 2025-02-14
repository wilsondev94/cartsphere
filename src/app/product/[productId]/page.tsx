import ProductDetails from "@/components/ProductDetails";
import RatingList from "@/components/RatingList";
import Container from "@/components/reusables/Container";
import { products } from "@/lib/utils";

interface ProductIdProps {
  productId?: string;
}
export default function Product({ params }: { params: ProductIdProps }) {
  const product = products.find((product) => product.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <RatingList product={product} />
        </div>
      </Container>
    </div>
  );
}
