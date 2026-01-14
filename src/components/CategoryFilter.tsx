"use client";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === ""
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full capitalize transition-colors ${selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
