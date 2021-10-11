import { Product } from "./product";
import {
  getFeaturedProducts,
  getProductsByCategory,
} from "./productRepository";
import { products } from "../../data/products.json";

const featuredProducts = getFeaturedProducts();
const productsByCategory = getProductsByCategory(1);

test("getFeaturedProducts returns three Products", () => {
  expect(featuredProducts.length).toBe(3);
});

test("getFeaturedProducts returns expected Products", () => {
  expect(featuredProducts[0].sku).toBe(111111);
  expect(featuredProducts[1].sku).toBe(222222);
  expect(featuredProducts[2].sku).toBe(333333);
});

test("getFeaturedProducts returns expected property types for Products", () => {
  const firstProduct = featuredProducts[0];
  expect(firstProduct).toMatchObject<Product>(products[0]);
});

test("getProductsByCategory returns one Product", () => {
  expect(productsByCategory.length).toBe(1);
});

test("getProductsByCategory returns expected Product", () => {
  expect(productsByCategory[0].sku).toBe(111111);
});

test("getProductsByCategory returns expected property types for Products", () => {
  const firstProduct = productsByCategory[0];
  expect(firstProduct).toMatchObject<Product>(products[0]);
});
