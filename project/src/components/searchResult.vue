<template>
  <div>
    <div class="searchResult">
      <div class="title">
        <h1>搜索结果</h1>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item,index) in result.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index">
            <router-link :to="{name: 'selected', query: {t:Math.random() }}" replace>
              <p @click="change(item.categoryid,item.id)">{{item.title}}</p>
            </router-link>
            <span v-if="item && item.createtime">{{item.createtime.slice(0,10)}}</span>
          </li>
        </ul>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,  prev, pager, next, jumper"
      :total="result.length">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchResult',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      result: []
    }
  },
  methods: {
    change (categoryId, articleId) {
      sessionStorage.setItem('categoryId', categoryId)
      sessionStorage.setItem('articleId', articleId)
    },
    goBack () {
      console.log('go back')
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getData () {
      axios.post('/jsxhwebsite/home/getHomeSearchList', {
        title: sessionStorage.getItem('searchInput')
      })
        .then(response => {
          this.result = response.data.result
        })
        .catch(error => {
          console.log(error)
          // alert('网络错误，不能访问')
          this.$router.push('/')
        })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'searchResult') {
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.searchResult{
  width: 750px;
  margin: 50px auto;
  border: 1px solid #e4e4e4;

  .title{
    background: #faf9fe;
    border-bottom: 1px solid #e4e4e4;
    overflow: hidden;
    padding-left: 20px;
    h1{
      height: 18px;
      line-height: 18px;
      font-size: 16px;
      color: #444444;
      font-weight: bold;
      border-left: 3px solid #0366a9;
      padding-left: 7px;
      margin: 10px 0;
      text-align: left;
    }
  }
  .content{
    ul{
      padding: 10px;
      li{
        height: 36px;
        line-height: 36px;
        border-bottom: 1px dashed #c5c5c5;
        padding: 0 8px 0 3px;
        display: flex;
        span{
          float: right;
          color: #999;
        }
        a{
          text-align: left;
          text-decoration: none;
          color: #666;
          display: inline-block;
          width:450px;
          margin-right: 150px;
          p{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
