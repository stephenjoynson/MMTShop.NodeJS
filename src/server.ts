/**
 * Module dependencies.
 */

import express from "express";
import { getAvailableCategories } from "../src/categoryRepository";
import {
  getFeaturedProducts,
  getProductsByCategory,
} from "../src/productRepository";

const app = express();

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use("/api", function (req, res, next) {
  const key = req.query["api-key"]?.toString();

  // key isn't present
  if (!key) {
    const err = new Error("API Key Required");
    res.status(400);
    next(err);
  }

  // key is invalid
  if (!~apiKeys.indexOf(key)) {
    const err = new Error("API Key Invalid");
    res.status(401);
    next(err);
  }

  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

const apiKeys = ["foo", "bar", "baz"];

// these two objects will serve as our faux database

const featuredProducts = getFeaturedProducts();

const categories = getAvailableCategories();

const productsByCategory = (categoryId: number) => {
  return getProductsByCategory(categoryId);
};

const apipathversion = "/api/v1";

// we now can assume the api key is valid,
// and simply expose the data

// example: http://localhost:3000/api/categories/?api-key=foo
app.get(`${apipathversion}/categories`, function (req, res, next) {
  res.send(categories);
});

// example: http://localhost:3000/api/featuredproducts/?api-key=foo
app.get(`${apipathversion}/featuredproducts`, function (req, res, next) {
  res.send(featuredProducts);
});

// example: http://localhost:3000/api/categories/1/products/?api-key=foo
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
