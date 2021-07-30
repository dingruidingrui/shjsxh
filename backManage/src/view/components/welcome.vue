<template>
  <div class="nav">
    <el-dialog title="修改菜单" :visible.sync="dialogFormVisible">
      <el-form :model="newMenu">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="newMenu.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="安插次序" :label-width="formLabelWidth">
          <el-input-number v-model="newMenu.order" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkEdit()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table">
      <el-table :data="result" style="width: 100%">
        <el-table-column type="expand" :min-width="'20px'">
          <template slot-scope="props">
            <el-table :data="props.row.details" style="width:100%">
              <el-table-column label="" prop="name"></el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button :disabled="role == 0" size="mini" @click="addMenu(1, props.row.category.id)">
                    新增
                  </el-button>
                </template>
                <template slot-scope="scope">
                  <el-button  size="mini" @click="viewArticle(scope.row)">查看文章</el-button>
                  <el-button  size="mini" @click="addArticle(scope.row)">增加文章</el-button>
<!--                  <el-button :disabled="role == 0" size="mini" @click="edit(scope.row)">修改菜单</el-button>-->
                  <el-button :disabled="role == 0" size="mini" @click="edit(scope.row)">修改菜单</el-button>
                  <el-button :disabled="role == 0" size="mini" type="danger" @click="deleteConfirm(scope.row.id)">
                    删除菜单
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="" prop="category.name" :width="'95%'"></el-table-column>
        <el-table-column align="right" :width="'200px'" >
          <template slot="header" slot-scope="scope">
            <el-button :disabled="role == 0" size="mini" @click="addMenu(0, 0)">新增一级菜单</el-button>
          </template>
          <template slot-scope="scope">
            <el-button :disabled="role == 0" size="mini" @click="edit(scope.row.category)">编辑</el-button>
            <el-button :disabled="role == 0" size="mini" type="danger" @click="deleteConfirm(scope.row.category.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import URL from '../../axios/url'

export default {
  name: 'welcome',
  data () {
    return {
      nowitem: '',
      newMenu: {name: '', order: 1},
      formLabelWidth: '80px',
      dialogFormVisible: false,
      result: [{}],
      search: '',
      secSearch: '',
      role: ''
    }
  },

  methods: {
    checkEdit () {
      if (!this.newMenu.name) this.$message('菜单名称不能为空')
      else {
        this.changeName(this.nowitem, this.newMenu.name, this.newMenu.order)
        this.dialogFormVisible = false
      }
      this.newMenu.order = 1
    },
    edit (item) {
      this.newMenu.order = parseInt(item.sort)
      this.dialogFormVisible = true
      this.nowitem = item
      this.newMenu.name = item.name
    },
    changeName (item, newName, newOrder) {
      const url = URL.change_name
      axios
        .put(
          url,
          {
            id: item.id,
            name: newName,
            sort: newOrder,
            type: item.type,
            level: item.level,
            parentid: item.parentid
          },
          // eslint-disable-next-line standard/object-curly-even-spacing
          {headers: {Authorization: localStorage.getItem('token'), }, },
        )
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getRightMenu()
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    getRightMenu () {
      axios.defaults.withCredentials = true
      const getUrl = URL.get_category

      axios
        // eslint-disable-next-line standard/object-curly-even-spacing
        .get(getUrl, {headers: {Authorization: localStorage.getItem('token'), }, })
        .then((response) => {
          this.result = response.data.result
        })
        .catch((error) => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    addMenu (level, parentId) {
      this.$prompt('请输入菜单名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '菜单名不能为空',
      })
        .then(({ value }) => {
          this.sendMenu(value, level, parentId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          })
        })
    },
    sendMenu (newName, level, parentId) {
      const url = URL.add_menu
      // eslint-disable-next-line eqeqeq
      axios
        .post(
          url,
          {
            name: newName,
            sort: 1,
            type: 1,
            level: level,
            parentid: parentId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
              username: JSON.parse(localStorage.getItem('user')).username,
            },
          },
        )
        .then((response) => {
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '菜单新增成功！',
            })
            this.getRightMenu()
          } else {
            this.$message(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    deleteConfirm (id) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMenu(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteMenu (id) {
      const url = URL.delete + id
      axios
        .delete(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
            username: JSON.parse(localStorage.getItem('user')).username,
          },
        })
        .then((responese) => {
          // eslint-disable-next-line eqeqeq
          if (responese.data.status == 200) {
            this.$message({
              message: '删除成功！',
              type: 'success',
            })
            this.getRightMenu()
          } else {
            this.$message(responese.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message('网络错误，不能访问')
        })
    },
    viewArticle (item) {
      localStorage.setItem('menuId', item.id)
      this.$router.replace({ path: '/view/articleByMenuId' })
    },
    addArticle (item) {
      localStorage.setItem('articleKind', JSON.stringify(item))
      localStorage.setItem('ifAddArticle', true)
      this.$router.replace({ path: '/view/write' })
    },
  },

  mounted () {
    this.getRightMenu()
    this.role = localStorage.getItem('userRole')
  },
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.nav {
  height: 100%;
  min-height: 600px;
  padding: 70px 20px;
  padding-bottom: 0;
  min-width: 1000px;
  .table {
    width: 1000px;
    .el-table{
      width: 1000px;
      .el-table-header{
        width: 1000px;
      }
    }
  }
}
</style>
