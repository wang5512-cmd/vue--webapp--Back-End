import Vue from "vue";
import VueRouter from "vue-router";
import { isLogined } from "@/utils/tools";
import Home from "../views/Home.vue";
// import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // 一般的引入
  },
  {
    path: "/hot",
    name: "Hot",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 所有的组件在页面第一次加载的时候不会被引入，在页面跳转之后才会引入
    //  在打包的时候会把这些异步加载的路由打包成单独的文件
    component: () => import(/* webpackChunkName: "about" */ "../views/Hot.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("../views/Reg.vue"),
  },

  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("../views/Details.vue"),
  },
  {
    path: "/addressEdit",
    name: "Usermenu",
    component: () => import("../views/AddressEdit.vue"),
  },
  {
    path: "/areaList",
    name: "AreaList",
    component: () => import("../views/AreaList.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (isLogined()) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});

export default router;
