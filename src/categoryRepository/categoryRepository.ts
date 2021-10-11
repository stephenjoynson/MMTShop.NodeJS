import { categories } from "../../data/categories.json";
import { Category } from "./category";

export const getAvailableCategories = (): Array<Category> => {
  return categories;
};
