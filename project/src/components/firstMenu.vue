<template>
  <div class="first-nav needChange">
    <div class="container ">
      <div class="sub-title">
        <router-link
          @click.native="colorIndex = 20"
          :to="{name: 'welcome'}" replace>
          <div class="menuItem" >首页</div>
        </router-link>
      </div>
      <div class="sub-title" v-for="(item,index) in result" v-bind:key="item.id" nowtitle="item">
        <router-link :to="{name: 'common', query:{t:Math.random()}}">
          <div class="menuItem" @click="menuChange(item,index)">{{item.name}}</div>
        </router-link>
      </div>
      <div class="sub-title">
        <router-link
          @click.native="colorIndex = 21"
          :to="{name: 'contactUs'}">
          <div class="menuItem" >联系我们</div>
        </router-link>
      </div>
      <div class="sub-title">
        <router-link
          @click.native="colorIndex = 22"
          :to="{name: 'links'}">
          <div class="menuItem" >友情链接</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'firstMenu',
  data () {
    return {
      result: [],
      colorIndex: sessionStorage.getItem('colorIndex') ? sessionStorage.getItem('colorIndex') : 20
    }
  },
  methods: {
    menuChange (item, index) {
      sessionStorage.setItem('firstMenuId', item.id)
      sessionStorage.setItem('firstMenuName', item.name)
      this.colorIndex = index
      sessionStorage.setItem('colorIndex', index)
    }
  },

  mounted () {
    // eslint-disable-next-line no-undef
    axios.get('/jsxhwebsite/home/getMenu')
      .then(response => {
        this.result = response.data.result
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/')
      })
  }
}
</script>

<style lang="less" scoped>
 .whiteBgc {
   background: white!important;
   color:  #0366a9!important;
 }
.first-nav{
  background: #0366a9;
  .container{
    margin: 0 auto;
    display: flex;
    height: 42px;
    width: 1000px;
    .sub-title{
      flex: 1;
      font-size: 17px;
      width: 100%;

      align-items: center;
      display: flex;
      justify-content: center;
      a{
        text-decoration: none;
        color: white;
        width: 100%;
        height: 42px;
        line-height: 42px;
        span{
          margin: 0 ;
          padding: 0 ;
        }
      }

      .menuItem{
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: white;
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: center;
        &:hover{
          background: white;
          color:  #0366a9;
        }
      }
    }
  }
}
</style>
