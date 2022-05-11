<template>
  <div>
    <div class="hello" id="HelloWorld">
      <div id="mainPage">
        <img src="../assets/logo.png">
        <h1>{{ msg }}</h1>
        <button id="loginButton" @click="Myopen('login')">
          登录
        </button>
      </div>
    </div>
    <div id="notClickDiv">
      <div id="login">
        <form name="form2" method="post" action="" id="form2">
          <div class="title">登录</div>
          <div @click="myClose(login)" class="close">X</div>
          <div id="loginContent">
            <div class="input_area">
              <!--v-model 双向绑定变量tele-->
              <input type="text" class="uu" placeholder="账号（手机号/邮箱）" v-model="tele" οnkeydοwn="if(event.keyCode==13){this.form.code.focus();}">
              <div class="code_area">
                <input type="text" class="pp horizon" placeholder="密码" v-model="pcode"  οnkeydοwn="if(event.keyCode==13){loginSubmit(this.form)}">
              </div>
            </div>
            <!--click绑定函数loginSubmit 与 myClose 实现登录与关闭登录框-->
            <input name="Submit" class="login_button" type="button"  @click="loginSubmit();myClose(login)" v-focus @keyup.27="myClose(login)" value="登录">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '欢迎来到 一体化平台',
      Login: {
        backgroundImage: '../assets/background.jpg'
      },
      tele: '',
      code: '',
      pcode: '',
      showLogin: false,
      isLogin: false
    }
  },
  methods: {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  color: white;
  font-weight: normal;
}
#HelloWorld {
  background: url("../assets/images/background.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
#mainPage {
  text-align: center;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
#loginButton {
  border: 1px solid #409eff;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  color: #409eff;
}

#notClickDiv{
  background:rgba(255,255,255,1); /*设置白色的透明背景色*/
  opacity:0.9;
  position:absolute;
  display:none;         /*隐藏div框*/
  z-index:9;
  top:25%;          /*弹出框背景填满*/
  left:38%;
  margin: 0px;
  width:20px;
  height:40px;
}
#login{
  position:absolute;
  width:380px;
  height:404px;
  padding:4px;
  display:none;      /*隐藏登录的div*/
  z-index:10;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.2);
  border-radius:14px;
}

#login input{
  height:40px;
  width: 100%;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
  outline:none;
}

#login .title{
  font-size:20px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:44px;
  left:45%;
  top: 0%;
  position:absolute;
}

#login .close{
  position:absolute;
  width:26px;
  height:26px;
  font-size:35px;
  margin-top:0px;
  margin-left:340px;
}

#login .input_area{
  position:absolute;
  margin-top:140px;
  margin-left:20px;

}

#login .input_area input{
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:25px;
  background-repeat:no-repeat;
  background-position:center;
  background-position-x:20px;
}
#login .input_area  .uu{
  width:280px;
  padding-left:60px;
  background-image:url(../assets/icon/tele.png);
}
#login .input_area  .cc{
  /*background-image:url(../img/check.png);*/
  padding-left:55px;
  width:360px;
}
#login .input_area  .pp{
  padding-left:60px;
  width:280px;
  background-image:url(../assets/icon/lock.png);
}

#login .input_area .code_area{
  margin-top:30px;
  width:340px;
  height:40px;
  border-radius:28px;
  background:rgba(247,247,247,1);
  border:0px;
}
#login .input_area .code_area .code{
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

#login .input_area .code_area .sendCode{
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

#login .login_button{
  width:160px;
  margin-top:30px;
  margin-top:330px;
  margin-left:110px;
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
