"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Product } from "@/types";

interface FavoritesContextType {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to parse favorites from localStorage", error);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addFavorite = (product: Product) => {
        setFavorites((prev) => {
            if (prev.some((p) => p.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFavorite = (productId: number) => {
        setFavorites((prev) => prev.filter((p) => p.id !== productId));
    };

    const isFavorite = (productId: number) => {
        return favorites.some((p) => p.id === productId);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
