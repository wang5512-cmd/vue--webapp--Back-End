<template>
  <!-- 登录 -->
  <div class="reg">
    <img
      style="width:40%;"
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <router-link :to="{ name: 'Reg' }">没有账号,我要注册</router-link>
  </div>
</template>

<script>
import { Notify } from "vant";
import { loginAPI } from "@/services/auth";
import { setToken } from "@/utils/tools";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      const u = await loginAPI(values);
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
</style>
