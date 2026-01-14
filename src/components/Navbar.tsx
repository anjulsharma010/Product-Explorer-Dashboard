"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
    const { favorites } = useFavorites();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    ProductExplorer
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-gray-600 hover:text-blue-600">
                        Home
                    </Link>
                    <div className="relative">
                        {/* We can add a heart icon here later */}
                        <span className="text-gray-600 font-medium">Favorites ({favorites.length})</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
