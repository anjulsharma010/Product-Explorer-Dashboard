import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = 'force-dynamic'; // For demo purposes, to ensure fresh data if API changes, though static is default and fine for fakestore.

export default async function Home() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    return (
      <div className="space-y-6">
        <header className="pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
          <p className="text-gray-500 mt-2">Explore our collection of premium items</p>
        </header>
        <ProductGrid initialProducts={products} categories={categories} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading products</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load the products at this time. Please try again later.
        </p>
        <p className="text-sm text-gray-400">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }
}
