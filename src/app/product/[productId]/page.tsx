import ProductDetails from "@/components/ProductDetails";
import RatingList from "@/components/RatingList";
import Container from "@/components/reusables/Container";
import { products } from "@/lib/utils";

interface ProductIdProps {
  productId?: string;
}
export default async function Product({ params }: { params: ProductIdProps }) {
  const param = await params;

  const product = products.find((product) => product.id === param.productId);

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
