<template>
  <div class="page-content ProviderManage" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.providerName" clearable placeholder="供应商姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.providerMobile" clearable placeholder="供应商手机号"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.providerType" clearable placeholder="供应商等级"></el-input>
        </div>
        <div class="search-item">
          <el-select v-model="formData.isEnable" clearable placeholder="是否正常">
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
          <el-table-column prop="provider_name" label="供应商名称" align="center" min-width="150"></el-table-column>
          <el-table-column prop="provider_mobile" label="供应商手机号" align="center" width="110"></el-table-column>
          <el-table-column prop="provider_address" label="供应商地址" align="center" min-width="120"></el-table-column>
          <el-table-column prop="provider_type" label="供应商等级" align="center" min-width="120"></el-table-column>
          <el-table-column prop="provider_duration" label="合作时长(月)" align="center" min-width="120"></el-table-column>
          <el-table-column prop="is_enable" label="是否正常" align="center" width></el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center" width></el-table-column>
          <el-table-column prop="modify_time" label="修改时间" align="center" width></el-table-column>
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
          <el-form-item label="供应商名称" prop="providerName">
            <el-input v-model="addDialog.form.providerName" clearable placeholder="供应商姓名"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="providerMobile">
            <el-input v-model="addDialog.form.providerMobile" clearable placeholder="供应商名称"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" prop="providerAddress">
            <el-input v-model="addDialog.form.providerAddress" clearable placeholder="供应商地址"></el-input>
          </el-form-item>
          <el-form-item label="供应商等级" prop="providerType">
            <el-input v-model="addDialog.form.providerType" clearable placeholder="供应商等级"></el-input>
          </el-form-item>
          <el-form-item label="合作时长(月)" prop="providerDuration">
            <el-input v-model="addDialog.form.providerDuration" clearable placeholder="合作时长(月)"></el-input>
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
  name: "ProviderManage",
  components: {
    PageSearch
  },
  data() {
    return {
      fullscreenLoading: false,
      formData: {
        pageNo: 1,
        pageSize: 10,
        providerName: "",
        providerMobile: "",
        isEnable: ""
      },
      total: 0,
      tableDataLoading: false,
      tableData: [],
      addDialog: {
        show: false,
        title: "添加",
        form: {
          providerName: "",
          providerMobile: "",
          providerAddress: "",
          providerType: "",
          providerDuration: "",
          isEnable: "是"
        },
        rules: {
          providerName: [
            { required: true, message: "请输入供应商姓名", trigger: "blur" }
          ],
          providerMobile: [
            { required: true, message: "请输入供应商手机号", trigger: "blur" }
          ],
          providerAddress: [
            { required: true, message: "请输供应商地址", trigger: "blur" }
          ],
          providerType: [
            { required: true, message: "请输入供应商等级", trigger: "blur" }
          ],
          providerDuration: [
            { required: true, message: "请输入合作时长(月)", trigger: "blur" }
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
      Api.ProviderList(this.formData)
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
        providerName: "",
        providerMobile: "",
        isEnable: ""
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
          providerManagementId: row.order_management_id,
          providerName: row.provider_name,
          providerMobile: row.provider_mobile,
          providerAddress: row.provider_address,
          providerType: row.provider_type,
          providerDuration: row.provider_duration,
          isEnable: row.is_enable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          providerName: "",
          providerMobile: "",
          providerAddress: "",
          providerType: "",
          providerDuration: "",
          isEnable: "是"
        };
      }
      this.addDialog.show = true;
    },

    sureAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!");
          this.fullscreenLoading = true;
          if (!!this.addDialog.form.providerManagementId) {
            // 编辑
            Api.ProviderListUpdate(this.addDialog.form)
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
            Api.ProviderListSave(this.addDialog.form)
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
        Api.ProviderListDelete({
          providerManagementId: row.provider_management_id
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
      Api.ProviderListDownload();
    }
  }
};
</script>

<style lang="scss" scoped>
.ProviderManage {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>