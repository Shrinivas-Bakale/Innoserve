/**
 * API Configuration
 * This file contains centralized API endpoint URLs for the application.
 */

// Base API URL - changes based on environment
const BASE_API_URL =
  import.meta.env.MODE === "production"
    ? "https://us-central1-fsdproject-2f44c.cloudfunctions.net/napi"
    : "http://127.0.0.1:5001/fsdproject-2f44c/us-central1/napi";

// API endpoints
export const API_ENDPOINTS = {
  // Services
  GET_ALL_SERVICES: `${BASE_API_URL}/api/example/getAllServices`,
  GET_SERVICE_BY_ID: (id) => `${BASE_API_URL}/api/example/getServiceById/${id}`,

  // Cart
  ADD_TO_CART: (userId) => `${BASE_API_URL}/api/cart/addToCart/${userId}`,
  GET_CART: (userId) => `${BASE_API_URL}/api/cart/getCart/${userId}`,

  // Orders
  CREATE_ORDER: `${BASE_API_URL}/api/orders/createOrder`,
  GET_ORDERS: (userId) => `${BASE_API_URL}/api/orders/getOrders/${userId}`,

  // Users
  CREATE_USER: `${BASE_API_URL}/api/users/createUser`,
};

export default API_ENDPOINTS;
