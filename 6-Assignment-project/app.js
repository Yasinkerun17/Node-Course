const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//Users
let products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8"),
);

let users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

let orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, "utf-8"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

// GET /users
// List all users.
app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    total_users: users.length,
    users,
  });
});

// GET /users/:id
// Get a single user by ID.

app.get("/api/v1/users/:id", (req, res) => {
  id = req.params.id * 1;
  if (id > users.length) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }
  const user = users.find((el) => el.user_id === id);

  res.status(200).json({
    status: "success",
    user,
  });
});
// POST /users
// Create a new user.
app.post("/api/v1/users", (req, res) => {
  const newid = users[users.length - 1].user_id + 1;
  const newuser = Object.assign({ user_id: newid }, req.body);
  users.push(newuser);
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users));
  res.status(201).json({
    status: "Created",
    data: newuser,
  });
});

// PUT /users/:id
// Update an existing user.

app.put("/api/v1/users/:id", (req, res) => {
  id = req.params.id * 1;
  if (id > users.length) {
    res.status(404).json({
      status: "error",
      message: "Invalid ID",
    });
  }

  const index = users.findIndex((el) => el.user_id === id);
  const user = users.find((el) => el.user_id === id);
  const updateduser = Object.assign({ user_id: id }, req.body);
  users[index] = updateduser;
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users));
  res.status(200).json({
    status: "success",
    message: "Updated Successfully",
  });
});

// DELETE /users/:id
// Delete a user.

app.delete("/api/v1/users/:id", (req, res) => {
  id = req.params.id * 1;
  if (id > users.length) {
    res.status(404).json({
      status: "error",
      message: "invalid ID",
    });
  }

  users = users.filter((el) => el.user_id !== id);

  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users));
  res.status(204).json({
    status: "No content",
    data: null,
  });
});

//PRODUCTS

// GET /products
// List products. Supports filters and pagination.

app.get("/api/v1/products", (req, res) => {
  res.status(200).json({
    status: "success",
    products,
  });
});

// ORDERS

// POST /orders
// Create a new order.

app.post("/api/v1/orders", (req, res) => {
  const newid = orders[orders.length - 1].user_id + 1;
  const neworder = Object.assign({ id: newid }, req.body);
  orders.push(neworder);
  fs.writeFileSync(`${__dirname}/orders.json`, JSON.stringify(orders));
  res.status(201).json({
    status: "success",
    message: "new order created sucessfully",
  });
});

// GET /orders
// List all orders.

app.get("/api/v1/orders", (req, res) => {
  res.status(200).json({
    status: "success",
    orders,
  });
});

// GET /orders/:id
// Get order by ID.

app.get("/api/v1/orders/:id", (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  if (id > orders.length) {
    res.status(404).json({
      status: "fail",
    });
  }
  const order = orders.find((el) => el.user_id === id);
  console.log(order);

  res.status(200).json({
    status: "success",
    order: order,
  });
});

app.listen(8000, () => {
  console.log("listening on 8000...");
});
