<template>
  <div class="userManage">
    <el-input
      placeholder="请输入链接名称"
      v-model="search"
      style="width: 300px;margin-bottom: 30px"
      clearable>
    </el-input>
    <el-table
      :data="result.filter(data =>(!search || data.tilte.toLowerCase().includes(search.toLowerCase()))).slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 1000px">
      <el-table-column
        label="编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="链接"
        prop="link">
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <a :href="scope.row.link" target="_blank">{{scope.row.tilte}}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="排序编号"
        prop="sort">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button
            size="mini"
            @click="addLink">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editLink(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteLink(scope.row)">删除</el-button>
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
                     :total="result.filter(data =>(!search || data.tilte.toLowerCase().includes(search.toLowerCase()))).length">
      </el-pagination>
    </div>

    <el-dialog title="新增链接" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="链接" :label-width="formLabelWidth" prop="link">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="部分会员单位" value= '部分会员单位'></el-option>
            <el-option label="政府部门与相关协会" value='政府部门与相关协会'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'linksManage',
  data () {
    return {
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
    cancel () {
      this.dialogFormVisible = false
      this.form = {
        username: '',
        password: '',
        role: '',
        email: ''
      }
    },
    // 对话框确认，判断是新增还是修改
    confirm () {
      if (this.form.link && this.form.title && this.form.sort && this.form.type) {
        if (this.ifAdd) {
          this.add()
        } else {
          this.beginEdit()
        }
        this.dialogFormVisible = false
      } else {
        this.$message('请确保链接、标题、序号、类型不为空')
      }
    },
    // 新增链接
    addLink () {
      this.ifAdd = true
      this.dialogFormVisible = true
    },
    add () {
      const url = URL.add_link
      axios.post(
        url,
        {
          link: this.form.link,
          tilte: this.form.title,
          sort: this.form.sort,
          type: this.form.type,
          imgurl: ''
        },
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.status === 200) {
              this.$message({
                message: '链接添加成功',
                type: 'success'
              })
              this.getLinks()
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    // 修改用户
    editLink (link) {
      this.editId = link.id
      this.ifAdd = false
      this.form.link = link.link
      this.form.title = link.tilte
      this.form.sort = link.sort
      this.form.type = link.type
      this.dialogFormVisible = true
    },
    beginEdit () {
      const url = URL.edit_link
      axios.put(
        url,
        {
          id: this.editId,
          link: this.form.link,
          tilte: this.form.title,
          sort: this.form.sort,
          type: this.form.type
        },
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.status === 200) {
              this.$message({
                message: '链接修改成功',
                type: 'success'
              })
              this.getLinks()
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    // 删除链接
    deleteLink (link) {
      const url = URL.delete_link + link.id
      axios.delete(
        url,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            if (response.status === 200) {
              this.$message({
                message: '链接删除成功！',
                type: 'success'
              })
              this.getLinks()
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    // 获取所有链接
    getLinks () {
      const getUrl = URL.get_links
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
  mounted () {
    this.getLinks()
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
}
</style>
