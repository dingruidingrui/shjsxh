<template>
  <div class="leftMenu">
    <div class="leftMenu-item" @click="nowMenu = '菜单管理'">
      <router-link :to="{name: 'welcome'}" :class="nowMenu == '菜单管理' ?' nowitem ': ''">
        <span>菜单管理</span>
      </router-link>
    </div>
    <div class="leftMenu-item" @click="nowMenu = '用户管理'">
      <router-link :to="{name: 'userManage'}" :class="nowMenu == '用户管理' ?' nowitem ': ''">
        <span>用户管理</span>
      </router-link>
    </div>
    <div class="leftMenu-item" @click="nowMenu = '文章管理'">
      <router-link :to="{name: 'articleManage'}" :class="nowMenu == '文章管理' ?' nowitem ': ''">
        <span>文章管理</span>
      </router-link>
    </div>
    <div class="leftMenu-item" @click="nowMenu = '友情链接管理'">
      <router-link :to="{name: 'linksManage'}" :class="nowMenu == '友情链接管理' ?' nowitem ': ''">
        <span>友情链接管理</span>
      </router-link>
    </div>
    <div class="leftMenu-item" @click="nowMenu = '网站皮肤管理'">
      <router-link :to="{name: 'skin'}" :class="nowMenu == '网站皮肤管理' ?' nowitem ': ''">
        <span>网站皮肤管理</span>
      </router-link>
    </div>
    <div class="last-item">
      <el-button @click="logout"> 点此注销 </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'leftMenu',
  data () {
    return {
      nowMenu: '',
      result: [{}]
    }
  },
  methods: {
    logout () {
      this.$confirm('此操作将返回登录界面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.replace({path: '/login'})
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    getLeftMenu () {
      axios.defaults.withCredentials = true
      const getUrl = URL.get_leftMenu

      axios.get(
        getUrl,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            this.result = response.data.result
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    }
  },
  mounted () {
    this.getLeftMenu()
  }
}
</script>

<style lang="less" scoped>
.nowitem{
  background: #CFCFCF;
}
.leftMenu{
  a{
    display: block;
    width: 170px;
    height: 70px;
  }
  .leftMenu-item{
    height: 70px;
    text-align: center;
    line-height: 70px;
    color: white;
    a{
      color: #fff;
      text-decoration: none;
    }

    &:first-child {
      margin-top: 50px;
    }

    //&:last-child {
    //  margin-top: 50px;
    //}

    &:hover{
      background: #696969;
      cursor: pointer;
    }
  }
  .last-item{
    margin-top: 50px;
    text-align: center;
  }
}
</style>
