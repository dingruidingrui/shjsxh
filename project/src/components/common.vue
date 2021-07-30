<template>
<div class="container">
  <div class="trace" >
    <span>当前位置： >{{firstMenuName}}</span>
  </div>
  <div class="content" >
    <div class="left">
      <div class="title needChange">{{firstMenuName}}</div>
      <div class="sub-title" v-for="item in leftContent" :key="item.id" >
          <span :style="(item.selected ?'color: #0366a9;':'color: black;')"
                @click = "changeLeft(item.id)">{{item.name}}</span>
      </div>
    </div>
    <div class="right">
      <div class="right-title" v-if="rightContent.length == 1">
        <h1>{{ rightContentName }}</h1>
      </div>
      <div class="right-title" v-else>
        <h1>{{ rightContentName }}动态信息</h1>
      </div>
      <div class="right-content" v-if="rightContent.length == 1">
        <h2 class="right-content-title" >{{ rightContent[0].title }}</h2>
        <span class="common-time">{{rightContent[0].createtime.slice(0,10) || ' '}}</span>
        <div class="rich-text" v-html="rightContent[0].content" >
        </div>
      </div>
      <div v-else class="right-content-list">
        <div class="list" style="border-bottom: 1px solid #e4e4e4;">
          <ul v-if="rightContent">
            <li v-for="(item,index) in rightContent.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                :key="index" >
              <router-link :to="{name: 'selected', query: {t:Date.now() }}"
                           replace>
                <i class="tip"></i>
                <el-tooltip :content="item.title" placement="right" effect="light">
                  <span style="margin-left: 20px" @click="changeRight(item.categoryid,item.id)">{{item.title}}</span>
                </el-tooltip>
              </router-link>
              <span class="common-time">{{item.createtime.slice(0,10) || ' '}}</span>
            </li>
          </ul>
        </div>
        <el-pagination style="margin: 10px"
                       v-if="rightContent"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total,  prev, pager, next, jumper"
          :total="rightContent.length">
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
      firstMenuName: '',
      currentPage: 1,
      pageSize: 15,
      result: [],
      nowitem: {},
      rightContent: [],
      leftContent: [],
      rightContentName: ''
    }
  },
  methods: {
    getByMenuId (menuId) {
      let url = 'jsxhwebsite/home/getSubMenuById/' + menuId
      axios.get(url)
        .then(response => {
          if (response.data.result) {
            this.leftContent = response.data.result
            if (sessionStorage.getItem('leftId')) {
              this.getByLeftId(sessionStorage.getItem('leftId'))
              sessionStorage.removeItem('leftId')
            } else {
              this.getByLeftId(response.data.result[0].id)
            }
          }
        })
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
          // this.$router.push('/')
        })
    },
    getByLeftId (leftId) {
      // eslint-disable-next-line eqeqeq
      this.leftContent.find(item => item.id == leftId).selected = true
      // eslint-disable-next-line eqeqeq
      this.rightContentName = this.leftContent.find(item => item.id == leftId).name
      let url = '/jsxhwebsite/home/getDetailById/' + leftId
      axios.get(url)
        .then(response => {
          if (response.data.result) {
            this.rightContent = response.data.result
          }
        })
        .catch(error => {
          console.log(error)
          this.$router.push('/')
        })
    },
    changeLeft (id) {
      sessionStorage.setItem('leftId', id)
      this.$router.replace({
        // eslint-disable-next-line standard/object-curly-even-spacing
        name: 'common', query: {t: Date.now() }
      })
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
      this.firstMenuName = sessionStorage.getItem('firstMenuName')
      this.getByMenuId(sessionStorage.getItem('firstMenuId'))
    }
  },

  watch: {
    '$route': {
      immediate: true,
      handler (to, from) {
        if (to.name === 'common') {
          this.getData()
        }
      }
    }
  }
}
</script>
<style scoped>
.rich-text >>> table{
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.rich-text >>> p{
  text-align: left;
}
.rich-text >>> table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}

.rich-text >>> table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

</style>
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
        width: 236px;
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
        cursor: pointer;
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
        .common-time{
          line-height: 14px;
          font-size: 14px;
          margin-bottom: 35px;
          text-align: center;
        }
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
            font-size: 14px;
            .tip{
              position: absolute;
              display:block;
              background:#000;
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
            .common-time{
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
