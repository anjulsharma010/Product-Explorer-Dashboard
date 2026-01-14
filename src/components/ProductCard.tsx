"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import { selectIsFavorite } from "@/store/selectors/favoritesSelectors";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const favorite = useAppSelector(selectIsFavorite(product.id));

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the heart
        if (favorite) {
            dispatch(removeFavorite(product.id));
        } else {
            dispatch(addFavorite(product));
        }
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-sm w-full border border-gray-100 p-4 transition-transform hover:scale-[1.02] flex flex-col h-full"
        >
            <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md z-10 transition-colors ${favorite ? "bg-red-50 text-red-500" : "bg-white text-gray-400 hover:text-red-500"
                        }`}
                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={favorite ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col flex-grow">
                <p className="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wide">
                    {product.category}
                </p>
                <h3 className="text-gray-900 font-medium text-lg leading-tight mb-2 line-clamp-2" title={product.title}>
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center text-yellow-500 text-sm">
                        <span className="mr-1">★</span>
                        <span>{product.rating.rate}</span>
                        <span className="text-gray-400 ml-1">({product.rating.count})</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

