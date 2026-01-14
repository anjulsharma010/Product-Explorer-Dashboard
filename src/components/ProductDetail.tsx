"use client";

import Image from "next/image";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import { selectIsFavorite } from "@/store/selectors/favoritesSelectors";
import Link from "next/link";

export default function ProductDetail({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const favorite = useAppSelector(selectIsFavorite(product.id));

    const toggleFavorite = () => {
        if (favorite) {
            dispatch(removeFavorite(product.id));
        } else {
            dispatch(addFavorite(product));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div className="relative h-96 w-full flex items-center justify-center bg-white">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {product.title}
                    </h1>

                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-500 text-lg">
                            <span className="mr-1">★</span>
                            <span className="font-medium">{product.rating.rate}</span>
                        </div>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-500">{product.rating.count} reviews</span>
                    </div>

                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-4xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>

                        <button
                            onClick={toggleFavorite}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${favorite
                                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={favorite ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                            <span>{favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <Link href="/" className="text-blue-600 font-medium hover:underline flex items-center">
                    ← Back to products
                </Link>
            </div>
        </div>
    );
}

