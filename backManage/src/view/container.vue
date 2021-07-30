<template>
  <div class="view">
    <leftMenu class="left"/>
    <div class="right">
      <div class="top">
        <span class="logo">后台管理系统</span>
        <span class="user">亲爱的 {{ username }} ~，您好</span>
      </div>
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import leftMenu from '@/view/components/leftMenu.vue'
export default {
  name: 'container',
  data () {
    return {
      username: '',
      ip: '1.1.1.1',
      area: '北京市',
      brower: 'chrome',
      os: 'windows7'
    }
  },
  components: {leftMenu},
  mounted () {
    this.username = JSON.parse(localStorage.getItem('user')).username
  }
}
</script>

<style lang="less" scoped>
.view{
  width: 100%;
  height: 100%;
  position: relative;
  .left{
    position: absolute;
    top: 0;
    height: inherit;

    background: #333333;
    color: #fff;
    width: 170px;
    min-width: 170px;
    min-height: 750px;
    font-weight: bold;
  }
  .right{
   position: absolute;
   left: 170px;
    background: rgba(248,248,255,1);
   top: 0;
    bottom: 0;
   width: calc(100% - 170px);
   height: 100%;
   min-width: 1200px;
   bottom: 0;
   .top{
     background: #fff;
     height: 50px;
     position: relative;
     .logo{
       position: absolute;
       left: 20px;
       line-height: 50px;
       font-weight: bold;
       font-size: 20px;
       color:rgb(6, 106, 117)
     }
     .user{
       position: absolute;
       right: 20px;
       line-height: 50px;
       font-weight: bold;
       font-size: 20px;
       color:rgb(6, 106, 117)
     }
   }
   .content{
     width: 1200px;
     height: calc(100% - 70px);
     margin: 0 auto;
     padding-top: 20px;
     overflow: scroll;
   }
    }
}
</style>
