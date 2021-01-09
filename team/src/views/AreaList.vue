<template>
  <div class="add-new-address">
    <header>
      <van-nav-bar
        title="新增收货地址"
        left-arrow
        @click-left="$router.back()"
      />
      <span class="toProfile" @click="toProfile"> </span>
    </header>
    <main>
      <van-address-edit
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['北京', '上海', '广州']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </main>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    toProfile() {},
  },
};
</script>

<style scoped></style>
