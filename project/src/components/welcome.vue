<template>
  <div class="box">
    <div class="content1">
      <div class="list1">
        <el-carousel height="150px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in result.articleImgList"
                            :style="{'background':'url( static'+ item.imgurl+')',
                            'background-size': '100% 100%'}"
      :key="index">

            <div class="images">
              <p @click="toSelected(item.categoryid,item.id)">{{item.title}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="list2 showTitles">
        <div class="common-title needChangeColor">
          <div>协会动态</div>
        </div>
        <div class="common-content">
          <ul>
            <li v-for="(item,index) in result.associationNewsList" :key="index">
              <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
              <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list3 showTitles">
        <div class="common-title needChangeColor">
          <div>文件公告</div>
        </div>
        <div class="common-content">
          <ul>
            <li v-for="(item,index) in result.documentAnnouncementList" :key="index">
              <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
              <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="showPicture">
      <img loading="lazy" src="../assets/image/通栏2.jpg" alt="Smiley face" width="1000px" height="85px">
    </div>

    <div class="content2">
      <div class="list1">
        <div class="first ">
          <div class="servicePlatform-title needChange"><i class="el-icon-monitor"></i>服务平台</div>
          <div class="servicePlatform-item">
            <span @click="service(6,'服务平台',116)">下载中心</span>
          </div>
          <div class="servicePlatform-item">
            <span @click="service(6,'服务平台',81)">法律平台</span>
          </div>
          <div class="servicePlatform-item">
            <span @click="service(6,'服务平台',104)">学习培训</span>
          </div>
          <div class="servicePlatform-item">
            <span @click="service(6,'服务平台',88)">人才交流</span>
          </div>
        </div>
        <div class="second showTitles">
          <div class="memberWindow needChange">
            <div><i class="el-icon-user"></i>会员之窗</div>
          </div>
          <div class="common-content">
            <ul>
              <li v-for="(item,index) in result.windowMembersList" :key="index">
                <p @click="toSelected(item.categoryid,item.id)">{{item.title}}</p>
                <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="third">
          <router-link :to="{name: 'common', query: {t:Math.random()}}" replace>
            <span @click="service(1,'协会介绍',59)">申请入会</span>
          </router-link>
        </div>
      </div>
      <div class="list2">
        <div class="first showTitles">
          <div class="common-title">
            <div class="needChangeColor">行业研究</div>
          </div>
          <div class="common-content">
            <ul>
              <li v-for="(item,index) in result.industryResearchList" :key="index">
                <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
                <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="second showTitles">
          <div class="common-title">
            <div class="needChangeColor">建设科技</div>
          </div>
          <div class="common-content">
            <ul>
              <li v-for="(item,index) in result.constructionScienceTechnologyList" :key="index">
                <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
                <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list3">
        <div class="first showTitles">
          <div class="common-title">
            <div class="needChangeColor">创评优选</div>
            <router-link :to="{name:'common',query: {t:Math.random()}}" replace>
              <span @click="menuChange(7,'创评优选')">更多> </span>
            </router-link>
          </div>
          <div class="common-content gudong">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="评选动态" name="first">
                <vue-seamless-scroll :data="result.selectionNewsList" :class-option="optionHover" class="seamless-warp" >
                  <ul class="item">
                    <li v-for="(item,index) in result.selectionNewsList" :key="index">
                      <router-link :to="{name: 'selected', query: {t:Math.random() }}" replace>
                        <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
                      </router-link>
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </el-tab-pane>
              <el-tab-pane label="信息公布" name="second"  @tab-click="handleClick">
                <vue-seamless-scroll :data="result.informationAnnouncementList" :class-option="optionHover"
                                     class="seamless-warp" v-if = "activeName == 'second'">
                  <ul class="item">
                    <li v-for="(item,index) in result.informationAnnouncementList" :key="index">
                      <router-link :to="{name: 'selected', query: {t:Math.random() }}" replace>
                        <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
                      </router-link>
                    </li>
                  </ul>
                </vue-seamless-scroll>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="second">
          <h3>官方公众号</h3>
          <img loading="lazy" src="../assets/image/erweima.jpg" alt="Smiley face" width="200px" height="200px">
        </div>
      </div>
    </div>

    <div class="showPicture">
      <img loading="lazy" src="../assets/image/通栏1.jpg" alt="Smiley face" width="1000px" height="85px">
    </div>

    <div class="content3">
      <div class="list1">
        <div class="home-title-color">
          <div class="needChange">协会刊物</div>
          <span @click="toCommon(5, 100)">更多> </span>
        </div>
        <div class="content">
          <div>
            <img src="../assets/gallery/pic/20170316113611657.jpg" width="120px" height="180px"/>
          </div>
          <div class="right">

            <h3>简介</h3>
            <router-link
              :to="{name: 'selected', query: {t:Math.random() }}"
               v-if="result.associationPublicationsList" replace>
              <p @click="toSelected(result.associationPublicationsList[0].categoryid,result.associationPublicationsList[0].id)">
                《上海建设经济》系上海市建设协会会刊，主管单位为上海市住房和城乡建设管理委员会。刊物创办于1993年（季刊）。经上海市新闻出版局审核，批准为“上海市连续性内部资料”出版物。
              </p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="list2 showTitles">
        <div class="home-title-color">
          <div  class="needChange">政策法规</div>
        </div>
        <div class="common-content">
          <ul>
            <li v-for="(item,index) in result.policiesRegulationsList" :key="index">
              <p @click="toSelected(item.categoryid,item.id)">. {{item.title}}</p>
              <span class="common-content-time">{{item.createtime.slice(5,10) || ' '}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="list3 showTitles">
        <div class="home-title-color">
          <div  class="needChange">友情链接</div>
          <router-link :to="{name:'links'}" replace>
            <span>更多> </span>
          </router-link>
        </div>
        <div style="padding: 10px;margin-top: 10px">
          <vue-seamless-scroll :data="result.friendLinkList" :class-option="optionHover" class="seamless-warp" >
            <ul class="item">
              <li v-for="(item,index) in result.friendLinkList" :key="index">
                <a :href="item.link" target="_blank">
                  <span>{{item.tilte}}</span>
                </a>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>

    <div class="content4">
      <div class="title needChange">
        <h3>协会风采</h3>
        <div>欢迎点击浏览</div>
      </div>
      <div class="cards">
        <vue-seamless-scroll :data="result.associationStyleList" :class-option="optionLeft" class="seamless-warp2">
          <ul class="item">
            <li v-for="(item,index) in result.associationStyleList" :key="index" >
              <router-link
                           :to="{name: 'selected', query: {t:Math.random() }}" replace>
                <img @click="toSelected(item.categoryid,item.id)" style="width: 163px; height: 122px" :src="'static' + item.imgurl" />
              </router-link>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import axios from 'axios'

export default {
  name: 'welcome',
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      result: [],
      activeName: 'first',
      pictures: [
        {title: '坚守初心 赋能发展——上海市建设协会建设工程检测专业委员会召开2021年第一次全体会议'},
        {title: '协会检测专委会结合“四史”教育组织参观上勘院62年发展史'},
        {title: '“青春正能量，携手共成长”——华城团总支五四青年节主题活动圆满成功'},
        {title: '关心企业送温暖，防疫复工两不误'},
        {title: '新春走基层 沟通结硕果'}
      ]
    }
  },
  methods: {
    toCommon (id, secId) {
      sessionStorage.setItem('firstMenuId', id)
      sessionStorage.setItem('leftId', secId)
      this.$router.replace({name: 'common', query: {t: Math.random()}})
    },
    toSelected (categoryId, articleId) {
      sessionStorage.setItem('categoryId', categoryId)
      sessionStorage.setItem('articleId', articleId)
      this.$router.replace({name: 'selected', query: {t: Math.random()}})
    },
    service (menuId, menuName, leftId) {
      this.$store.commit('service', leftId)
      sessionStorage.setItem('firstMenuId', menuId)
      sessionStorage.setItem('firstMenuName', menuName)
      sessionStorage.setItem('leftId', leftId)
      this.$router.replace({name: 'common', query: {t: Math.random()}})
    },
    menuChange (id, name) {
      sessionStorage.setItem('firstMenuId', JSON.stringify(id))
      sessionStorage.setItem('firstMenuName', name)
    },
    changeSelected (categoryId, articleId) {
      sessionStorage.setItem('categoryId', categoryId)
      sessionStorage.setItem('articleId', articleId)
    },
    handleClick (tab, event) {
      // eslint-disable-next-line eqeqeq
      this.activeName = (this.activeName == 'first') ? 'first' : 'second'
    }
  },
  computed: {
    optionLeft () {
      return {
        step: 0.4,
        direction: 2,
        limitMoveNum: 2
      }
    },
    optionHover () {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created () {
    axios.get('/jsxhwebsite/home/getHomeInfoList')
      .then(response => {
        this.result = response.data.result
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/')
        this.$message('网络错误，不能访问')
      })
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/components/global.less";
@import "../assets/css/components/welcome.less";
/deep/.el-tabs__item {
  //font-size: 18px !important;
  font-size: 16px !important;
  font-weight: 900 !important;
}
</style>
