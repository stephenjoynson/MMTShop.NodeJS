/**
 * Module dependencies.
 */

var express = require("express");

var app = (module.exports = express());

var categoryRepository = require("./dist/src/categoryRepository");
var productRepository = require("./dist/src/productRepository");

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

  // key isn't present
  if (!key) return next(error(400, "api key required"));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, "invalid api key"));

  // all good, store req.key for route access
  req.key = key;
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ["foo", "bar", "baz"];

// these two objects will serve as our faux database

var featuredProducts = productRepository.getFeaturedProducts();

var categories = categoryRepository.getAvailableCategories();

var productsByCategory = (categoryId) => {
  return productRepository.getProductsByCategory(categoryId);
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
    var categoryid = parseInt(req.params.categoryid);
    res.send(productsByCategory(categoryid));
  }
);

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function (err, req, res, next) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Unknown Endpoint" });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
