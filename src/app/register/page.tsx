import FormWrapper from "@/components/FormWrapper";
import RegisterForm from "@/components/RegisterForm";
import Container from "@/components/reusables/Container";
import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export default async function page() {
  const user = await getCurrentUser();
  const currentUser = user
    ? { ...user, emailVerified: user.emailVerified ?? null }
    : null;

  return (
    <Container>
      <FormWrapper>
        <RegisterForm currentUser={currentUser} />
      </FormWrapper>
    </Container>
  );
}
