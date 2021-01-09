import { post, get, del, put } from "../utils/req";
export function login(user) {
  return post("/api/v1/auth/login", user);
}
export function reg(user) {
  return post("/api/v1/auth/reg", user);
}
export function getUser() {
  return get("/api/v1/users/info");
}
export function uploadPic(params) {
  return post("/api/v1/common/file_upload", params);
}
export function updateUser(params) {
  return post("/api/v1/users/change_info", params);
}
export function updateUserPassword(params) {
  return post("/api/v1/users/change_pwd", params);
}
export function updatePayPassword(params) {
  return post("/api/v1/users/change_pay_pwd", params);
}
export function getAddress(params) {
  return get("/api/v1/addresses", params);
}
export function addAddress(params) {
  return post("/api/v1/addresses", params);
}
export function getOneaddress(id) {
  return get("/api/v1/addresses/" + id);
}
export function delOneaddress(id) {
  return del("/api/v1/addresses/" + id);
}
export function editOneaddress(id, params) {
  return put("/api/v1/addresses/" + id, params);
}
