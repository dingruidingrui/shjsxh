<template>
  <div class="top">
    <div class="slogan">
      <span>创新 / 协调 / 绿色 / 开放 / 共享</span>
    </div>
    <div class="search">
      <el-input v-model="input" placeholder="输入关键词搜索">
        <el-button slot="append" @click="search">搜一下</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topImage',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search () {
      if (this.input) {
        this.$router.push({path: '/searchResult', query: {t: Math.random()}})
        sessionStorage.setItem('searchInput', this.input)
        this.input = ''
      } else {
        this.$message('搜索不能为空')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  background-image: url('../assets/image/banner.jpg');
  background-size: cover;
  height: 472px;
  position: relative;
  .slogan {
    position: absolute;
    left: 550px;
    top: 40%;
    span{
      min-width: 353px;
      height: 20px;
      opacity: 0.37;
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      letter-spacing: 3px;
    }
  }
  .search{
    position: absolute;
    left: 400px;
    top: 50%;
    width: 369px;
    height: 43px;
    .el-input {
      top: 50%;
      left: 40%;
      width: 400px;
      height: 40px;
      opacity: 0.8;
    }
    .el-button{
      color:white;
      font-weight: bold;
      font-size: 15px;
      border: none;
      margin-right: -22px;
      height: 42px;
      opacity: 1;
      background: linear-gradient(-50deg,#4169E1 0%, #87CEFA 100%);
    }
  }
}

</style>
