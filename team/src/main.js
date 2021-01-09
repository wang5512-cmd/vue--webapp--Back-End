import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css"; // 引入css文件
import "nprogress/nprogress.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import { serverUrl } from "@/utils/tools";
import { AddressList } from "vant";
import { AddressEdit } from "vant";
import { NavBar } from "vant";
import { Dialog } from "vant";
import { Area } from "vant";
import { Tab, Tabs } from "vant";
import { SubmitBar } from "vant";
import { Card } from "vant";
import { Search } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Search);
Vue.use(Card);
Vue.use(SubmitBar);

Vue.use(Vant);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(Area);
Vue.use(NavBar);
Vue.use(ElementUI);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.filter("dalImg", (val) => {
  if (val) {
    if (val.startsWith("http")) {
      return val;
    } else {
      return serverUrl + val;
    }
  } else {
    return "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2388634225,2417364686&fm=26&gp=0.jpg";
  }
});

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
