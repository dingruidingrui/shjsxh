<template>
  <div class="container">
    <div class="trace">
      <span>当前位置： >{{leftMenuName}}</span>
    </div>
    <div class="content" >
      <div class="left">
        <div class="title">{{leftMenuName}}</div>
        <div class="sub-title" v-for="item in result" v-bind:key="item.id" >
          <span :style="(item.selected?'color: #0366a9;':'color: black;')"
                @click="changeLeft(firstMenuId, item.id)">{{item.name}}</span>
        </div>
      </div>
      <div class="right">
        <div class="right-title">
          <h1>{{ nowitem.name }}</h1>
        </div>
        <div class="right-content" v-if="nowitem.data">
          <h2 class="right-content-title" >{{ nowitem.data.title }}</h2>
          <span class="selected-time">{{nowitem.data.createtime.slice(0,10) || ' '}}</span>
          <div class="rich-text" v-html="nowitem.data.content" >
          </div>
        </div>
  </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'selected',
  data () {
    return {
      firstMenuId: '',
      result: [{}],
      nowitem: [],
      leftMenuName: ''
    }
  },
  methods: {
    changeLeft (id, secId) {
      sessionStorage.setItem('firstMenuId', id)
      sessionStorage.setItem('leftId', secId)
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.replace({name: 'common', query: {t: Math.random() }})
    },
    getData () {
      const url = '/jsxhwebsite/home/getCategoryAndArticle'
      axios.post(url, {
        id: sessionStorage.getItem('categoryId'),
        articleId: sessionStorage.getItem('articleId')
      })
        .then(response => {
          this.firstMenuId = response.data.result.id
          this.leftMenuName = response.data.result.name
          if (response.data.result.dataList) {
            this.result = response.data.result.dataList
            // eslint-disable-next-line eqeqeq
            this.nowitem = this.result.find(item => item.selected == true)
          }
        })
        .catch(error => {
          console.log(error)
          this.$message('网路错误，不能访问')
          // this.$router.push('/')
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

  // 根据id获取内容
  created () {
    this.getData()
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
          //margin-bottom: 16px;
          font-size: 20px;
          color: #444444;
          text-align: center;
        }
        .selected-time{
          line-height: 40px;
          font-size: 14px;
          margin-bottom: 35px;
          text-align: center;
        }
      }
      .list{
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
              text-decoration: none;
              color: #666;
              display: inline-block;
              width:210px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
