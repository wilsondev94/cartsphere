import Container from "@/components/reusables/Container";
import ShoppingCart from "@/components/ShoppingCart";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export default async function Cart() {
  const user = await getCurrentUser();
  const currentUser = user
    ? { ...user, emailVerified: user.emailVerified ?? null }
    : null;

  return (
    <div className="p-8">
      <Container>
        <ShoppingCart currentUser={currentUser} />
      </Container>
    </div>
  );
}
