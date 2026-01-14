"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { useAppSelector } from "@/store/hooks";
import { selectFavoriteIds } from "@/store/selectors/favoritesSelectors";

interface ProductGridProps {
    initialProducts: Product[];
    categories: string[];
}

export default function ProductGrid({ initialProducts, categories }: ProductGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const favoriteIds = useAppSelector(selectFavoriteIds);

    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory
                ? product.category === selectedCategory
                : true;
            const matchesFavorite = showFavoritesOnly ? favoriteIds.has(product.id) : true;

            return matchesSearch && matchesCategory && matchesFavorite;
        });
    }, [initialProducts, searchTerm, selectedCategory, showFavoritesOnly, favoriteIds]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="flex items-center gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={showFavoritesOnly}
                            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">Show Favorites</span>
                    </label>
                </div>
            </div>

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No products found
                    </h3>
                    <p className="text-gray-500">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

