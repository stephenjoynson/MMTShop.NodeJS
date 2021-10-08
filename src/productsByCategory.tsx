import { products } from "../data/products.json";
import { ProductList } from "./productList";

export const productsByCategory = (categoryId: bigint): ProductList => {
  return products.filter((p) => p.categoryId === categoryId);
};
