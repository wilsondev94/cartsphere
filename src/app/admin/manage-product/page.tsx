import ManageProducts from "@/components/ManageProducts";
import NoCurrentUser from "@/components/NoCurrentUser";
import Container from "@/components/reusables/Container";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import getProducts from "@/lib/actions/getProducts";

export default async function page() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "USER")
    return <NoCurrentUser title="Opps! Access denied" />;

  const products = await getProducts({
    category: null,
  });

  return (
    <div className="pt-8">
      <Container>
        <ManageProducts products={products} />
      </Container>
    </div>
  );
}
