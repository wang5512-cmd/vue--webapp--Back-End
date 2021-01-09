<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
    <div class="content">
      <div class="item" v-for="item in carts" :key="item._id">
        <van-checkbox style="width: 1.5rem" v-model="item.checked">
        </van-checkbox>
        <!-- <van-card
          style="flex: 1"
          :num="item.quantity"
          :price="(item.product.price / 100).toFixed(2)"
          :title="item.product.name"
          :thumb="item.product.coverImg | dalImg"
        /> -->
        <van-card
          style="flex: 1"
          :num="item.quantity"
          :price="(item.product.price / 100).toFixed(2)"
          :title="item.product.name"
          :thumb="item.product.coverImg | dalImg"
        >
          <template #footer>
            <van-button size="mini" @click="jian(item)">-</van-button>
            <van-button size="mini" @click="jia(item)">+</van-button>
          </template>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="sumPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template> -->
    </van-submit-bar>
  </div>
</template>

<script>
import { loadCartsAPI, addCartAPI } from "@/services/carts";
import { Notify } from "vant";

export default {
  name: "Cart",
  data() {
    return {
      carts: [],
    };
  },
  computed: {
    checked: {
      set(v) {
        this.carts.forEach((item) => (item.checked = v));
      },
      get() {
        return (
          this.carts.length === this.carts.filter((item) => item.checked).length
        );
      },
    },
    sumPrice() {
      return this.carts
        .filter((item) => item.checked)
        .reduce((pre, cur) => pre + cur.product.price * cur.quantity, 0);
    },
  },
  created() {
    // const res = await loadCartsAPI();
    // // console.log(res);
    // this.carts = res.map((item) => ({ ...item, checked: false }));
    // console.log(this.carts);
    this.loadlista();
  },
  methods: {
    onSubmit() {},
    async jian(item) {
      if (item.quantity <= 1) {
        Notify("商品数量不能少于1");
      } else {
        await addCartAPI(item.product._id, -1);
        this.loadlista();
      }
    },
    async jia(item) {
      await addCartAPI(item.product._id, 1);
      this.loadlista();
    },
    async loadlista() {
      const res = await loadCartsAPI();
      // console.log(res);
      this.carts = res.map((item) => ({ ...item, checked: false }));
      console.log(this.carts);
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 0.5rem 0.8rem;
  display: flex;
  flex-direction: column;
}
.cart .content {
  flex: 1;
  overflow: auto;
}
.item {
  display: flex;
  justify-content: center;
}
</style>
