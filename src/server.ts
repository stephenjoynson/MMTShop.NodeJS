import express from "express";
import { getAvailableCategories } from "../src/categoryRepository";
import {
  getFeaturedProducts,
  getProductsByCategory,
} from "../src/productRepository";

const app = express();
const apiKeys = ["foo", "bar", "baz"];
const apipathversion = "/api/v1";

const featuredProducts = getFeaturedProducts();
const categories = getAvailableCategories();
const productsByCategory = (categoryId: number) => {
  return getProductsByCategory(categoryId);
};

app.use("/api", function (req, res, next) {
  const key = req.query["api-key"]?.toString();
  if (!key) {
    const err = new Error("API Key Required");
    res.status(400);
    next(err);
  }
  if (!~apiKeys.indexOf(key)) {
    const err = new Error("API Key Invalid");
    res.status(401);
    next(err);
  }
  next();
});

app.get(`${apipathversion}/categories`, function (req, res, next) {
  res.send(categories);
});

app.get(`${apipathversion}/featuredproducts`, function (req, res, next) {
  res.send(featuredProducts);
});

app.get(
  `${apipathversion}/categories/:categoryid/products`,
  function (req, res, next) {
    const categoryid = parseInt(req.params.categoryid);
    res.send(productsByCategory(categoryid));
  }
);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
