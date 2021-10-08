import { getAvailableCategories } from "./categoryRepository";
import { categories } from "../data/categories.json";

const availableCategories = getAvailableCategories();

test("getAvailableCategories returns Array of Categories", () => {
  expect(availableCategories).toEqual(categories);
});
