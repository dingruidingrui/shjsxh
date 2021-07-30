<template>
  <div class="login">
    <div class="log-box">
      <div class="form">
        <h1>系统登录</h1>
        <p>输入您的用户名</p>
        <input v-model="userInfo.account">
        <p>输入您的密码</p>
        <input type="password" v-model="userInfo.password">
        <p>请输入验证码</p>
        <div style="display: flex">
          <input class="confirm" v-model="userInfo.VCode">
          <img :src="imgSrc" @click="imgClick" style="margin-left: 20px">
        </div>
        <button @click="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../axios/url'
export default {
  name: 'login',
  data () {
    return {
      mac: '1',
      userInfo: {
        account: '',
        password: '',
        VCode: ''
      },
      VCode: '',
      imgSrc: '',
      macAddress: [
        '9C:D2:1E:D4:EA:BF',
        '1C:3E:84:EC:95:31',
        'F8:BC:12:6F:DE:D3',
        '02:50:F2:00:00:02'
      ]
    }
  },
  methods: {
    imgClick () {
      const url = URL.login_kaptcha
      axios.get(url, {responseType: 'arraybuffer'})
        .then(response => {
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        })
        .then(data => {
          this.imgSrc = data
        })
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    permitIP () {
      const ip = sessionStorage.getItem('ip')
      // eslint-disable-next-line eqeqeq
      if (ip == '116.233.93.28') {
        return true
      } else {
        return false
      }
    },
    getmac () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      var properties = service.ExecQuery('select * from Win32_NetworkAdapterConfiguration where IPEnabled=True')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)
      // eslint-disable-next-line no-lone-blocks
      {
        var p = e.item()
        var mac = p.MACAddress
        // return mac
        this.mac = mac
      }
    },
    submit () {
      if (!this.userInfo.account) {
        this.$message('账号不能为空')
      } else if (!this.userInfo.password) {
        this.$message('密码不能为空')
      } else if (!this.userInfo.VCode) {
        this.$message('请输入验证码')
      } else if (navigator.userAgent.indexOf('Trident') <= 0) {
        this.$message('请切换到IE内核浏览器并修改相关安全配置')
      } else {
        this.getmac()
        if (!this.macAddress.includes(this.mac)) {
          this.$message('您的电脑没有访问权限')
        } else {
          console.log('nihao')
          console.log(this.userInfo.VCode)
          const posturl = URL.login_submit
          axios.defaults.withCredentials = true
          axios.post(
            posturl,
            {
              username: this.userInfo.account,
              password: this.userInfo.password
            },
            {headers: {code: this.userInfo.VCode}})
            .then(
              response => {
                if (response.data.status === 200) {
                  localStorage.setItem('token', response.data.result)
                  localStorage.setItem('user', response.config.data)
                  this.$router.push({path: '/view'})
                  this.$message({
                    message: '欢迎回来',
                    type: 'success'
                  })
                  this.getRole()
                } else {
                  this.$message(response.data.result)
                  this.imgClick()
                }
              }
            )
            .catch(error => {
              console.log(error)
              this.$message('网络错误，不能访问')
            })
        }
      }
    },
    getRole () {
      const posturl = URL.get_role
      axios.defaults.withCredentials = true
      axios.post(
        posturl,
        {userName: JSON.parse(localStorage.getItem('user')).username},
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              localStorage.setItem('userRole', response.data.result)
              console.log(localStorage.getItem('userRole'))
            } else {
              this.$message(response.data.result)
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    }
  },
  mounted () {
    this.imgClick()
  }
}
</script>

<style lang="less" scoped>
.login{
  background-image: url("../assets/log/img.png");
  position:fixed;
  height:100%;
  width: 100%;
  .log-box{
    position: relative;
    width: 500px;
    height: 450px;
    margin: 0 auto;
    margin-top: 100px;
    background: rgb(247, 247, 247);
    border: 1px solid rgba(147, 184, 189,0.8);
    border-radius: 5px;
    box-shadow: 0pt 2px 5px rgb(105 108 109 / 70%), 0px 0px 8px 5px rgb(208 223 226 / 40%) inset;
    .form{
      width: 80%;
      height: 80%;
      margin: auto;
      margin-top: 20px;
      h1{
        font-size: 48px;
        color: rgb(6, 106, 117);
        padding: 2px 0 10px 0;
        font-family: 'FranchiseRegular','Arial Narrow',Arial,sans-serif;
        font-weight: bold;
        text-align: center;
        padding-bottom: 30px;
      }
      h1:after{
        content: ' ';
        display: block;
        width: 100%;
        height: 2px;
        margin-top: 10px;
        background: -moz-linear-gradient(left, rgba(147,184,189,0) 0%, rgba(147,184,189,0.8) 20%, rgba(147,184,189,1) 53%, rgba(147,184,189,0.8) 79%, rgba(147,184,189,0) 100%);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(147,184,189,0)), color-stop(20%,rgba(147,184,189,0.8)), color-stop(53%,rgba(147,184,189,1)), color-stop(79%,rgba(147,184,189,0.8)), color-stop(100%,rgba(147,184,189,0)));
        background: -webkit-linear-gradient(left, rgba(147,184,189,0) 0%,rgba(147,184,189,0.8) 20%,rgba(147,184,189,1) 53%,rgba(147,184,189,0.8) 79%,rgba(147,184,189,0) 100%);
      }
      p{
        //margin: 2px;
      }
      input{
        width: 400px;
        height: 37px;
        border-radius: 3px;
        outline: none;
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        color: -internal-light-dark(black, white);
        background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
        cursor: text;

        border: 1px solid rgb(178, 178, 178);
        box-sizing: content-box;
        box-shadow: 0px 1px 4px 0px rgb(168 168 168 / 60%) inset;
        margin-top: 4px;
      }
      .confirm{
        width: 180px;
      }
      button{
        width: 100px;
        height:50px;
        position: absolute;
        bottom: 50px;
        right: 220px;

        background: rgb(61, 157, 179);
        color: #fff;
        font-size: 24px;
        border: 1px solid rgb(28, 108, 122);
        border-radius: 3px;
      }
      button:hover{
        font-size: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
