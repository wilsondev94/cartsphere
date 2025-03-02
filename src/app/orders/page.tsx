import NoCurrentUser from "@/components/NoCurrentUser";
import Container from "@/components/reusables/Container";
import YourOrders from "@/components/YourOrders";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";
import getOrdersByUserId from "@/lib/actions/getOrdersByUserId";

export default async function page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NoCurrentUser title="Opps! Access denied" />;

  const yourOrders = await getOrdersByUserId(currentUser.id);
  if (!yourOrders) return <NoCurrentUser title="You have no orders yet." />;

  return (
    <div className="pt-8">
      <Container>
        <YourOrders orders={yourOrders} />
      </Container>
    </div>
  );
}
