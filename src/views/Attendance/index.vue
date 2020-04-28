<template>
  <div class="page-content Attendance" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.staffName" clearable placeholder="姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.staffMobile" clearable placeholder="手机号"></el-input>
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="formData.workDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="日期"
          ></el-date-picker>
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="formData.workStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="上班开始日期"
          ></el-date-picker>
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="formData.workEndTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="上班结束日期"
          ></el-date-picker>
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
          <el-table-column prop="workDate" label="工作日期" align="center" width></el-table-column>
          <el-table-column prop="workStartTime" label="开始上班日期" align="center" width></el-table-column>
          <el-table-column prop="workEndTime" label="上班结束日期" align="center" width></el-table-column>
          <el-table-column prop="isEnable" label="是否正常" align="center" width></el-table-column>
          <el-table-column prop="isLeave" label="是否休假" align="center" width></el-table-column>
          <el-table-column prop="leaveType" label="休假类型" align="center" width></el-table-column>
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
          <el-form-item label="名称" prop="staffName">
            <el-input v-model="addDialog.form.staffName" clearable placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="staffMobile">
            <el-input v-model="addDialog.form.staffMobile" clearable placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="workDate">
            <el-date-picker
              v-model="addDialog.form.workDate"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="上班结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="上班开始日期" prop="workStartTime">
            <el-date-picker
              v-model="addDialog.form.workStartTime"
              type="datetime"
              placeholder="上班结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="上班结束日期" prop="workEndTime">
            <el-date-picker
              v-model="addDialog.form.workEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="上班结束日期"
            ></el-date-picker>
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
  name: "Attendance",
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
        workDate: "",
        workStartTime: "",
        workEndTime: ""
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
          workDate: "",
          workStartTime: "",
          workEndTime: "",
          isEnable: "是"
        },
        rules: {
          staffName: [{ required: true, message: "姓名", trigger: "blur" }],
          staffMobile: [{ required: true, message: "手机号", trigger: "blur" }],
          workDate: [{ required: true, message: "日期", trigger: "blur" }],
          workStartTime: [
            { required: true, message: "上班开始日期", trigger: "blur" }
          ],
          workEndTime: [
            { required: true, message: "上班结束日期", trigger: "blur" }
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
      console.log("formData", this.formData);
      let params = JSON.parse(JSON.stringify(this.formData));
      if (params.workDate === null) {
        params.workDate = "";
      }
      if (params.workStartTime === null) {
        params.workStartTime = "";
      }
      if (params.workEndTime === null) {
        params.workEndTime = "";
      }
      this.tableDataLoading = true;
      Api.AttendanceList(params)
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
        staffName: "",
        staffMobile: "",
        workDate: "",
        workStartTime: "",
        workEndTime: ""
      });
      console.log(this.formData);
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
      console.log('row', row)
      if (!!row.attendanceRecordId) {
        this.addDialog.title = "编辑";
        this.addDialog.form = {
          attendanceRecordId: row.attendanceRecordId,
          staffName: row.staffName,
          staffMobile: row.staffMobile,
          workDate: row.workDate,
          workStartTime: row.workStartTime,
          workEndTime: row.workEndTime,
          isEnable: row.isEnable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          staffName: "",
          staffMobile: "",
          workDate: "",
          workStartTime: "",
          workEndTime: "",
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
          if (params.workDate === null) {
            params.workDate = "";
          }
          if (params.workStartTime === null) {
            params.workStartTime = "";
          }
          if (params.workEndTime === null) {
            params.workEndTime = "";
          }
          if (!!params.attendanceRecordId) {
            // 编辑
            Api.AttendanceListUpdate(params)
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
            Api.AttendanceListSave(params)
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
        Api.AttendanceListDelete({
          attendanceRecordId: row.attendanceRecordId
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
      Api.AttendanceListDownload().then(res => {
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
.Attendance {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>