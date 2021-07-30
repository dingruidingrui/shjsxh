<template>
  <div class="userManage">
    <el-table
      :data="result.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 1000px">
      <el-table-column
        label="编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="创建者"
        prop="creator">
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="scope">
          {{scope.row.power == '0' ? '普通用户':'管理员'}}
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button :disabled="role == 0"
            size="mini"
            @click="addUser">新增</el-button>
        </template>
        <template slot-scope="scope">
          <el-button :disabled="role == 0"
            size="mini"
            @click="editUser(scope.row)">编辑</el-button>
          <el-button :disabled="role == 0"
            size="mini"
            @click="setPassword(scope.row)">重置密码</el-button>
          <el-button :disabled="role == 0"
            size="mini"
            type="danger"
            @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin: 10px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   layout="total,  prev, pager, next, jumper"
                   :total="result.length">
    </el-pagination>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input :disabled="!ifAdd" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="form.role" placeholder="请选择用户角色">
            <el-option label="普通用户" value= '0'></el-option>
            <el-option label="管理员" value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
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
  name: 'userManage',
  data () {
    return {
      role: '',
      editId: '',
      ifAdd: true,
      currentPage: 1,
      pageSize: 10,
      result: [{}],
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        role: '',
        email: ''
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
      if (this.form.username && this.form.password && this.form.role) {
        if (this.ifAdd) {
          this.add()
        } else {
          this.beginEdit()
        }
        this.dialogFormVisible = false
      } else {
        this.$message('请确保用户名、密码和角色不为空')
      }
    },
    // 新增用户
    addUser () {
      this.ifAdd = true
      this.dialogFormVisible = true
    },
    add () {
      const url = URL.add_user
      // eslint-disable-next-line camelcase,no-unused-vars
      let actual_power = 0
      // eslint-disable-next-line eqeqeq
      if (this.form.role == '管理员') {
        // eslint-disable-next-line camelcase
        actual_power = 1
      }
      axios.post(
        url,
        {
          username: this.form.username,
          password: this.form.password,
          power: actual_power
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            username: JSON.parse(localStorage.getItem('user')).username
          }
        })
        .then(
          response => {
            console.log(response)
            if (response.data.status === 200) {
              this.$message({
                message: '用户添加成功',
                type: 'success'
              })
              this.getUsers()
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
    setPassword (user) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9a-zA-Z_]{1,}$/,
        inputErrorMessage: '密码不能为空且只能包含数字、字母和下划线'
      }).then(({ value }) => {
        this.setPassword2(user, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    setPassword2 (user, newPassword) {
      const url = URL.set_password
      axios.post(
        url,
        {
          id: user.id,
          password: newPassword
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
                message: '密码重置成功',
                type: 'success'
              })
              this.getUsers()
            } else {
              this.$message('重置失败')
            }
          }
        )
        .catch(error => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    // 修改用户
    editUser (user) {
      this.editId = user.id
      this.ifAdd = false
      this.form.username = user.username
      this.form.password = user.password
      if (user.power === 1) {
        this.form.role = '管理员'
      } else {
        this.form.role = '普通用户'
      }
      this.dialogFormVisible = true
    },
    beginEdit () {
      const url = URL.edit_user
      // eslint-disable-next-line camelcase,no-unused-vars
      let actual_power = 0
      // eslint-disable-next-line eqeqeq
      if (this.form.role == '管理员' || this.form.role == '1') {
        // eslint-disable-next-line camelcase
        actual_power = 1
      }
      axios.put(
        url,
        {
          id: this.editId,
          username: this.form.username,
          power: actual_power
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            username: JSON.parse(localStorage.getItem('user')).username
          }
        })
        .then(
          response => {
            console.log(response)
            if (response.data.status === 200) {
              this.$message({
                message: '用户修改成功',
                type: 'success'
              })
              this.getUsers()
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
    // 删除用户
    deleteUser (user) {
      const url = URL.delete_user + user.id
      axios.delete(
        url,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(
          response => {
            console.log(response)
            if (response.data.status === 200) {
              this.$message({
                message: '用户删除成功！',
                type: 'success'
              })
              this.getUsers()
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
    // 获取所有用户列表
    getUsers () {
      const getUrl = URL.get_users
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
    this.getUsers()
    this.role = localStorage.getItem('userRole')
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
<style scoped>
</style>
