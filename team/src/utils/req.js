import axios from "axios";
import { Notify } from "vant";
import router from "../router/index";
export const serveUrl = "http://localhost:3009";
//8.131.75.51
const ins = axios.create({ timeout: 5000, baseURL: serveUrl });

ins.interceptors.request.use(
  function(con) {
    con.headers.authorization = "Bearer " + localStorage.getItem("token");
    return con;
  },
  function(err) {
    return Promise.reject(err);
  }
);
let st;
ins.interceptors.response.use(
  function(res) {
    return res.data;
  },
  function(err) {
    if (err && err.message.indexOf("timeout") > -1) {
      Notify({
        type: "warning",
        message: "请求超时，请刷新重试",
      });
    }
    if (err.response && err.response.status === 200) {
      st = 200;
    } else if (err.response && err.response.status === 401) {
      st = 401;
      Notify({
        type: "danger",
        message: "用户信息异常，请重新登录",
      });
      setTimeout(() => {
        // window.location.href = "/#/login";
        router.replace({
          name: "Login",
        });
      }, 3000);
    }
    return Promise.reject(err);
  }
);
export const get = (url, params) => ins.get(url, { params });
export const post = (url, data) => ins.post(url, data);
export const del = (url) => ins.delete(url);
export const put = (url, params) => ins.put(url, params);
export const status = st;
