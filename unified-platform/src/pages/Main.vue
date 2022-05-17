<template>
  <div>
    <div>
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="" height="25" width="25">
          <span style="margin-left: 10px">一体化平台</span>
        </div>
        <el-button type="info" @click="loginOut">退出</el-button>
      </el-header>
    </div>
    <div class="manage_page fillcontain">
      <el-row style="height: 100%;">
        <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
          <el-menu :default-active="defaultActive" style="min-height: 100%;background-color: #e8eff5" theme="dark" router>
            <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-document"></i><a >任务列表</a></template>
              <el-menu-item index="task">未完成任务</el-menu-item>
              <el-menu-item index="finishTask">已完成任务</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-plus"></i><a >添加数据</a></template>
              <el-menu-item index="addShop">添加商铺</el-menu-item>
              <el-menu-item index="addGoods">添加商品</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-star-on"></i><a >图表</a></template>
              <el-menu-item index="visitor">用户分布</el-menu-item>
              <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-edit"></i><a >编辑</a></template>
              <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
              <el-menu-item index="vueEdit">文本编辑</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-setting"></i><a >设置</a></template>
              <el-menu-item index="adminSet">管理员设置</el-menu-item>
              <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="el-icon-warning"></i><a >说明</a></template>
              <el-menu-item index="explain">说明</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" style="height: 100%;overflow: auto;">
          <router-view/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    loginOut () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.el-header {

  background-color: #566c7f;
  display: flex;
  justify-content: space-between;
  padding-left:20px;
  color:#fff;
  font-size: 25px;
  align-items: center;
}
</style>
