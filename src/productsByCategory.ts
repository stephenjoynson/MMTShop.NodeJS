import { products } from "../data/products.json";
import { Product } from "./product";

export const productsByCategory = (categoryId: number): Array<Product> => {
  return products.filter((p: Product) => p.categoryId === categoryId);
};
