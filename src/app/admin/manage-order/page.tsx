import ManageOrders from "@/components/ManageOrders";
import NoCurrentUser from "@/components/NoCurrentUser";
import Container from "@/components/reusables/Container";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import getOrders from "@/lib/actions/getOrders";

export default async function page() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN")
    return <NoCurrentUser title="Opps! Access denied" />;

  const orders = await getOrders();

  return (
    <div className="pt-8">
      <Container>
        <ManageOrders orders={orders} />
      </Container>
    </div>
  );
}
