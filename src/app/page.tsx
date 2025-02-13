import HomeBanner from "@/components/HomeBanner";
import ProductCard from "@/components/ProductCard";
import ReusableContainter from "@/components/ReusableContainter";
import { products } from "@/lib/utils";

export default function Home() {
  return (
    <div className="p-8">
      <ReusableContainter>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.name} data={product} />
          ))}
        </div>
      </ReusableContainter>
    </div>
  );
}
