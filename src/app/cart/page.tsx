import ReusableContainter from "@/components/ReusableContainter";
import ShoppingCart from "@/components/ShoppingCart";

export default function Cart() {
  return (
    <div className="p-8">
      <ReusableContainter>
        <ShoppingCart />
      </ReusableContainter>
    </div>
  );
}
