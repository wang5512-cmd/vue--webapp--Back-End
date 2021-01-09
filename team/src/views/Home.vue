<template>
  <div class="home">
    <div>
      <van-search
        shape="round"
        v-model="kw"
        placeholder="请输入搜索关键词"
        @click="onSearch"
        background="#f20c00"
      />
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      left-icon="volume-o"
      text="感恩回馈圣诞活动开始啦！全场5折快快抢购吧！！！。"
    />
    <van-grid :column-num="3">
      <van-grid-item
        v-for="value in categories"
        :key="value._id"
        :icon="value.coverImg | dalImg"
        :text="value.name"
        :to="{ name: 'Hot', query: { c: value._id } }"
      />
    </van-grid>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="loaddata"
      class="ul"
    >
      <li v-for="item in list" :key="item._id">
        <router-link :to="{ name: 'Details', query: { a: item._id } }"
          ><img :src="item.coverImg | dalImg" alt="" />
          <p class="pro-name">{{ item.name }}</p>
          <div class="pro-footer">
            <span class="pro-price">
              <i>￥</i>
              <span>{{ item.price }}</span>
            </span>
            <span class="pay-number"
              >{{ Math.ceil(Math.random() * 1323) }}人付款</span
            >
          </div>
        </router-link>
      </li>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";

import { loadPro } from "../services/auth";

// @ is an alias to /src
// import引入一个文件
import { allCategories } from "@/services/categories";
// import qz from "../assets/qz.png";

export default {
  name: "Home",
  data() {
    return {
      list: [],
      kw: "",
      // qz, // qz: qz
      banners: [
        "https://img10.360buyimg.com/babel/s1180x940_jfs/t1/151836/38/8185/115243/5fc73742E8da77cb9/6b45302d884ded48.jpg.webp",
        "https://img20.360buyimg.com/pop/s1180x940_jfs/t1/138448/36/10847/90521/5f88144aEb0083842/f55d675228801e4b.jpg.webp",
        "https://img10.360buyimg.com/pop/s1180x940_jfs/t1/122746/25/19635/99259/5fbc5e83E9ad70c57/8bcbb2319250a096.jpg.webp",
        "https://img10.360buyimg.com/pop/s1180x940_jfs/t1/155425/32/9088/95555/5fd0c5feE4c0a7830/20da3f7a12e614e7.jpg.webp",
        "https://img13.360buyimg.com/pop/s1180x940_jfs/t1/135815/6/19184/80459/5fd1884cE5bf6be5c/d293def7ea8c42a1.jpg.webp",
      ],
      categories: [], // 商品分类
      page: 1,
      loading: false,
      finished: false,
      error: false,
      count: 0,
      isLoading: false,
    };
  },
  async created() {
    const res = await allCategories();
    this.categories = res.categories;
  },
  components: {},
  methods: {
    onSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    async loadList() {
      let pro = await loadPro(this.page);
      this.loading = false;
      this.list.push(...pro.products);
      // console.log(pro);
      if (this.page > pro.pages) {
        this.finished = true;
      }
    },
    loaddata() {
      this.loadList();
      this.page += 1;
      // console.log(this.page);
      // console.log(this.list);
    },
    onRefresh() {
      console.log(this.list);
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
        this.page = 1;
        this.list = [];
        this.loadList();

        this.page = 2;
      }, 1000);
      setTimeout(() => {
        this.list.sort(() => Math.random() - 0.5);
      }, 1088);
    },
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item img {
  width: 100%;
}
/* 商品 */
.ul {
  display: flex;
  flex-wrap: wrap;
  background: #f7f8fa;
  /*  自动换行 */
}
.ul li {
  width: calc(50% - 10px * 2);
  margin: 10px;
  background: white;
  border-radius: 10px;
  list-style: none;
}
.ul li a {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #000;
}
.ul li img {
  width: 100%;
  border-radius: 10px;
}
.pro-name {
  font-size: 15px;
  margin: 10px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pro-footer {
  padding: 10px;
}
.pro-price {
  color: red;
}
.pay-number {
  font-size: 14px;
  color: #999;
  padding: 0 10px;
}
.pro-price span {
  font-size: 22px;
}
.show-list >>> i {
  font-size: 32px;
}
/* 图标 */
.show-list >>> .van-grid-item:nth-child(1) {
  color: #f79131;
}
.show-list >>> .van-grid-item:nth-child(2) {
  color: #f7481c;
}
.show-list >>> .van-grid-item:nth-child(3) {
  color: #ff1100;
}
.show-list >>> .van-grid-item:nth-child(4) {
  color: #3ee41d;
}
.show-list >>> .van-grid-item:nth-child(5) {
  color: #f5e55b;
}
.show-list >>> .van-grid-item:nth-child(6) {
  color: #40b3fe;
}
.show-list >>> .van-grid-item:nth-child(7) {
  color: #d14967;
}
.show-list >>> .van-grid-item:nth-child(8) {
  color: #b720e9;
}
.show-list >>> span {
  font-size: 13px;
}
</style>
