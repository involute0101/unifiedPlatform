<template>
  <div>
    <el-card>
      <el-row :gutter="20"
      ><!-- gutter是指定每个分栏的间隔 -->
        <!-- 分栏一共占24格，给搜索框7格，添加按钮4格 -->
        <el-col :span="7">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="taskList" border stripe
                :row-style="{height: '80px'}">
        <el-table-column label="任务标题" prop="title"></el-table-column>
        <el-table-column label="任务描述" prop="content" :show-overflow-tooltip="true">

        </el-table-column>
        <el-table-column label="截止日期" prop="deadline"></el-table-column>
        <el-table-column label="文件" prop="files">
          <!--          <template slot-scope="scope">-->
          <!--            <a :href="scope.row.files" target="_blank" class="buttonText">{{scope.row.files}}</a>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <el-button type="danger" style="color: red" plain>修改</el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <div id="notClickDiv">
      <div id="publish">
        <form name="form2" method="post" action="" id="form2">
          <div class="title">发布</div>
          <div @click="myClose(publish)" class="close">X</div>
          <div id="loginContent">
            <div class="input_area">
              <!--v-model 双向绑定变量tele-->
              <input type="text" id="account" class="uu" placeholder="任务标题" v-model="title">
              <div class="code_area">
                <input type="text" id="deadline" class="deadline" placeholder="截止日期" v-model="deadline">
              </div>
              <div class="code_area" onclick="">
                <input type="text" id="files" class="files" placeholder="上传文件，请等待上传成功提示" v-model="files" disabled="disabled">
                <input type="file" multiple @change="getFile" />
              </div>
              <div class="code_area">
                <textarea cols="30" rows="10" class="pp horizon" placeholder="任务描述" v-model="content"></textarea>
              </div>
            </div>
            <!--click绑定函数loginSubmit 与 myClose 实现登录与关闭登录框-->
            <input name="Submit" class="login_button" type="button"  @click="publishTask()" v-focus @keyup.27="myClose(publish)" value="确认发布">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinishTask',
  data () {
    return {
      page: '1',
      size: '20',
      taskList: [],
      showLogin: false,
      isLogin: false,
      title: '',
      content: '',
      deadline: '',
      files: '',
      showProcess: false,
      progress: ''
    }
  },
  created () {
    this.getTaskList()
  },
  methods: {
    getTaskList () {
      // eslint-disable-next-line no-unused-vars
      var instance = this.axios.create({
        baseURL: 'http://www.involute.cn:8100/',
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      instance.post(
        '/task/finish',
        {
          'page': this.page,
          'size': this.size
        }
      ).then((response) => {
        this.taskList = response.data.data
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
        return this.$message.error('未登录，请先登录！')
      })
    },
    publishTask () {
      // eslint-disable-next-line no-unused-vars
      var instance = this.axios.create({
        baseURL: 'http://www.involute.cn:8100/',
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      instance.post(
        '/task/publish',
        {
          'title': this.title,
          'content': this.content,
          'files': this.files,
          'deadline': this.deadline
        }
      ).then((response) => {
        console.log(response.data)
        // eslint-disable-next-line eqeqeq
        if (response.data.code == 200) {
          this.myClose('publish')
          return this.$message.success('发布成功')
          // eslint-disable-next-line no-unreachable
        }
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
        console.log(error)
        return this.$message.error(error.response.data.message)
      })
    },
    Myopen (divID) {
      this.openDiv = divID
      var notClickDiv = document.getElementById('notClickDiv') // 获取id为notClickDiv的层
      notClickDiv.style.display = 'block' // 设置层显示
      document.getElementById(divID).style.display = 'block'
      notClickDiv.style.width = document.body.scrollWidth
      notClickDiv.style.height = document.body.scrollHeight // 设置由divID所指定的层显示
      // 登陆框的位置设置 左右居中
      document.getElementById(divID).style.left = document.body.scrollLeft + (document.body.clientWidth - document.getElementById(divID).offsetWidth) / 2
      // 登陆框的位置设置 如果小于屏幕可见高度 居中显示，否则，离上30px
      if (document.body.clientHeight - document.getElementById(divID).offsetHeight > 0) {
        document.getElementById(divID).style.top = document.body.scrollTop + (document.body.clientHeight - document.getElementById(divID).offsetHeight) / 2
      } else {
        document.getElementById(divID).style.top = document.body.scrollTop + 30
      }
    },
    myClose (divID) {
      this.openDiv = divID
      var notClickDiv = document.getElementById('notClickDiv') // 获取id为notClickDiv的层
      notClickDiv.style.display = 'none'
    },
    async getFile (event) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      // eslint-disable-next-line no-undef
      this.axios({
        url: 'util/upload',
        method: 'post',
        data: formData,
        headers: {'token': this.$cookies.get('token')},
        onUploadProgress: progressEvent => {
          this.showProcess = true
          let process = (progressEvent.loaded / progressEvent.total * 100 | 0)
          this.progress = `上传进度：${process}%`
        }
      }).then(res => {
        // eslint-disable-next-line eqeqeq
        if (this.files == '') {
          this.files = res.data.data
          return this.$message.success('上传成功')
        } else {
          this.files = this.files + ',' + res.data.data
          return this.$message.success('上传成功')
        }
        // this.visible ? this.getFileList() : this.getEleFileList()
      }).catch(err => {
        console.log(err)
        return this.$message.error(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
.el-table{
  margin-top: 15px;
  font-size: 12px;
}

#notClickDiv{
  background:rgba(255,255,255,1); /*设置白色的透明背景色*/
  opacity:0.9;
  position:absolute;
  display:none;         /*隐藏div框*/
  z-index:9;
  top:15%;          /*弹出框背景填满*/
  left:32%;
  margin: 0px;
  width:20px;
  height:40px;
}
#publish{
  position:absolute;
  width:580px;
  height:504px;
  padding:4px;
  display:none;      /*隐藏登录的div*/
  z-index:10;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);
  border-radius:14px;
}

#publish input{
  height:40px;
  width: 100%;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
  outline:none;
}

#publish .title{
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:44px;
  left:45%;
  top: 0%;
  position:absolute;
}

#publish .close{
  position:absolute;
  width:26px;
  height:26px;
  font-size:35px;
  margin-top:0px;
  margin-left:540px;
}

#publish .input_area{
  position:absolute;
  margin-top:50px;
  margin-left:20px;

}

#publish .input_area input{
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:25px;
  background-repeat:no-repeat;
  background-position:center;
  background-position-x:20px;
}
#publish .input_area  .uu{
  width:420px;
  padding-left:65px;
  background-image:url(../assets/icon/title.png);
}
#publish .input_area  .deadline{
  background-image:url(../assets/icon/deadline.png);
  padding-left:60px;
  width:420px;
}
#publish .input_area  .files{
  background-image:url(../assets/icon/files.png);
  padding-left:60px;
  width:420px;
}
#publish .input_area  .pp{

  width:480px;
  height: 180px;
  /*background-image:url(../assets/icon/content.png);*/
}

#publish .input_area .code_area{
  margin-top:30px;
  width:340px;
  height:40px;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
}
#publish .input_area .code_area .code{
  border:0px;
  margin:0px;
  width:97px;
  height:46px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(52,52,52,1);
  line-height:25px;
  text-align:center;
  margin-top:7px;
  margin-right:3px;
}

#publish .input_area .code_area .sendCode{
  width:120px;
  height:44px;
  background:rgba(52,52,52,1);
  border-radius:22px;
  margin-top:8px;
  margin-right:0px;
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:25px;
  text-align:center;
}

#publish .login_button{
  width:160px;
  margin-top:460px;
  margin-left:198px;
  background:rgba(52,52,52,1);
  border-radius:28px;
  opacity:0.5;
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
}
</style>
