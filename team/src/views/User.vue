<template>
  <div class="user">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="piccon">
        <div class="topuser">
          <div class="imgcon">
            <img
              src="https://portrait.gitee.com/uploads/avatars/user/2615/7847018_wang_shuai_long_1604709445.png!avatar200"
              alt=""
            />
          </div>
          <div class="nickcon">
            <p class="nick" v-if="mes.nickName">
              {{ mes.nickName }}
            </p>
            <p class="nick" v-else>
              <span v-show="!isShowNick">设置你的昵称</span>
              <input
                type="text"
                v-model="txt"
                v-show="isShowNick"
                class="inp"
              />
              <van-icon name="edit" @click="isShowNickbtn" />
            </p>
            <p class="regtime" v-if="mes.createdAt">注册于{{ createTime }}</p>
          </div>
          <div class="set">
            <el-button
              plain
              icon="el-icon-s-tools"
              circle
              size="mini"
              @click="toMenu"
              style="color:black;border:0;background:none;color:#fff"
            ></el-button>
          </div>
        </div>
        <ul class="about">
          <li>
            <span>{{ shouc.length > 0 ? shouc.length : "--" }}</span>
            <router-link :to="{ name: 'Collect', query: { id: mes._id } }"
              ><span>收藏夹</span>
            </router-link>
          </li>
          <li>
            <span>--</span>
            <router-link :to="{ name: '', query: { id: mes._id } }">
              <span>关注店铺</span>
            </router-link>
          </li>
          <li>
            <span>{{ result.length > 0 ? result.length : "--" }}</span>
            <router-link :to="{ name: 'History', query: { id: mes._id } }"
              ><span>足迹</span>
            </router-link>
          </li>
          <li>
            <span>--</span>
            <router-link :to="{ name: '', query: { id: mes._id } }"
              ><span>红包卡券</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="main">
        <div class="mainbody1">
          <p class="cardtop">
            <span class="jiachu">我的订单</span>
            <!-- <router-link :to="{ name: 'List', query: { id: mes._id } }"> -->
            <span>查看全部订单<i class="el-icon-arrow-right"> </i></span>
            <!-- </router-link> -->
          </p>
          <ul class="carbody">
            <li>
              <van-icon name="pending-payment" class="ic" />
              <span>待付款</span>
            </li>
            <li>
              <van-icon name="send-gift-o" class="ic" />
              <span>待发货</span>
            </li>
            <li>
              <i class="el-icon-truck ic"></i>
              <span>待收货</span>
            </li>
            <li>
              <i class="el-icon-chat-dot-square ic"></i>
              <span>评价</span>
            </li>
            <li>
              <van-icon name="cash-back-record" class="ic" />
              <span>退款/售后</span>
            </li>
          </ul>
        </div>
        <div class="mainbody1">
          <p class="cardtop">
            <span class="jiachu">必备工具</span>
            <span>查看全部工具<i class="el-icon-arrow-right"></i></span>
          </p>
          <div class="tools">
            <van-grid :column-num="4" :border="false">
              <van-grid-item icon="gold-coin" text="返现" />
              <van-grid-item icon="bill" text="领券中心" />
              <van-grid-item icon="balance-list" text="闲置换钱" />
              <van-grid-item icon="phone-circle" text="客服" />
              <van-grid-item icon="award" text="花呗" />
              <van-grid-item icon="smile-comment" text="菜鸟驿站" />
              <van-grid-item icon="chat" text="我的评价" />
              <van-grid-item icon="graphic" text="主题换肤" />
            </van-grid>
          </div>
        </div>
      </div>
      <van-button
        class="tuichu"
        block
        type="danger"
        color="linear-gradient(to right, #fd9026, #ff5101)"
        @click="handleDelete"
        >退出登录</van-button
      >
    </van-pull-refresh>
  </div>
</template>

<script>
import { removeToken } from "../utils/tools";
import { getUser, updateUser } from "../services/user";
import { Toast } from "vant";

