<template>
  <div class="skinBox">
    <div class="opBox">
      <div class="opItem">
        <el-radio-group v-model="id" v-for="(item, index) in result" :key="index">
          <el-radio style="margin:20px ; "   :label="item.id">{{ item.csstype }}</el-radio>
        </el-radio-group>
      </div>
      <div class="mid">
        <el-select v-model="selectedImgId" :placeholder="selectedImgName">
          <el-option
            v-for="item in backImg"
            :key="item.id"
            :label="item.festival"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="opItem">
        <el-button @click="con">切换皮肤和背景</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'skin',
  data () {
    return {
      id: '',
      form: {color: ''},
      backImg: [{}],
      selectedImgId: '',
      selectedImgName: '',
      result: [{}]
    }
  },
  methods: {
    con () {
      const url = URL.set_color + this.id
      axios.post(
        url,
        {},
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                showClose: true,
                message: '主题设置成功',
                type: 'success'
              })
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
      const imgUrl = URL.set_back_img + this.selectedImgId
      axios.post(
        imgUrl,
        {},
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                showClose: true,
                message: '背景图片设置成功',
                type: 'success'
              })
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    getColor () {
      const url = URL.get_color
      axios.get(
        url,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.result = response.data.result
              // eslint-disable-next-line eqeqeq
              this.id = this.result.find(item => item.isuse == true).id
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    getBackImg () {
      const url = URL.get_back_img
      axios.get(
        url,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.backImg = response.data.result
              // eslint-disable-next-line eqeqeq
              this.selectedImgId = this.backImg.find(item => item.isuse === true).id
              this.selectedImgName = this.backImg.find(item => item.isuse === true).festival
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    }
  },
  mounted () {
    this.getColor()
    this.getBackImg()
  }
}
</script>

<style lang="less" scoped>
.skinBox{
  position: relative;
  min-width: 800px;
  min-height: 600px;
  .opBox{
    border: 1px solid rgb(178, 178, 178);
    box-sizing: content-box;
    box-shadow: 0px 1px 4px 0px rgb(168 168 168 / 60%) inset;

    position: absolute;
    top: 30%;
    left: 30%;
    background: rgba(255,255,255,0.8);
    width: 400px;
    height: 300px;
    border-radius: 5px;

    .opItem{
      margin: 50px;
      text-align: center;
    }
  }
  .mid{
    display: flex;
    justify-content: center;
  }
}
</style>
