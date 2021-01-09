import { get } from "@/utils/request";

/**
 * 从服务器获取商品数据
 */
export function loadProductsFromServer(params) {
  return get("/api/v1/products", params);
}

// 详情页数据

export function Details(id) {
  return get("/api/v1/products/" + id);
}
