<template>
  <div class="app-container">
    <el-button icon="el-icon-plus" size="small" type="primary" @click="toEdit"
      >新增</el-button
    >
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column prop="name" label="名字" align="center" />
      <el-table-column label="主图" width="200" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.coverImg | dalImg"
            style="max-width: 150px; max-height: 150px"
            :alt="scope.row.name"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="descriptions"
        label="简介"
        width="80"
        align="center"
      />
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="info"
            size="mini"
            style="margin-right: 1rem;"
            @click="editOne(scope.row)"
          ></el-button>
          <el-popconfirm
            title="是否确认删除此项"
            @onConfirm="delOne(scope.row)"
          >
            <el-button
              slot="reference"
              icon="el-icon-delete"
              size="mini"
              type="danger"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pageChanged"
    >
    </el-pagination>
  </div>
</template>

<script>
import { loadModelsAPI, delOneAPI } from '@/api/product_categories'

export default {
  name: 'BooksList',
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0
    }
  },
  created() {
    this.listLoading = true
    this.pageChanged(1)
    // loadProductsAPI().then(res => {
    //   this.listLoading = false
    //   this.list = res.products
    //   this.total = res.totalCount
    // })
  },
  methods: {
    async pageChanged(p) {
      this.list = []
      // console.log(p)
      const res = await loadModelsAPI(p)
      this.listLoading = false
      this.list = res.categories
      this.total = res.totalCount
    },
    toEdit() {
      this.$router.push({ name: 'ProductCategoryEdit' })
    },
    editOne(item) {
      this.$router.push({
        name: 'ProductCategoryEdit',
        query: { id: item._id }
      })
    },
    async delOne(item) {
      await delOneAPI(item._id)
      this.pageChanged(1)
    }
  }
}
</script>

<style></style>
