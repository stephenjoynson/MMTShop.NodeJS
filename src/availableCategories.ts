import { categories } from "../data/categories.json";
import { Category } from "./category";

export const availableCategories = (): Array<Category> => {
  return categories;
};
