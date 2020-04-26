<template>
  <div class="page-content NoteOline" v-loading.fullscreen.lock="fullscreenLoading">
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
          <el-input v-model="formData.leaveType" clearable placeholder="休假类型"></el-input>
        </div>
        <div class="search-item">
          <el-select v-model="formData.isLeave" clearable placeholder="是否可以休假">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <el-input v-model="formData.approverName" clearable placeholder="审批人姓名"></el-input>
        </div>
        <div class="search-item">
          <el-select v-model="formData.approverIsAgree" clearable placeholder="审批人是否同意">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
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
          <el-table-column prop="staff_name" label="姓名" align="center" min-width="150"></el-table-column>
          <el-table-column prop="staff_mobile" label="手机号" align="center" width="110"></el-table-column>
          <el-table-column prop="leave_start_time" label="请假开始时间" align="center" width></el-table-column>
          <el-table-column prop="leave_end_time" label="请假结束时间" align="center" width></el-table-column>
          <el-table-column prop="leave_days" label="请假天数" align="center" width></el-table-column>
          <el-table-column prop="leave_type" label="请假类型" align="center" width></el-table-column>
          <el-table-column prop="is_leave" label="是否可以休假" align="center" width></el-table-column>
          <el-table-column prop="approver_name" label="审批人员姓名" align="center" width></el-table-column>
          <el-table-column prop="approver_mobile" label="审批人员手机号" align="center" min-width="100"></el-table-column>
          <el-table-column prop="approver_is_agree" label="审批人是否同意" align="center" min-width="120"></el-table-column>
          <el-table-column prop="approver_opinion" label="审批意见" align="center" width></el-table-column>
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
          <el-form-item label="请假开始时间" prop="leaveStartTime">
            <el-date-picker
              v-model="addDialog.form.leaveStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请假开始时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="请假结束时间" prop="leaveEndTime">
            <el-date-picker
              v-model="addDialog.form.leaveEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请假结束时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="请假天数" prop="leaveDays">
            <el-input v-model="addDialog.form.leaveDays" clearable placeholder="请假天数"></el-input>
          </el-form-item>
          <el-form-item label="休假类型" prop="leaveType">
            <el-input v-model="addDialog.form.leaveType" clearable placeholder="休假类型"></el-input>
          </el-form-item>
          <el-form-item label="是否可以休假" prop="isLeave">
            <el-select v-model="addDialog.form.isLeave" clearable placeholder="是否可以休假">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批人姓名" prop="approverName">
            <el-input v-model="addDialog.form.approverName" clearable placeholder="审批人姓名"></el-input>
          </el-form-item>
          <el-form-item label="审批人手机号" prop="approverMobile">
            <el-input v-model="addDialog.form.approverMobile" clearable placeholder="审批人手机号"></el-input>
          </el-form-item>
          <el-form-item label="审批人是否同意" prop="approverIsAgree">
            <el-select v-model="addDialog.form.approverIsAgree" clearable placeholder="审批人是否同意">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批意见" prop="approverOpinion">
            <el-input
              type="textarea"
              v-model="addDialog.form.approverOpinion"
              clearable
              placeholder="审批意见"
            ></el-input>
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
  name: "NoteOline",
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
        leaveType: "",
        isLeave: "",
        approverName: "",
        approverIsAgree: ""
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
          leaveStartTime: "",
          leaveEndTime: "",
          leaveDays: "",
          leaveType: "",
          isLeave: "",
          approverName: "",
          approverMobile: "",
          approverIsAgree: "",
          approverOpinion: "",
          isEnable: "是"
        },
        rules: {
          staffName: [{ required: true, message: "姓名", trigger: "blur" }],
          staffMobile: [{ required: true, message: "手机号", trigger: "blur" }],
          leaveStartTime: [
            { required: true, message: "请假开始时间", trigger: "blur" }
          ],
          leaveEndTime: [
            { required: true, message: "请假结束时间", trigger: "blur" }
          ],
          leaveDays: [{ required: true, message: "请假天数", trigger: "blur" }],
          leaveType: [{ required: true, message: "休假类型", trigger: "blur" }],
          isLeave: [
            { required: true, message: "是否可以休假", trigger: "blur" }
          ],
          approverName: [
            { required: true, message: "审批人姓名", trigger: "blur" }
          ],
          approverMobile: [
            { required: true, message: "审批人手机号", trigger: "blur" }
          ],
          approverIsAgree: [
            { required: true, message: "审批人是否同意", trigger: "blur" }
          ],
          approverOpinion: [
            { required: true, message: "审批意见", trigger: "blur" }
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
      this.tableDataLoading = true;
      Api.LeaveList(params)
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
        leaveType: "",
        isLeave: "",
        approverName: "",
        approverIsAgree: ""
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
      if (!!row) {
        this.addDialog.title = "编辑";
        this.addDialog.form = {
          leaveId: row.leave_id,
          staffName: row.staff_name,
          staffMobile: row.staff_mobile,
          leaveStartTime: row.leave_start_time,
          leaveEndTime: row.leave_end_time,
          leaveDays: row.leave_days,
          leaveType: row.leave_type,
          isLeave: row.is_leave,
          approverName: row.approver_name,
          approverMobile: row.approver_mobile,
          approverIsAgree: row.approver_is_agree,
          approverOpinion: row.approver_opinion,
          isEnable: "是"
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          staffName: "",
          staffMobile: "",
          leaveStartTime: "",
          leaveEndTime: "",
          leaveDays: "",
          leaveType: "",
          isLeave: "",
          approverName: "",
          approverMobile: "",
          approverIsAgree: "",
          approverOpinion: "",
          isEnable: "是"
        };
      }
      this.addDialog.show = true;
    },

    sureAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.addDialog.form));
          if (params.leaveStartTime === null) {
            params.leaveStartTime = "";
          }
          if (params.leaveEndTime === null) {
            params.leaveEndTime = "";
          }
          this.fullscreenLoading = true;
          if (!!params.leaveId) {
            // 编辑
            Api.LeaveListUpdate(params)
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
            Api.LeaveListSave(params)
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
        Api.LeaveListDelete({
          leaveId: row.leave_id
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
      Api.LeaveListDownload();
    }
  }
};
</script>

<style lang="scss" scoped>
.NoteOline {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>