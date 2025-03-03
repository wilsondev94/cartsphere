import AddRating from "@/components/AddRating";
import NoCurrentUser from "@/components/NoCurrentUser";
import ProductDetails from "@/components/ProductDetails";
import RatingList from "@/components/RatingList";
import Container from "@/components/reusables/Container";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import getProductById from "@/lib/actions/getProductById";

interface ProductIdProps {
  productId?: string;
}
export default async function Product({ params }: { params: ProductIdProps }) {
  const param = await params;

  const currentUser = await getCurrentUser();
  const user = currentUser
    ? { ...currentUser, emailVerified: currentUser.emailVerified ?? null }
    : null;

  const product = await getProductById(param);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>
            <AddRating product={product} user={user} />
          </div>
          <RatingList product={product} />
        </div>
      </Container>
    </div>
  );
}
