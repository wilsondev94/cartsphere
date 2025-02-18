import FormWrapper from "@/components/FormWrapper";
import LoginForm from "@/components/LoginForm";
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
        <LoginForm currentUser={currentUser} />
      </FormWrapper>
    </Container>
  );
}
