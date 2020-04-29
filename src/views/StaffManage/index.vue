<template>
  <div class="page-content StaffManage" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.staffName" clearable placeholder="员工姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.staffMobile" clearable placeholder="员工手机号"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.leaderName" clearable placeholder="领导姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.leaderMobile" clearable placeholder="领导手机号"></el-input>
        </div>
      </div>
      <div slot="table-btns">
        <el-button size="mini" @click="download">导出所有数据</el-button>
        <el-button type="primary" size="mini" @click="openAdd">添加</el-button>
      </div>
      <div slot="table" v-loading="tableDataLoading">
        <el-table
          border
          stripe
          :highlight-current-row="true"
          :data="tableData"
          :header-cell-style="{ background: '#eef1f6', color: '#000000' }"
          style="width: 100%"
        >
          <el-table-column prop="staffName" label="姓名" align="center" min-width="150"></el-table-column>
          <el-table-column prop="staffMobile" label="手机号" align="center" width="110"></el-table-column>
          <el-table-column prop="staffPassword" label="密码" align="center" width></el-table-column>
          <el-table-column prop="leaderName" label="领导姓名" align="center" width></el-table-column>
          <el-table-column prop="leaderMobile" label="领导手机号" align="center" width></el-table-column>
          <el-table-column prop="staffCardNo" label="银行卡号" align="center" width></el-table-column>
          <el-table-column prop="staffCardName" label="账户姓名" align="center" width></el-table-column>
          <el-table-column prop="staffCardBank" label="开户行" align="center" width></el-table-column>
          <el-table-column prop="staffSalary" label="薪资(月)" align="center" min-width="100"></el-table-column>
          <el-table-column prop="staffWorkingYears" label="工作年限" align="center" min-width="120"></el-table-column>
          <el-table-column prop="staffAddress" label="住址" align="center" width></el-table-column>
          <el-table-column prop="isEnable" label="是否正常" align="center" width></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" width></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间" align="center" width></el-table-column>
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
          <el-form-item label="员工姓名" prop="staffName">
            <el-input v-model="addDialog.form.staffName" clearable placeholder="员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="员工手机号" prop="staffMobile">
            <el-input v-model="addDialog.form.staffMobile" clearable placeholder="员工手机号"></el-input>
          </el-form-item>
          <el-form-item label="员工密码" prop="staffPassword">
            <el-input v-model="addDialog.form.staffPassword" clearable placeholder="员工密码"></el-input>
          </el-form-item>
          <el-form-item label="员工领导姓名" prop="leaderName">
            <el-input v-model="addDialog.form.leaderName" clearable placeholder="员工领导姓名"></el-input>
          </el-form-item>
          <el-form-item label="员工领导手机号" prop="leaderMobile">
            <el-input v-model="addDialog.form.leaderMobile" clearable placeholder="员工领导手机号"></el-input>
          </el-form-item>
          <el-form-item label="员工银行卡号" prop="staffCardNo">
            <el-input v-model="addDialog.form.staffCardNo" clearable placeholder="员工银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="员工银行卡账户姓名" prop="staffCardName">
            <el-input v-model="addDialog.form.staffCardName" clearable placeholder="员工银行卡账户姓名"></el-input>
          </el-form-item>
          <el-form-item label="员工银行卡开户行" prop="staffCardBank">
            <el-input v-model="addDialog.form.staffCardBank" clearable placeholder="员工银行卡开户行"></el-input>
          </el-form-item>
          <el-form-item label="薪资(月)" prop="staffSalary">
            <el-input v-model="addDialog.form.staffSalary" clearable placeholder="薪资(月)"></el-input>
          </el-form-item>
          <el-form-item label="员工工作年限" prop="staffWorkingYears">
            <el-input v-model="addDialog.form.staffWorkingYears" clearable placeholder="员工工作年限"></el-input>
          </el-form-item>
          <el-form-item label="员工住址" prop="staffAddress">
            <el-input v-model="addDialog.form.staffAddress" clearable placeholder="员工住址"></el-input>
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
  name: "StaffManage",
  components: {
    PageSearch
  },
  data() {
    return {
      fullscreenLoading: false,
      formData: {
        pageNo: 1,
        pageSize: 10,
        staffName: "",
        staffMobile: "",
        leaderName: "",
        leaderMobile: "",
      },
      total: 0,
      tableDataLoading: false,
      tableData: [],
      addDialog: {
        show: false,
        title: "添加",
        form: {
          staffName: "",
          staffMobile: "",
          staffPassword: "",
          leaderName: "",
          leaderMobile: "",
          staffCardNo: "",
          staffCardName: "",
          staffCardBank: "",
          staffSalary: "",
          staffWorkingYears: "",
          staffAddress: "",
          isEnable: "是"
        },
        rules: {
          staffName: [
            { required: true, message: "请输入员工姓名", trigger: "blur" }
          ],
          staffMobile: [
            { required: true, message: "请输入员工手机号", trigger: "blur" }
          ],
          staffPassword: [
            { required: true, message: "请输入员工密码", trigger: "blur" }
          ],
          leaderName: [
            { required: true, message: "请输入员工领导姓名", trigger: "blur" }
          ],
          leaderMobile: [
            { required: true, message: "请输入员工领导手机号", trigger: "blur" }
          ],
          staffCardNo: [
            { required: true, message: "请输员工银行卡号", trigger: "blur" }
          ],
          staffCardName: [
            { required: true, message: "请输员工银行卡账户姓名", trigger: "blur" }
          ],
          staffCardBank: [
            { required: true, message: "请输员工银行卡开户行", trigger: "blur" }
          ],
          staffSalary: [
            { required: true, message: "请输员工薪资(月)", trigger: "blur" }
          ],
          staffWorkingYears: [
            { required: true, message: "请输员工工作年限", trigger: "blur" }
          ],
          staffAddress: [
            { required: true, message: "请输员工住址", trigger: "blur" }
          ],
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
      console.log('formData', this.formData)
      this.tableDataLoading = true;
      Api.StaffList(this.formData)
        .then(res => {
          console.log("res", res);
          this.tableDataLoading = false;
          this.total = res.data.total;
          this.tableData = res.data.list;
        })
        .catch(err => {
          console.log("err", err);
          this.tableDataLoading = false;
          this.total = 0;
          this.tableData = [];
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
        staffName: "",
        staffMobile: "",
        leaderName: "",
        leaderMobile: "",
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
      if (!!row.staffManagementId) {
        this.addDialog.title = "编辑";
        this.addDialog.form = {
          staffManagementId: row.staffManagementId,
          staffName: row.staffName,
          staffMobile: row.staffMobile,
          staffPassword: row.staffPassword,
          leaderName: row.leaderName,
          leaderMobile: row.leaderMobile,
          staffCardNo: row.staffCardNo,
          staffCardName: row.staffCardName,
          staffCardBank: row.staffCardBank,
          staffSalary: row.staffSalary,
          staffWorkingYears: row.staffWorkingYears,
          staffAddress: row.staffAddress,
          isEnable: row.isEnable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          staffName: "",
          staffMobile: "",
          staffPassword: "",
          leaderName: "",
          leaderMobile: "",
          staffCardNo: "",
          staffCardName: "",
          staffCardBank: "",
          staffSalary: "",
          staffWorkingYears: "",
          staffAddress: "",
          isEnable: "是"
        };
      }
      this.addDialog.show = true;
    },

    sureAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.fullscreenLoading = true;
          let params = JSON.parse(JSON.stringify(this.addDialog.form));
          if (!!params.staffManagementId) {
            // 编辑
            Api.StaffListUpdate(params)
              .then(res => {
                console.log("res", res);
                this.fullscreenLoading = false;
                this.getTableData();
              })
              .catch(err => {
                console.log("err", err);
                this.fullscreenLoading = false;
              });
          } else {
            // 添加
            Api.StaffListSave(params)
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
        Api.StaffListDelete({
          staffManagementId: row.staffManagementId
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
      Api.StaffListDownload().then(res => {
        if (res.data) {
          window.open(res.data);
        } else {
          this.$message.warning("下载地址不能为空");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.StaffManage {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>