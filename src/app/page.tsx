import HomeBanner from "@/components/HomeBanner";
import NoCurrentUser from "@/components/NoCurrentUser";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/reusables/Container";
import getProducts, { ProductParams } from "@/lib/actions/getProducts";

interface HomeProps {
  searchParams: ProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0)
    return <NoCurrentUser title="Opps! No product found." />;

  // To display products on the Home page randomly
  function shuffleProductsArray(productArray: any) {
    for (let i = productArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [productArray[i], productArray[random]] = [
        productArray[random],
        productArray[i],
      ];
    }

    return productArray;
  }

  const shuffledProduct = shuffleProductsArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProduct.map((product: any) => (
            <ProductCard key={product.name} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
