import { categories } from "../data/categories.json";
import { CategoryList } from "./categoryList";

export const availableCategories = (): CategoryList => {

  return {
    categoryList: categories.map(item => new CategoryList(item));
  };
};
