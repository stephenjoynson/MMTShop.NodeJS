import { products } from "../../data/products.json";
import { featuredProducts } from "../../data/featuredproducts.json";
import { Product } from "./product";

export const getProductsByCategory = (categoryId: number): Array<Product> => {
  return products.filter((p: Product) => p.categoryId === categoryId);
};

export const getFeaturedProducts = (): Array<Product> => {
  return products.filter((p: Product) =>
    featuredProducts.some((featured) => featured.productSku === p.sku)
  );
};
