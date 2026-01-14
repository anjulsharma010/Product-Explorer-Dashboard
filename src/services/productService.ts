import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }
    return res.json();
  },

  async getCategories(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    return res.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
    return res.json();
  },
};
