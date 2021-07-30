<template>
  <div class="userManage">
    <el-table
      v-if="result"
      :data="result.filter(data =>(!search || data.title.toLowerCase().includes(search.toLowerCase()))).slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 1000px">
      <el-table-column
        label="编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="文章名称">
        <template slot-scope="scope">
          {{scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="categoryName">
      </el-table-column>
      <el-table-column
        label="标题图片"
        prop="imgurl">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createtime ? scope.row.createtime.slice(0,10):'-'}}
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editArticle(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="slicePage">
      <el-pagination style="margin: 10px"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     layout="total,  prev, pager, next, jumper"
                     :total="result.filter(data =>(!search || data.title.toLowerCase().includes(search.toLowerCase()))).length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'articleManage',
  data () {
    return {
      menuId: '',
      search: '',
      editId: '',
      ifAdd: true,
      currentPage: 1,
      pageSize: 10,
      result: [{}],
      dialogFormVisible: false,
      form: {
        link: '',
        title: '',
        sort: '',
        type: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 分页函数
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 修改文章
    editArticle (item) {
      localStorage.setItem('article', JSON.stringify(item))
      localStorage.setItem('ifAddArticle', false)
      this.$router.replace({path: '/view/write'})
    },
    // 删除文章
    deleteArticle (article) {
      const url = URL.delete_article + article.id
      axios.delete(
        url,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.data.status === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getArticles()
            } else {
              this.$message('删除失败')
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    getArticles () {
      const getUrl = URL.get_articles
      axios.get(
        getUrl,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            this.result = response.data.result
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
<style scoped>
.el-table >>> .el-table__header{
  width: 100% !important;
}
.el-table >>> .el-table__body{
  width: 100% !important;
}
</style>
<style lang="less" scoped>
.userManage{
  margin: 30px;
  .slicePage{
    width: 1200px;
    margin-left: 200px;

  }
}
</style>
