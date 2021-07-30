<template>
  <div class="myFooter">
    <div class="container">
      <div class="content1">
        <div class="logo">
          <img loading="lazy" src="../assets/image/newLogo.png" alt="Smiley face" width="69" height="97">
        </div>
        <div class="text">
          <p>Copyright ©shjsxh.com.All Rights Reserved.</p>
          <p><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">沪ICP备14036973号-1</a></p>
        </div>
      </div>
      <div class="content2">
        <div class="text1">
          <p>总机：021-54000878</p>
          <p>邮箱：jsxhsh@sina.com</p>
        </div>
        <div class="text2">
          <p>地址：徐汇区大木桥路588号4楼(近零陵路)</p>
          <p>传真：021-54000870</p>
          <p>邮编：200032</p>
        </div>
      </div>
    </div>
    <div class="footer-logo">
      <div class="footer-logo-left">
        <img loading="lazy" src="../assets/image/图层-27.png" alt="Smiley face" width="98" height="98" class="oldimage">

      </div>
      <div class="footer-logo-right">
        <div class="right-box">
          <img loading="lazy" src="../assets/image/logo.png" alt="Smiley face" width="61" height="81">
          <a href="http://www.jkbr.com.cn/" target="_blank" style="font-size: 12px;padding-top: 3px">技术支持：
            上海市建筑科学研究院有限公司</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myFooter'
}
</script>

<style lang="less" scoped>
  .myFooter {
    a {
      text-decoration: none;
      color: white;
    }

    height: 300px;
    width: 100%;
    min-width: 1100px;
    background: #0366a9;
    color: white;
    margin-top: 30px;
    position: relative;

    .container {
      width: 1000px;
      margin: 0 auto;
      padding: 30px 0;
      display: flex;
      font-size: 14px;
      font-weight: bold;
      line-height: 28px;

      .content1 {
        width: 400px;
        margin-right: 20px;
        display: flex;

        .logo {
          margin-right: 23px;
        }

        .text {
          margin-top: 5px;
          text-align: left;
        }
      }

      .content2 {
        width: 550px;
        font-weight: bold;
        line-height: 28px;
        display: flex;

        .text1 {
          padding-left: 32px;
          height: 91px;
          margin-right: 32px;
          background: url(../assets/image/line.png) no-repeat;
          margin-top: 5px;
          text-align: left;
        }

        .text2 {
          padding-left: 32px;
          width: 280px;
          height: 91px;
          background: url(../assets/image/line.png) no-repeat;
          margin-top: 5px;
          text-align: left;
        }
      }
    }

    .qrCode {
      position: relative;
      display: flex;
      width: 1000px;
      margin: 0 auto;

      .oldimage {
        position: absolute;
        right: 10px;
      }

      .buildingAd {
        position: absolute;
        width: 500px;
        left: 250px;
        top: 20px;
        height: 100px;
        display: flex;

        .text {
          font-size: smaller;
          color: white;
          margin-left: 50px;
          line-height: 100px;
          font-weight: bold;
        }
      }
    }

    .footer-logo {
      width: 1000px;
      margin: 0 auto;
      display: flex;

      .footer-logo-left {
        flex: 3;
        text-align: right;
        padding-right: 40px
      }

      .footer-logo-right {
        flex: 2;

        .right-box {
          display: flex;
          flex-direction: column;
          align-items: center
        }
      }
    }
  }
</style>
