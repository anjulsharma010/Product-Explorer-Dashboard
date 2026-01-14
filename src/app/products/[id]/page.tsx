import { getProduct } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    try {
        const product = await getProduct(id);
        return {
            title: `${product.title} | Product Explorer`,
            description: product.description.substring(0, 160),
        };
    } catch (e) {
        return {
            title: "Product Not Found",
        };
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    try {
        const product = await getProduct(id);

        return (
            <div className="max-w-4xl mx-auto">
                <ProductDetail product={product} />
            </div>
        );
    } catch (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found</h2>
                <p className="text-gray-600 mb-6">
                    The product you are looking for does not exist or could not be loaded.
                </p>
                <Link href="/" className="text-blue-600 hover:underline">
                    Return to Home
                </Link>
            </div>
        );
    }
}
