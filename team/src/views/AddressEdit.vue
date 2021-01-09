<template>
  <div class="add-new-address">
    <header>
      <van-nav-bar title="收货地址" left-arrow @click-left="$router.back()" />
      <span class="toProfile" @click="toProfile"> </span>
    </header>
    <main>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </main>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "曹德洁",
          tel: "13943806417",
          address: "河南省郑州市银杏路与金梭路 138 号地矿家属院 11 楼 603 室",
        },
        {
          id: "2",
          name: "郑中心",
          tel: "13142629043",
          address: "河南省郑州市郑东新区祭城 5 号院",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "吴忍",
          tel: "15603748946",
          address: "河南省信阳市郸城县东风乡钱赵张吴家村",
        },
      ],
    };
  },

  methods: {
    onAdd() {
      Toast("新增地址");
      this.$router.push("/areaList");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    toProfile() {},
  },
};
</script>

<style scoped></style>
