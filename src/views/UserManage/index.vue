<template>
  <div class="page-content UserManage" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.userName" clearable placeholder="用户姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.userMobile" clearable placeholder="用户手机号"></el-input>
        </div>
      </div>
      <div slot="table-btns">
        <el-button size="mini" @click="download">导出所有数据</el-button>
        <el-button type="primary" size="mini" @click="openAdd">添加</el-button>
      </div>
      <div slot="table">
        <el-table
          border
          stripe
          :highlight-current-row="true"
          :data="tableData"
          :header-cell-style="{ background: '#eef1f6', color: '#000000' }"
          style="width: 100%"
        >
          <el-table-column prop="user_name" label="姓名" align="center" min-width="150"></el-table-column>
          <el-table-column prop="user_mobile" label="手机号" align="center" width="110"></el-table-column>
          <el-table-column prop="user_account" label="账号" align="center" width></el-table-column>
          <el-table-column prop="user_password" label="密码" align="center" width></el-table-column>
          <el-table-column prop="user_type" label="用户角色" align="center" width></el-table-column>
          <el-table-column prop="is_member" label="是否会员" align="center" width></el-table-column>
          <el-table-column prop="member_points" label="会员积分" align="center" width></el-table-column>
          <el-table-column prop="member_level" label="会员等级" align="center" width></el-table-column>
          <el-table-column prop="member_start_time" label="会员开始时间" align="center" width></el-table-column>
          <el-table-column prop="address" label="地址" align="center" min-width="100"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center" min-width="120"></el-table-column>
          <el-table-column prop="date" label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="openAdd(scope.row)">编辑</el-button>
              <el-button type="text" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formData.pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="formData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </page-search>
    <div class="dialog">
      <el-dialog :title="addDialog.title" :visible.sync="addDialog.show" width="400px">
        <el-form ref="form" :model="addDialog.form" :rules="addDialog.rules" label-width="120px">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="addDialog.form.userName" clearable placeholder="用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号" prop="userMobile">
            <el-input v-model="addDialog.form.userMobile" clearable placeholder="用户手机号"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="userAccount">
            <el-input v-model="addDialog.form.userAccount" clearable placeholder="用户账号"></el-input>
          </el-form-item>
          <el-form-item label="用户账号密码" prop="userPassword">
            <el-input v-model="addDialog.form.userPassword" clearable placeholder="用户账号密码"></el-input>
          </el-form-item>
          <el-form-item label="是否为会员" prop="isMember">
            <el-select v-model="addDialog.form.isMember" clearable placeholder="是否为会员">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户住址" prop="userPassword">
            <el-input v-model="addDialog.form.address" clearable placeholder="用户住址"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addDialog.form.sex" clearable placeholder="性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否正常" prop="isEnable">
            <el-select v-model="addDialog.form.isEnable" clearable placeholder="是否正常">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog.show = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Api from "@/api";
import PageSearch from "@/components/PageSearch";
export default {
  name: "UserManage",
  components: {
    PageSearch
  },
  data() {
    return {
      fullscreenLoading: false,
      formData: {
        pageNo: 1,
        pageSize: 10,
        userName: "",
        userMobile: "",
        userType: ""
      },
      total: 0,
      tableDataLoading: false,
      tableData: [],
      addDialog: {
        show: false,
        title: "添加",
        form: {
          userName: "",
          userMobile: "",
          userAccount: "",
          userPassword: "",
          isMember: "",
          address: "",
          sex: "",
          isEnable: ""
        },
        rules: {
          userName: [
            { required: true, message: "请输入用户姓名", trigger: "blur" }
          ],
          userMobile: [
            { required: true, message: "请输入用户手机号", trigger: "blur" }
          ],
          userAccount: [
            { required: true, message: "请输入用户账号", trigger: "blur" }
          ],
          userPassword: [
            { required: true, message: "请输入账号密码", trigger: "blur" }
          ],
          isMember: [
            { required: true, message: "是否为会员", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入用户住址", trigger: "blur" }
          ],
          sex: [{ required: true, message: "选择用户性别", trigger: "blur" }],
          isEnable: [
            { required: true, message: "请选择是否正常", trigger: "blur" }
          ]
        }
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      console.log("获取表格数据");
      console.log("formData", this.formData);
      this.tableDataLoading = true;
      Api.UserList(this.formData)
        .then(res => {
          console.log("res", res);
          this.tableDataLoading = false;
          this.tableData = res.data;
        })
        .catch(err => {
          console.log("err", err);
          this.tableDataLoading = false;
        });
    },
    fetch() {
      console.log("fetch");
      this.formData.pageNo = 1;
      this.getTableData();
    },
    reset() {
      console.log("reset");
      Object.assign(this.formData, {
        pageNo: 1,
        userName: "",
        userMobile: "",
        userType: ""
      });
      this.getTableData();
    },
    handleSizeChange(val) {
      this.formData.pageNo = 1;
      this.formData.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.formData.pageNo = val;
      this.getTableData();
    },
    openAdd(row) {
      let params = {};
      if (!!row) {
        this.addDialog.title = "编辑";
        this.addDialog.form = {
          normalUserId: row.normal_user_id,
          userName: row.user_name,
          userMobile: row.user_mobile,
          userAccount: row.user_account,
          userPassword: row.user_password,
          isMember: row.is_member,
          address: row.address,
          sex: row.sex,
          isEnable: row.is_enable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          userName: "",
          userMobile: "",
          userAccount: "",
          userPassword: "",
          isMember: "",
          address: "",
          sex: "",
          isEnable: ""
        };
      }
      this.addDialog.show = true;
    },

    sureAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!");
          this.fullscreenLoading = true;
          if (!!this.addDialog.form.normalUserId) {
            // 编辑
            Api.UserListUpdate(this.addDialog.form)
              .then(res => {
                console.log("res", res);
                this.fullscreenLoading = false;
                this.formData.pageNo = 1;
                this.getTableData();
              })
              .catch(err => {
                console.log("err", err);
                this.fullscreenLoading = false;
              });
          } else {
            // 添加
            Api.UserListSave(this.addDialog.form)
              .then(res => {
                console.log("res", res);
                this.fullscreenLoading = false;
                this.formData.pageNo = 1;
                this.getTableData();
              })
              .catch(err => {
                console.log("err", err);
                this.fullscreenLoading = false;
              });
          }

          this.addDialog.show = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    del(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.fullscreenLoading = true;
        Api.UserListDelete({
          normalUserId: row.normal_user_id
        })
          .then(res => {
            console.log("res", res);
            this.fullscreenLoading = false;
            this.formData.pageNo = 1;
            this.getTableData();
          })
          .catch(err => {
            console.log("err", err);
            this.fullscreenLoading = false;
          });
      });
    },
    download() {
      Api.UserListDownload();
    }
  }
};
</script>

<style lang="scss" scoped>
.UserManage {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>
