<template>
  <div class="">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div v-if="show">
      <van-card
        v-for="item in seachlist"
        :key="item._id"
        :num="item.quantity"
        :price="item.price"
        :title="item.name"
        :thumb="item.coverImg | dalImg"
        @click="xiangqing(item._id)"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import { allAPI } from "@services/categories";
import { allAPI } from "../services/categories";
// import { Details } from "../services/products";

export default {
  data() {
    return {
      value: "",
      seachlist: [],
      show: false,
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
      allAPI({ name: val, per: 200 }).then((res) => {
        console.log(res);
      });
      // this.seachlist.forEach(item=>{
      //   item.name.
      // })
      this.show = true;
    },
    onCancel() {
      Toast("取消");
      this.show = false;
    },
    async getAll() {
      const res = await allAPI();
      console.log(res.products);
      this.seachlist = res.products;
    },
    xiangqing(id) {
      console.log(id);
      this.$router.push({
        name: "Details",
        query: {
          a: id,
        },
      });
    },
  },
  created() {
    this.getAll();
  },
  coputed: {
    getAll() {
      return this.allAPI.filter((item) => item.indexOf(this.value) > -1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
