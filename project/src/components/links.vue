<template>
  <div class="links">
    <div class="content">
      <div class="title">
        <h1>友情链接</h1>
      </div>
      <div class="part1"> <h2>政府部门与相关协会</h2>
      <div class="container">
        <div class="content1" v-for="(item, index) in result.dataGov" v-bind:key="index">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </div>
      </div>
      </div>
      <div class="part2">
        <h2>部分会员单位</h2>
      <div class="container">
        <div class="content1" v-for="(item, index) in result.dataMem" v-bind:key="index" >
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'links',
  data () {
    return {
      result: [],
      array1: [
        '中华人民共和国住房和城乡建设部',
        '中国建筑业协会',
        '中国施工企业管理协会',
        '中国工程项目管理网',
        '上海市住房和城乡建设管理委员会',
        '上海市交通委员会',
        '上海市建筑施工行业协会工程质量安全专业委员会',
        '上海建定建设工程信息网',
        '上海市施工现场安全生产保证体系第一审核认证中心',
        '建筑时报'
      ],
      array2: [
        '上海久事（集团）有限公司',
        '上海地产（集团）有限公司',
        '上海建工集团股份有限公司',
        '上海申通地铁集团有限公司',
        '上海申虹投资发展有限公司',
        '上海城建（集团）有限公司',
        '上海瑞安房地产发展有限公司',
        '上海现代建筑设计集团有限公司',
        '上海陆家嘴（集团）有限公司',
        '上海世博（集团）有限公司',
        '上海市政工程设计研究总院（集团）有限公司',
        '上海华城工程建设管理有限公司',
        '上海隧道股份有限公司',
        '上海建工一建集团有限公司',
        '上海园林（集团）有限公司',
        '上海市水务局',
        '上海市基础工程集团有限公司',
        '上海建工材料工程有限公司',
        '上海城投（集团）有限公司',
        '上海万国建设工程项目管理有限公司',
        '上海市建设工程管理有限公司',
        '上海久事（集团）有限公司',
        '上海岩土工程勘察设计研究院有限公司'
      ]
    }
  },
  created () {
    let url = '/jsxhwebsite/home/getFriendLinkList'
    // let url = '/jsxhwebsite/home/getFriendLinkList'
    axios.get(url)
      .then(response => {
        this.result = response.data.result
      })
      .catch(error => {
        console.log(error)
        // alert('网络错误，不能访问')
        this.$router.push('/')
      })
  }
}
</script>

<style lang="less" scoped>
a{
  text-decoration: none;
  color:#333;
}
a:hover{
  color: red;
}
.links{
  width:1000px;
  min-height: 758px;
  margin:0 auto;
  .content{
    min-height: 646px;
    margin-top: 90px;
    border: 1px solid #e4e4e4;
    .title{
      height:37px;
      h1{
        color: #0366a9;
        font-weight: bold;
        font-size: 20px;
        background: url(../assets/image/icon-.png) no-repeat 20px center;
        padding-left: 50px;
        line-height: 26px;

        display: flex;
        justify-content: left;

        margin: 10px;
      }
    }
    .container{
      display:flex;
      display: -webkit-flex; /* Safari */
      flex-flow: row wrap;
      align-content: flex-start;
      width: 1000px;

      .content1{
        flex:0 0 31%;
        box-sizing: border-box;
        height:32px;
        font-size: 14px;
        line-height: 32px;
        text-align: left;

        margin-left: 20px;

        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;

        display: block;
      }
    }
    h2{
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      padding-left: 40px;
      margin-bottom: 13px;
      text-align: left;
    }
    .part1{
      margin-bottom: 52px;
      overflow: hidden;
      border-top: 2px solid #0366a9;
      padding-top: 37px;
    }
  }
}
</style>
