// Pizza data
export const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "PizzaInn Megapizza",
    ingredients: "Tomato, corn, cheese, Mozarella, beef barbeque and onion",
    price: 20,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// Customer database
export const customerDatabase = {
  "john@example.com": { password: "password123", name: "John Doe", orders: [] },
  "jane@example.com": { password: "password123", name: "Jane Smith", orders: [] },
  "demo@example.com": { password: "demo123", name: "Demo User", orders: [] },
};

// Order statuses
export const orderStatuses = [
  { id: 1, name: "Order Confirmed", description: "Your order has been confirmed" },
  { id: 2, name: "Preparing", description: "Your pizza is being prepared" },
  { id: 3, name: "Baking", description: "Your pizza is in the oven" },
  { id: 4, name: "Quality Check", description: "Checking quality" },
  { id: 5, name: "Out for Delivery", description: "Your order is on its way" },
  { id: 6, name: "Delivered", description: "Your order has been delivered" },
];
