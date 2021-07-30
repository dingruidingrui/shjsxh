<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="分类" >
        <el-select v-model="form.categoryid" placeholder="默认选择进入目录">
             <el-option-group
              v-for="group in result.categoryList"
              :key="group.category.name"
              :label="group.category.name">
             <el-option
              v-for="item in group.details"
              :key="item.id"
              :label="item.name"
              :value="item.id">
             </el-option>
           </el-option-group>
         </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="可见性"  required>
        <el-select v-model="form.visibility" placeholder="请选择">
          <el-option label="公开的" value="公开的" ></el-option>
          <el-option label="仅会员可见的" value="仅会员可见的"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createtime" required>
        <el-date-picker type="date" value-format="yyyy-MM-dd"
                        placeholder="选择日期" v-model="form.createtime"
                        style="width: 250px"></el-date-picker>
      </el-form-item>
      <el-form-item label="标题图片" >
        <input id="titleImage" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
      </el-form-item>
      <el-form-item label="内容"  required>
        <div id="div1" style="width: 1000px">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" style="float: right">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from 'wangeditor'
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'write',
  data () {
    return {
      result: '',
      arr: [],
      categoryName: '',
      myEditor: null,
      fileList: [],
      ifAdd: true,
      ifEditId: '',
      form: {
        categoryName: '',
        title: '',
        parentid: '',
        categoryid: '',
        visibility: '公开的',
        imgurl: '',
        createtime: ''

      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        createtime: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      editor: null,
    }
  },
  methods: {
    submit () {
      if (!((this.form.title && this.form.createtime && this.form.visibility))) {
        this.$message('请确保标题、可见性、创建时间不为空')
      } else if (this.ifAdd) {
        this.addArticle()
      } else {
        this.editArticle()
      }
    },
    editArticle () {
      const url = URL.edit_article_by_id
      axios.put(
        url,
        {
          id: this.ifEditId,
          title: this.form.title,
          parentid: this.form.parentid,
          categoryid: this.form.categoryid,
          visibility: this.form.visibility,
          imgurl: this.form.imgurl,
          createtime: this.form.createtime,
          content: this.myEditor.txt.html()
        },
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                message: '文章修改成功',
                type: 'success'
              })
              this.$router.replace({path: '/view/articleManage'})
            } else {
              this.$message(response.data.message)
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    addArticle () {
      const url = URL.add_article
      axios.post(
        url,
        {
          title: this.form.title,
          parentid: this.form.parentid,
          categoryid: this.form.categoryid,
          visibility: this.form.visibility,
          imgurl: this.form.imgurl,
          createtime: this.form.createtime,
          content: this.myEditor.txt.html()
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            username: JSON.parse(localStorage.getItem('user')).username
          }
        })
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                message: '文章添加成功',
                type: 'success'
              })
              this.$router.replace({path: '/view/articleManage'})
            } else {
              this.$message(response.data.message)
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    getArticleById (id) {
      this.ifAdd = false
      this.ifEditId = id
      const url = URL.get_article_by_id + id
      axios.get(
        url,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            username: JSON.parse(localStorage.getItem('user')).username
          }
        })
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                message: '文章获取成功',
                type: 'success'
              })
              this.result = response.data.result
              this.categoryName = response.data.result.categoryName
              this.form.title = response.data.result.title
              this.form.author = response.data.result.author
              this.form.createtime = response.data.result.createtime
              this.form.visibility = response.data.result.visibility
              this.form.imgurl = response.data.result.imgurl
              this.myEditor.txt.html(response.data.result.content)

              this.form.parentid = response.data.result.parentid
              this.form.categoryid = response.data.result.categoryid
              this.form.categoryName = response.data.result.categoryName
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    createEdi () {
      // eslint-disable-next-line no-unused-vars
      const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
      // eslint-disable-next-line no-unused-vars
      class AlertMenu extends BtnMenu {
        constructor (editor) {
          // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
          const $elem = E.$(
            `<div class="w-e-menu" data-title="上传附件">
                <i class="el-icon-upload" style="font-size: 20px;margin-left: 10px"></i>
                <input id="fileInput" type="file" style="visibility:hidden"></input>
            </div>`
          )
          super($elem, editor)
        }
        chooseFile () {
          const input = document.getElementById('fileInput')
          input.click()
        }
        // 菜单点击事件
        clickHandler () {
          this.chooseFile()
        }
        tryChangeActive () {
          this.active()
        }
      }

      // 菜单 key ，各个菜单不能重复
      const menuKey = 'alertMenuKey'

      // 注册菜单
      E.registerMenu(menuKey, AlertMenu)

      const editor = new E('#div1')
      editor.config.height = 800
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'table',
        'splitLine',
        'undo',
        'redo',
      ]
      editor.config.zIndex = 1
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        console.log(resultFiles)
        let formdata = new FormData()
        formdata.append('file', resultFiles[0])
        formdata.append('type', 'image')
        axios.post(
          '/jsxhwebsite/uploadFile',
          formdata
        )
          .then(response => {
            console.log('here is reposnse')
            console.log(response)
            insertImgFn(response.data.result.filePath)
          })
          .catch(error => {
            console.log(error)
            alert('网络错误，不能访问')
          })
      }

      editor.config.uploadImgHooks = {
        // 图片上传并返回了结果，图片插入已成功
        success: function (xhr) {
          console.log('success', xhr)
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function (xhr, editor, resData) {
          console.log('fail', resData)
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
          console.log('error', xhr, resData)
        },
        // 上传图片超时
        timeout: function (xhr) {
          console.log('timeout')
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log('customInsert', result)

          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(result.data[0])
        }
      }
      // 去除富文本中粘贴word样式问题
      editor.config.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        if (content === '' && !content) return ''
        var str = content
        str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
        str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
        str = str.replace(/<\/?[^>]*>/g, '')
        str = str.replace(/[ | ]*\n/g, '<p>')
        str = str.replace(/&nbsp;/ig, '')
        console.log('****', content)
        console.log('****', str)
        return str
      }
      // editor.config.pasteFilterStyle = false
      editor.create()
      this.myEditor = editor
      document.querySelector('#fileInput').addEventListener('change', e => {
        for (let entry of e.target.files) {
          let formdata = new FormData()
          formdata.append('file', entry)
          formdata.append('type', 'file')
          axios.post(
            '/jsxhwebsite/uploadFile',
            formdata
          )
            .then(response => {
              if (response.data.status === 200) {
                editor.cmd.do('insertHTML', `<a href="${response.data.result.filePath}">${entry.name}</a>`)
              } else {
                this.$message(response.data.message)
              }
            })
            .catch(error => {
              console.log(error)
              this.$message('网络错误，不能访问')
            })
        }
      })
    },
    listenTitle () {
      document.querySelector('#titleImage').addEventListener('change', e => {
        for (let entry of e.target.files) {
          let formdata = new FormData()
          formdata.append('file', entry)
          formdata.append('type', 'pic')
          axios.post(
            '/jsxhwebsite/uploadFile',
            formdata
          )
            .then(response => {
              if (response.data.status === 200) {
                this.form.imgurl = response.data.result.filePath
              } else {
                this.$message(response.data.message)
              }
            })
            .catch(error => {
              console.log(error)
              alert('网络错误，不能访问')
            })
        }
      })
    }
  },

  mounted () {
    // 监听 ctrl+v键盘事件
    // document.addEventListener('paste', (event) => {
    //   // var clipText = event.clipboardData.getData('Text')
    //   // console.log(clipText)
    //   // console.log(event)
    //   const clipboardData = event.clipboardData || window.clipboardData
    //   console.log(clipboardData)
    //   var txt = clipboardData.getData('Text')
    //   console.log(txt)
    // })

    this.createEdi()
    this.listenTitle()

    this.ifAdd = JSON.parse(localStorage.getItem('ifAddArticle'))
    if (this.ifAdd) {
      const item = JSON.parse(localStorage.getItem('articleKind'))
      this.form.parentid = item.parentid
      this.form.categoryid = item.id
      this.form.categoryName = item.name
    } else {
      const item = JSON.parse(localStorage.getItem('article'))
      this.getArticleById(item.id)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
