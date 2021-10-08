import { getAvailableCategories } from "./categoryRepository";
import {
  getProductsByCategory,
  getFeaturedProducts,
} from "./productRepository";

console.log("Featured Products:");
console.log(getFeaturedProducts());
console.log("Available Categories:");
console.log(getAvailableCategories());
console.log("Products By Category:");
console.log(getProductsByCategory(1));
