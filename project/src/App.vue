<template>
  <div id="app" :class="[this.skinName === 'blue' ? 'blue' : 'red']"
       :style="{backgroundImage: 'url('+ skinImgPath +')' }"
  >
    <!-- 时间日期 -->
    <div class="getDate">
      <div class="showDate">
        <span class="topTime">{{ nowDate }}</span>
        <span class="topTime">{{ nowWeek }}</span>
      </div>
    </div>
    <ad class="ad" />
    <myTop style="z-index: 1" />
    <myNav />
    <router-view class="view-content" />
    <myFooter style="z-index: 1" />
  </div>
</template>

<script>
import myTop from '@/components/topImage.vue'
import myNav from '@/components/firstMenu.vue'
import myFooter from '@/components/myFooter.vue'
import ad from '@/components/ad.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    myTop,
    myNav,
    myFooter,
    ad
  },
  data () {
    return {
      value: true,
      timer: null,
      nowDate: '',
      nowWeek: '',
      skinName: 'blue',
      skinImgPath: ''
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.setNowTimes()
    }, 1000)
  },
  methods: {
    join () {
      alert('请手动添加浏览器收藏')
    },
    setNowTimes () {
      let myDate = new Date()
      let wk = myDate.getDay()
      let yy = String(myDate.getFullYear())
      let mm = myDate.getMonth() + 1
      let dd = String(
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      )
      let weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      let week = weeks[wk]
      this.nowDate = yy + '年' + mm + '月' + dd + '日'
      this.nowWeek = week
    }
  },
  created () {
    axios.get('/jsxhwebsite/home/getHomeInfoList')
      .then(response => {
        this.skinName = response.data.result.skinName
        if (response.data.result.skinImgPath) {
          this.skinImgPath = '' + response.data.result.skinImgPath
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/')
      })
  }
}
</script>

<style lang="less">
@import "./assets/css/blue-mode.less";
@import "./assets/css/red-mode.less";

#app {
  //background-size: 100% !important;
  background-size: 100%;
  background-repeat: no-repeat ;
  background-position: left top 544px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .view-content{
    background: rgba(255,255,255,1);
  }
}
* {
  margin: 0px;
  padding: 0px;
  z-index: 3;
}

/* date的css样式 */
.getDate {
  min-width: 1000px;
  height: 30px;
  opacity: 1;
  //background: #404040;
  background: #f6f6f6;
  color: #606163;
  display: flex;
  position: relative;
  .showDate{
    //width:210px;
    position: absolute;
    right: 20px;
    display: flex;
    line-height: 30px;
    a{
      text-decoration: none;
      color: white;
    }
  }
  .changeColor{
    position: absolute;
    right: 20px;
  }
}

.topTime {
  margin-left: 20px;
}

.ad{
  z-index: 2;
  position: fixed;
  left: 30px;
  bottom: 100px;
}

</style>