export default {
  name: "User",
  data() {
    return {
      mes: {},
      txt: "",
      isShowNick: false,
      his: [],
      mesname: "",
      shouc: "",
      result: [],
      isLoading: false,
    };
  },
  async created() {
    this.get();
    this.mes = await getUser();
    if (localStorage.getItem(this.mes.userName + "his")) {
      this.his = JSON.parse(localStorage.getItem(this.mes.userName + "his"));
      var obj = {};
      for (var i = 0; i < this.his.length; i++) {
        if (!obj[this.his[i].name]) {
          if (this.his[i].name) {
            this.result.push(this.his[i]);
            obj[this.his[i].name] = true;
          }
        }
      }
      // console.log(this.his);
    }
    if (localStorage.getItem(this.mes.userName)) {
      this.shouc = JSON.parse(localStorage.getItem(this.mes.userName));
    }

    // this.$eventBus.$on("saved", this.get);
  },
  computed: {
    createTime() {
      return (
        this.mes.createdAt.substring(0, 10) +
        " " +
        (parseInt(this.mes.createdAt.substring(11, 13)) + 8 > 10
          ? parseInt(this.mes.createdAt.substring(11, 13)) + 8
          : "0" + (parseInt(this.mes.createdAt.substring(11, 13)) + 8)) +
        ":" +
        this.mes.createdAt.substring(14, 19)
      );
    },
  },

  methods: {
    handleDelete() {
      removeToken();
      this.$router.push("/login");
    },
    async get() {
      this.mes = await getUser();
      this.txt = this.mes.nickName;
      // console.log(this.mes);
    },

    isShowNickbtn() {
      if (this.isShowNick && this.txt != this.mes.nickName) {
        updateUser({ nickName: this.txt, avatar: this.mes.avatar });
        this.get();
      }
      this.isShowNick = !this.isShowNick;
    },
    toMenu() {
      this.$router.push({
        name: "Usermenu",
      });
      this.$destroy();
    },
    async onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.get();
        // console.log(this.mes);
        if (localStorage.getItem(this.mes.userName + "his")) {
          this.his = JSON.parse(
            localStorage.getItem(this.mes.userName + "his")
          );
          var obj = {};
          this.result = [];
          for (var i = 0; i < this.his.length; i++) {
            if (!obj[this.his[i].name]) {
              if (this.his[i].name) {
                this.result.push(this.his[i]);
                obj[this.his[i].name] = true;
              }
            }
          }
          // console.log(this.his);
        }
        if (localStorage.getItem(this.mes.userName)) {
          this.shouc = JSON.parse(localStorage.getItem(this.mes.userName));
        }
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>
<style scoped>
a {
  color: #fff;
}
.user {
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
}
.piccon {
  /* width: 60%; */
  height: 180px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 1px 6px 3px -5px #999;
  padding: 0 20px;
  background: linear-gradient(to right, #fd9026, #ff5101);
  color: #fff;
}
.topuser {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 25px;
}
.about {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 7px;
}
.about li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.about li span:first-child {
  margin-bottom: 5px;
  font-size: 18px;
}
.about li span:last-child {
  font-size: 10px;
}
.set {
  position: absolute;
  top: 10px;
  right: 0;
}
.set button {
  font-size: 20px;
}
.van-pull-refresh {
  height: 100%;
  overflow: auto;
}
.main {
  height: calc(100% - 190px);
  flex: 1;
  overflow: auto;
}
.mainbody1 {
  width: 90%;
  border: 1px solid #f0eded;
  margin: auto;
  margin-top: 12px;
  border-radius: 10px;
  background: #fff;
}
.mainbody1:nth-child(1) {
  height: 130px;
}
.mainbody1:nth-child(2) {
  height: 229px;
}
.tools {
  border-radius: 10px;
}
.van-grid {
  border-radius: 10px;
}
.cardtop {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid #eeeeee;
}

.cardtop span {
  line-height: 40px;
}
.cardtop .jiachu {
  font-size: 17px;
  color: black;
  font-weight: 900;
}
.cardtop span:last-child {
  font-size: 12px;
  color: #999;
}
.carbody {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.carbody li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.carbody li .ic {
  font-size: 30px;
  color: #fd9026;
}
.carbody li span {
  font-size: 13px;
  color: #333;
}
.tools >>> i {
  font-size: 32px;
}
.tools >>> .van-grid-item:nth-child(1) {
  color: #fc322c;
}
.tools >>> .van-grid-item:nth-child(2) {
  color: #faaa0a;
}
.tools >>> .van-grid-item:nth-child(3) {
  color: #f43629;
}
.tools >>> .van-grid-item:nth-child(4) {
  color: #ffb825;
}
.tools >>> .van-grid-item:nth-child(5) {
  color: #b7e7fe;
}
.tools >>> .van-grid-item:nth-child(6) {
  color: #40b3fe;
}
.tools >>> .van-grid-item:nth-child(7) {
  color: #4acd61;
}
.tools >>> .van-grid-item:nth-child(8) {
  color: #b86dd2;
}
.tools >>> span {
  font-size: 13px;
}
.btn {
  width: 80%;
  display: block;
  margin: 5px auto;
}
.nickcon {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.nick {
  /* border: 1px solid red; */
  line-height: 45px;
  font-size: 25px;
  margin-top: 10px;
}
.regtime {
  font-size: 12px;
  color: #fff;
  line-height: 45px;
  /* border: 1px solid red; */
}
.imgcon {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background: #f7f8fa;
  position: relative;
}
#font {
  font-size: 30px;
  display: flex;
  justify-content: center;
  line-height: 80px;
  color: #ccc;
}
.imgcon img {
  width: 100%;
  height: 100%;
}
.inp {
  width: 110px;
  height: 30px;
  background: linear-gradient(to right, #fd9026, #ff5101);
  border: 1px solid #ccc;
}
</style>
<style></style>
