<template>
  <!-- 注册 -->
  <div class="reg">
    <img
      class="regImag"
      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2707690916,1529169818&fm=26&gp=0.jpg"
      alt=""
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repwd"
        type="password"
        name="repwd"
        label="确认密码"
        placeholder="请再一次密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <router-link :to="{ name: 'Login' }">已有账号,我要登录</router-link>
  </div>
</template>

<script>
import { Notify } from "vant";
import { regAPI } from "@/services/auth";
import { setToken } from "@/utils/tools";
export default {
  data() {
    return {
      username: "",
      repwd: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      if (this.password != this.repwd) {
        Notify({
          type: "warning",
          message: "两次输入的密码不一致",
        });
        return;
      }
      // console.log(values);
      const u = await regAPI(values);
      if (u.code === "success") {
        setToken(u.token);
        this.$router.push({
          name: "User",
        });
      } else {
        Notify({
          type: "warning",
          message: u.message,
        });
      }
      // console.log(u);
    },
  },
};
</script>

<style scoped>
.reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.regImag {
  height: 40%;
}
</style>
