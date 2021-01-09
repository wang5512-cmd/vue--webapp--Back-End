<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      class="demo-ruleForm"
      label-width="100px"
      :model="ruleForm"
      :rules="rules"
    >
      <!-- prop作用是当前表格对应的验证规则名字 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="productCategory">
        <el-select
          v-model="ruleForm.productCategory"
          placeholder="请选择商品分类"
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3009/api/v1/common/file_upload"
          :show-file-list="false"
          name="file"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl | dalImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="quantity">
        <el-input v-model="ruleForm.quantity"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveProductAPI, getOneAPI, updateOneAPI } from '@/api/products'
import { loadModelsAPI } from '@/api/product_categories'
export default {
  name: 'ProductEdit',
  data() {
    return {
      imageUrl: '',
      ruleForm: {},
      categories: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        quantity: [{ required: true, message: '请输入库存', trigger: 'blur' }],
        productCategory: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    const allPC = await loadModelsAPI()
    this.categories = allPC.categories // 加载商品分类数据
    if (this.$route.query.id) {
      const res = await getOneAPI(this.$route.query.id)
      this.ruleForm = res
      this.imageUrl = res.coverImg
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.imageUrl = res.info
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    submitForm(formName) {
      // validate方法是element ui中表单自带的方法
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证通过 进行调接口操作
          // alert('submit!')
          const data = { ...this.ruleForm, coverImg: this.imageUrl }
          if (this.$route.query.id) {
            await updateOneAPI(this.$route.query.id, data)
          } else {
            await saveProductAPI(data)
          }

          this.$router.push({ name: 'ProductsList' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
