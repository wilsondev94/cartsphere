import ManageProducts from "@/components/ManageProducts";
import Container from "@/components/reusables/Container";

export default function page() {
  return (
    <div className="pt-8">
      <Container>
        <ManageProducts />
      </Container>
    </div>
  );
}
