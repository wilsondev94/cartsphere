import OrderDetails from "@/components/OrderDetails";
import Container from "@/components/reusables/Container";
import getOrderById from "@/lib/actions/getOrderById";

interface OrderIdProps {
  orderId?: string;
}
export default async function Order({ params }: { params: OrderIdProps }) {
  const param = await params;

  const order = await getOrderById(param);

  return (
    <div className="p-8">
      <Container>
        {order ? <OrderDetails order={order} /> : <div>Order not found</div>}
      </Container>
    </div>
  );
}
