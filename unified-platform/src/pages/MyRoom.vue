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
        <el-col :span="3">
          <el-button type="primary" @click="returnFolder">返回上一级</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="Myopen('notClickDiv','publish')">创建文件夹</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="Myopen('uploadDiv','upload')">上传文件</el-button>
        </el-col>
      </el-row>
      <el-table :data="fileDataList" border stripe
                :row-style="{height: '40px'}">
        <el-table-column label="文件名称" prop="fileName" width="400px">
          <template slot-scope="scope">
            <div>
              <a href="javascript:;" @click="nextFloder(scope.row.fileName, scope.row.fileType)">{{scope.row.fileName}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="fileType"></el-table-column>
        <el-table-column label="创建日期" prop="publishDate"></el-table-column>
        <el-table-column label="链接" prop="href" width="400px">
          <template slot-scope="scope">
            <a :href="scope.row.href" target="_blank" class="buttonText">{{scope.row.href}}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="danger" style="color: red" @click="deleteFileData(scope.row.id)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div id="notClickDiv">
      <div id="publish">
        <form name="form2" method="post" action="" id="form2">
          <div class="title">创建文件夹</div>
          <div @click="myClose('notClickDiv',publish)" class="close">X</div>
          <div id="loginContent">
            <div class="input_area">
              <!--v-model 双向绑定变量tele-->
              <input type="text" id="folderName" class="uu" placeholder="请输入文件夹名称" v-model="folderName">
            </div>
            <!--click绑定函数loginSubmit 与 myClose 实现登录与关闭登录框-->
            <input name="Submit" class="login_button" type="button"  @click="createFolder(folderName)" v-focus @keyup.27="myClose('notClickDiv',publish)" value="确认创建">
          </div>
        </form>
      </div>
    </div>

    <div id="uploadDiv">
      <div id="upload">
        <form name="form3" method="post" action="" id="form3">
          <div class="title">上传文件</div>
          <div @click="myClose('uploadDiv','upload')" class="close">X</div>
          <div id="loginContent2">
            <div class="code_area" onclick="">
              <input type="text" id="files" class="files" placeholder="一次只上传一个文件，文件大请等待" v-model="files" disabled="disabled">
              <input type="file" multiple @change="getFile" />
            </div>
            <!--click绑定函数loginSubmit 与 myClose 实现登录与关闭登录框-->
            <input name="Submit" class="login_button" type="button"  @click="uploadFile" v-focus @keyup.27="myClose('uploadDiv','upload')" value="确认上传">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  name: 'MyRoom',
  data () {
    return {
      fileDataList: [],
      page: '1',
      size: '20',
      floderList: ['/'],
      folderName: '',
      files: []
    }
  },
  created () {
    this.getMyCloudSpace()
  },
  methods: {
    getMyCloudSpace () {
      var instance = this.axios.create({
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      instance.post(
        '/cloudSpace/myCloudSpace',
        {
          'account': this.$cookies.get('account'),
          'page': this.page,
          'size': this.size,
          'parentPath': this.$cookies.get('curCloudSpacePath')
        }
      ).then((response) => {
        this.fileDataList = response.data.data
        console.log(response.data.data)
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
        return this.$message.error('未登录，请先登录！')
      })
    },
    nextFloder (floderName, fileType) {
      // eslint-disable-next-line eqeqeq
      if (fileType == '文件') {
        return this.$message.error('该文件不支持预览，请访问链接下载；无法启动下载请刷新链接页面')
      }
      this.floderList.push(this.$cookies.get('curCloudSpacePath'))
      this.$cookies.set('floderList', this.floderList)
      this.$cookies.set('curCloudSpacePath', floderName)
      var instance = this.axios.create({
        // baseURL: 'http://127.0.0.1:8100/',
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      instance.post(
        '/cloudSpace/myCloudSpace',
        {
          'account': this.$cookies.get('account'),
          'page': this.page,
          'size': this.size,
          'parentPath': floderName
        }
      ).then((response) => {
        this.fileDataList = response.data.data
        console.log(response.data.data)
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
        return this.$message.error('未登录，请先登录！')
      })
    },
    returnFolder () {
      // eslint-disable-next-line eqeqeq
      if (this.floderList.length == 0) return
      let parentFloder = this.floderList.pop()
      this.$cookies.set('floderList', this.floderList)
      console.log(parentFloder)
      this.$cookies.set('curCloudSpacePath', parentFloder)
      this.getMyCloudSpace()
    },
    Myopen (parentDIV, divID) {
      this.openDiv = divID
      var notClickDiv = document.getElementById(parentDIV) // 获取id为notClickDiv的层
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
    myClose (parentDiv, divID) {
      this.openDiv = divID
      var notClickDiv = document.getElementById(parentDiv) // 获取id为notClickDiv的层
      notClickDiv.style.display = 'none'
      this.files.length = 0
    },
    createFolder (name) {
      // eslint-disable-next-line eqeqeq
      if (name == '') {
        return this.$message.error('文件夹名不能为空！')
      }
      var instance = this.axios.create({
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      instance.post(
        '/cloudSpace/create',
        {
          'account': this.$cookies.get('account'),
          'parentPath': this.$cookies.get('curCloudSpacePath'),
          'folderName': name
        }
      ).then((response) => {
        this.fileDataList = response.data.data
        console.log(response.data.data)
        this.myClose('publish')
        this.getMyCloudSpace()
        return this.$message.success('创建成功')
        // eslint-disable-next-line no-unreachable
        // eslint-disable-next-line handle-callback-err
      }).catch((error) => {
        return this.$message.error(error.response.data.message)
      })
    },
    uploadFile () {
      var instance = this.axios.create({
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      var length = this.files.length
      for (let i = 0; i < length; i++) {
        var fileName = this.files[i]
        console.log(fileName)
        instance.post(
          '/cloudSpace/upload',
          {
            'account': this.$cookies.get('account'),
            'parentPath': this.$cookies.get('curCloudSpacePath'),
            'folderName': fileName
          }
        ).then((response) => {
          this.fileDataList = response.data.data
          console.log(response.data.data)
          this.myClose('publish')
          this.getMyCloudSpace()
          // eslint-disable-next-line no-unreachable
          // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          return this.$message.error(error.response.data.message)
        })
      }
      return this.$message.success('上传成功')
    },
    async getFile (event) {
      var length = event.target.files.length
      for (let i = 0; i < length; i++) {
        let formData = new FormData()
        formData.append('file', event.target.files[i])
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
            this.files.push(res.data.data)
          } else {
            this.files.push(res.data.data)
          }
          // this.visible ? this.getFileList() : this.getEleFileList()
        }).catch(err => {
          console.log(err)
          return this.$message.error(err.response.data.message)
        })
      }
      return this.$message.success('文件加载成功')
    },
    deleteFileData (id) {
      var instance = this.axios.create({
        baseURL: axios.defaults.baseURL,
        timeout: 1000,
        headers: {'token': this.$cookies.get('token')}
      })
      var account = this.$cookies.get('account')
      var parentPath = this.$cookies.get('curCloudSpacePath')
      var message = this.$message
      var that = this
      this.$confirm('确认删除？', '提示', {
        iconClass: 'el-icon-question',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showClose: true, // 是否显示右上角关闭按钮
        type: 'warning' // 提示类型  success/info/warning/error
      }).then(function () {
        instance.post(
          '/cloudSpace/delete',
          {
            'account': account,
            'parentPath': parentPath,
            'id': id
          }
        ).then((response) => {
          that.getMyCloudSpace()
          return message.success('删除成功')
        }).catch((error) => {
          return message.error(error)
        })
      }).then()
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

#uploadDiv{
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
  height:170px;
  padding:4px;
  display:none;      /*隐藏登录的div*/
  z-index:10;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);
  border-radius:14px;
}

#upload{
  position:absolute;
  width:580px;
  height:170px;
  padding:4px;
  display:none;      /*隐藏登录的div*/
  z-index:10;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);
  border-radius:14px;
}

#upload input{
  height:40px;
  width: 100%;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
  outline:none;
}

#publish input{
  height:40px;
  width: 100%;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
  outline:none;
}

#upload .title{
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:44px;
  left:40%;
  top: 0%;
  position:absolute;
}

#publish .title{
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:44px;
  left:40%;
  top: 0%;
  position:absolute;
}

#upload .close{
  position:absolute;
  width:26px;
  height:26px;
  font-size:35px;
  margin-top:0px;
  margin-left:540px;
}

#publish .close{
  position:absolute;
  width:26px;
  height:26px;
  font-size:35px;
  margin-top:0px;
  margin-left:540px;
}

#upload .input_area{
  position:absolute;
  margin-top:50px;
  margin-left:20px;

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
#upload .input_area input{
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
#upload .input_area  .uu{
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
  margin-top:120px;
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

#upload .input_area  .deadline{
  background-image:url(../assets/icon/deadline.png);
  padding-left:60px;
  width:420px;
}
#upload .input_area  .files{
  background-image:url(../assets/icon/files.png);
  padding-left:60px;
  width:420px;
}
#upload .input_area  .pp{

  width:480px;
  height: 180px;
  /*background-image:url(../assets/icon/content.png);*/
}

#upload .input_area .code_area{
  margin-top:30px;
  width:340px;
  height:40px;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
}
#upload .input_area .code_area .code{
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

#upload .input_area .code_area .sendCode{
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

#upload .login_button{
  width:160px;
  margin-top:40px;
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
