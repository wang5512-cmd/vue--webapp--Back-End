import { post, get } from "@/utils/request";

export function regAPI(user) {
  return post("/api/v1/auth/reg", user);
}

export function loginAPI(user) {
  return post("/api/v1/auth/login", user);
}
export function loadPro(page) {
  return get("/api/v1/products?page=" + page);
}
/**
 * 获取用户信息
 */
export function userInfoAPI() {
  return get("/api/v1/users/info");
}
