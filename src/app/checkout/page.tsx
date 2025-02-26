import Checkout from "@/components/Checkout";
import FormWrapper from "@/components/FormWrapper";
import Container from "@/components/reusables/Container";

export default function page() {
  return (
    <div className="p-8">
      <Container>
        <FormWrapper>
          <Checkout />
        </FormWrapper>
      </Container>
    </div>
  );
}
