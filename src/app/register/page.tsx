import FormWrapper from "@/components/FormWrapper";
import RegisterForm from "@/components/RegisterForm";
import Container from "@/components/reusables/Container";

export default function page() {
  return (
    <Container>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </Container>
  );
}
