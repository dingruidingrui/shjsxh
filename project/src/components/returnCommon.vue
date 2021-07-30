<template>
  <div class="container">
    <div class="trace" >
      <span>当前位置： >{{firstMenuName}}</span>
    </div>
    <div class="content" >
      <div class="left">
        <div class="title needChange">{{firstMenuName}}</div>
        <div class="sub-title" v-for="item in result" :key="item.id" >
          <router-link :to="{name: 'common', query: {t:Date.now() }}"
                       @click.native="changeLeft(nowid,item)"
                       :style="(item.name == nowitem.name ?'color: #7AC5CD;':'color: black;')"
                       replace>
            <span>{{item.name}}</span>
          </router-link>
        </div>
      </div>
      <div class="right">
        <div class="right-title">
          <h1 >{{ nowitem.name }}</h1>
        </div>
        <div class="right-content" v-if="nowitem.datalist && nowitem.datalist.length == 1">
          <h2 class="right-content-title" >{{ nowitem.datalist[0].title }}</h2>
          <p class="time">发布时间：{{ nowitem.datalist[0].createtime.slice(0,9) }}</p>
          <div class="rich-text" v-html="nowitem.datalist[0].content" >
          </div>
        </div>
        <div v-else class="right-content-list">
          <div class="list" style="border-bottom: 1px solid #e4e4e4;">
            <ul v-if="nowitem && nowitem.datalist">
              <li v-for="(item,index) in nowitem.datalist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  :key="index" >
                <router-link :to="{name: 'selected', query: {t:Date.now() }}"
                             replace>
                  <i class="tip"></i>
                  <el-tooltip :content="item.title" placement="bottom" effect="light">
                    <span @click="changeRight(item.categoryid,item.id)">{{item.title}}</span>
                  </el-tooltip>
                </router-link>
                <span class="time">{{item.createtime.slice(0,10)}}</span>
              </li>
            </ul>
          </div>
          <el-pagination style="margin: 10px"
                         v-if="nowitem.datalist"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-size="pageSize"
                         layout="total,  prev, pager, next, jumper"
                         :total="nowitem.datalist.length">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'common',
  data () {
    return {
      menuItem: {},
      firstMenuId: '',
      firstMenuName: '',
      currentPage: 1,
      pageSize: 15,
      nowid: '',
      result: [],
      nowitem: {}
    }
  },
  methods: {
    changeLeft (id, item) {
      // 第一格存的是所在的一级菜单
      sessionStorage.setItem('nowid', id)
      sessionStorage.setItem('nowItem', JSON.stringify(item))
    },
    changeRight (categoryId, articleId) {
      sessionStorage.setItem('categoryId', categoryId)
      sessionStorage.setItem('articleId', articleId)
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getData () {
      this.currentPage = 1
      let url = ''
      if (sessionStorage.getItem('firstMenuId')) {
        this.firstMenuId = sessionStorage.getItem('firstMenuId')
        this.nowid = this.firstMenuId
        sessionStorage.removeItem('firstMenuId')
        url = 'https://www.shjsxh.com/jsxhwebsite/home/getCategoryAndArticleById/' + this.firstMenuId
        if (sessionStorage.getItem('firstMenuName')) {
          this.firstMenuName = sessionStorage.getItem('firstMenuName')
          sessionStorage.removeItem('firstMenuName')
        }
      }

      axios.get(url)
        .then(response => {
          if (response.data.result.dataList) {
            this.result = response.data.result.dataList
            if (sessionStorage.getItem('leftId')) {
              this.nowitem = this.result.find(item => item.id === sessionStorage.getItem('leftId'))
              sessionStorage.removeItem('leftId')
            }
          }

          if (sessionStorage.getItem('nowItem')) {
            this.nowitem = JSON.parse(sessionStorage.getItem('nowItem'))
            sessionStorage.removeItem('nowItem')
          } else {
            if (response.data.result.dataList) {
              this.nowitem = response.data.result.dataList[0]
            }
          }
        })
        .catch(error => {
          console.log(error)
          // alert('网络错误，不能访问（common错误）')
          this.$router.push('/')
        })
    }
  },

  watch: {
    '$route' (to, from) {
      // eslint-disable-next-line eqeqeq
      if (to.name == 'common') {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin: 0 auto;
  .trace{
    height: 42px;
    margin: 0;
    padding: 0;
    align-items: center;
    display: flex;
    justify-content: left;
  }
  .content{
    display: flex;
    .left{
      .title{
        height:40px ;
        width: 238px;
        align-items: center;
        display: flex;
        justify-content: center;

        background: #0366a9;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
      .sub-title{
        width: 238px;
        height: 40px;
        border: 1px solid #e4e4e4;
        margin-top: -1px;

        font-size: 14px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      a,a:active{
        text-decoration: none;
        color: black;
      }
      .sub-title:hover,a:hover{
        color: #0366a9;
      }
    }
    .right{
      margin-left: 13px;
      width: 750px;
      border: 1px solid #e4e4e4;
      .right-title{
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
      .right-content{
        padding: 34px;
        color: #686868;

        font-family: Arial,'Microsoft YaHei';
        .right-content-title{
          font-weight: normal;
          line-height: 20px;
          margin-bottom: 16px;
          font-size: 20px;
          color: #444444;
          text-align: center;
        }
        .time{
          line-height: 14px;
          font-size: 14px;
          margin-bottom: 35px;
          text-align: center;
        }
        .rich-text{}
      }
      .list{
        ul{
          padding: 10px;
          li{
            position: relative;
            height: 36px;
            line-height: 36px;
            border-bottom: 1px dashed #c5c5c5;
            padding: 0 8px 0 3px;
            display: flex;
            .tip{
              position: absolute;
              display:block;
              background:#f00;
              border-radius:50%;
              width:6px;
              height:6px;
              top:15px;
              left: 5px;
            }
            a{
              position: absolute;
              left: 15px;
              text-align: left;
              text-decoration: none;
              color: #666;
              display: inline-block;
              width:450px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            a:hover{
              color: red;
            }
            width: 100%;
            .time{
              color: #999;
              position: absolute;
              right: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
