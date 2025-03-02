"use client";
import { categories } from "@/lib/utils";
import Container from "./reusables/Container";
import Category from "./Category";
import { useSearchParams } from "next/navigation";

export default function CategoriesNavbar() {
  const searchParams = useSearchParams();
  const cat = searchParams?.get("category");

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((category) => (
            <Category
              key={category.label}
              label={category.label}
              icon={category.icon}
              selected={
                cat === category.label ||
                (cat === null && category.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
