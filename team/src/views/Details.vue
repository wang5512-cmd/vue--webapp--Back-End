<template>
  <div class="details">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" />
    <van-goods-action id="gou">
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click.native="buy(ccc)"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <div class="content">
      <img :src="ccc.coverImg" alt="" class="b" />
      <p>{{ ccc.name }}</p>
      <p>价格:{{ ccc.price }}</p>
      <van-count-down :time="time">
        <template #default="timeData">
          <span class="Countdown">秒杀倒计时：</span>
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <div v-html="ccc.content" id="tu"></div>
  </div>
</template>

<script>
import { Details } from "@/services/products";
import { Toast } from "vant";
import { addCartAPI } from "@/services/carts";

export default {
  data() {
    return {
      ccc: {},
      time: 30 * 60 * 60 * 1000,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async buy(item) {
      console.log("加入购物车");
      await addCartAPI(item._id, 1);
      Toast.success("加入购物车成功");
      this.$router.push({
        name: "Cart",
      });
    },
  },
  async created() {
    const details = await Details(this.$route.query.a);
    console.log(details);
    this.ccc = details;
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style scoped>
.content img {
  width: 100%;
  /* height: 70%; */
}
.content p {
  text-align: center;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.van-count-down {
  text-align: center;
  margin-top: 2rem;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.Countdown {
  color: red;
}
.header {
  height: 40px;
}
#tu >>> img {
  width: 100%;
}
#gou {
  position: fixed;
  bottom: 50px;
  left: 0;
}
</style>
