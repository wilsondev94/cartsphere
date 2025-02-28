import AddProductForm from "@/components/AddProductForm";
import FormWrapper from "@/components/FormWrapper";
import NoCurrentUser from "@/components/NoCurrentUser";

import Container from "@/components/reusables/Container";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export default async function AddProductPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "USER")
    return <NoCurrentUser title="Opps! Access denied" />;

  return (
    <div className="p-8">
      <Container>
        <FormWrapper>
          <AddProductForm />
        </FormWrapper>
      </Container>
    </div>
  );
}
