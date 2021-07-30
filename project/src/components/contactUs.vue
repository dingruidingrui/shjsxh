<template>
  <div class="container">
    <div class="container-header">
      <h2>联系我们</h2>
    </div>
    <div class="container-content">
      <div class="imageContainer">
        <img loading="lazy" src="../assets/image/地址.png" alt="Smiley face" >
      </div>
      <div class="textContainer">
        <p v-for="(item, index) in information" v-bind:key="index" nowtitle="item">
          {{item.name}} : {{item.value}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contactUs',
  data () {
    return {
      information: [
        {name: '地址', value: '上海市徐汇区大木桥路588号401室（近零陵路）'},
        {name: '总机', value: '021-54000878'},
        {name: '传真', value: '021-54000870'},
        {name: '邮箱', value: 'jsxhsh@sina.com'},
        {name: '投递邮箱', value: 'shjsxh18@sina.com'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  min-height: 758px;
  margin:0 auto;
  border: 1px solid #e4e4e4;
  margin-top: 40px;

  .container-header{
    height:37px;
    border-bottom: 1px solid #e4e4e4;
    overflow: hidden;
    padding: 11px 0;
    h2{
      color: #0366a9;
      font-weight: bold;
      font-size: 20px;
      background: url(../assets/image/图层-28.png) no-repeat 20px center;
      padding-left: 50px;
      line-height: 26px;

      display: flex;
      justify-content: left;

      margin: 10px;
    }
  }
  .container-content{
    padding: 27px 42px 79px;
    border-top: 2px solid #0366a9;
    .imageContainer{
      display: flex;
      image{
        justify-content: left;
      }
    }
    .textContainer{
      margin-top: 10px;
      height: 24px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
  }

}
</style>
