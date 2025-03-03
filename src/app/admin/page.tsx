import Graph from "@/components/Graph";
import Container from "@/components/reusables/Container";
import Summary from "@/components/Summary";
import getGraphData from "@/lib/actions/getGraphData";
import getOrders from "@/lib/actions/getOrders";
import getProducts from "@/lib/actions/getProducts";
import getUsers from "@/lib/actions/getUsers";

export default async function AdminPage() {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          {graphData && <Graph data={graphData} />}
        </div>
      </Container>
    </div>
  );
}
