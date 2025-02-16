import FormWrapper from "@/components/FormWrapper";
import LoginForm from "@/components/LoginForm";
import Container from "@/components/reusables/Container";

export default function page() {
  return (
    <Container>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Container>
  );
}
