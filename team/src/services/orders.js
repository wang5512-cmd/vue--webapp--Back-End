import { get, post, del } from "../utils/req";
export function getOrders(params) {
  return get("/api/v1/orders", params);
}
export function subOrder(data) {
  return post("/api/v1/orders", data);
}
export function delOrder(id) {
  return del("/api/v1/orders/" + id);
}
export function getOrderDetil(id) {
  return get("/api/v1/orders/" + id);
}
