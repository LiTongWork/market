<template>
  <div class="page-content PaymentRecord" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.paymentName" clearable placeholder="姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.paymentMobile" clearable placeholder="手机号"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.productName" clearable placeholder="商品名称"></el-input>
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="formData.deliveryTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="购物时间"
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
          <el-table-column prop="paymentName" label="姓名" align="center" min-width="150"></el-table-column>
          <el-table-column prop="paymentMobile" label="手机号" align="center" width="110"></el-table-column>
          <el-table-column prop="paymentAccount" label="账号" align="center" width></el-table-column>
          <el-table-column prop="productName" label="商品名称" align="center" width></el-table-column>
          <el-table-column prop="productCode" label="商品编码" align="center" width></el-table-column>
          <el-table-column prop="productQuantity" label="商品数量" align="center" width></el-table-column>
          <el-table-column prop="productPrice" label="商品单价" align="center" width></el-table-column>
          <el-table-column prop="deliveryTime" label="购物时间" align="center" width></el-table-column>
          <el-table-column prop="transactionAmount" label="交易金额" align="center" min-width="120"></el-table-column>
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
          <el-form-item label="姓名" prop="paymentName">
            <el-input v-model="addDialog.form.paymentName" clearable placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="paymentMobile">
            <el-input v-model="addDialog.form.paymentMobile" clearable placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="paymentAccount">
            <el-input v-model="addDialog.form.paymentAccount" clearable placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="addDialog.form.productName" clearable placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" prop="productCode">
            <el-input v-model="addDialog.form.productCode" clearable placeholder="商品编码"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="productQuantity">
            <el-input v-model="addDialog.form.productQuantity" clearable placeholder="商品数量"></el-input>
          </el-form-item>
          <el-form-item label="商品单价" prop="productPrice">
            <el-input v-model="addDialog.form.productPrice" clearable placeholder="商品单价"></el-input>
          </el-form-item>
          <el-form-item label="购物时间" prop="deliveryTime">
            <el-date-picker
              v-model="addDialog.form.deliveryTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="购物时间"
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
  name: "PaymentRecord",
  components: {
    PageSearch
  },
  data() {
    return {
      fullscreenLoading: false,
      formData: {
        pageNo: 1,
        pageSize: 10,
        paymentName: "",
        paymentMobile: "",
        productName: "",
        deliveryTime: ""
      },
      total: 0,
      tableDataLoading: false,
      tableData: [],
      addDialog: {
        show: false,
        title: "添加",
        form: {
          paymentName: "",
          paymentMobile: "",
          paymentAccount: "",
          productName: "",
          productCode: "",
          productQuantity: "",
          productPrice: "",
          deliveryTime: "",
          isEnable: "是"
        },
        rules: {
          paymentName: [
            { required: true, message: "姓名", trigger: "blur" }
          ],
          paymentMobile: [
            { required: true, message: "手机号", trigger: "blur" }
          ],
          paymentAccount: [
            { required: true, message: "账号", trigger: "blur" }
          ],
          productName: [
            { required: true, message: "商品名称", trigger: "blur" }
          ],
          productCode: [
            { required: true, message: "商品编码", trigger: "blur" }
          ],
          productQuantity: [
            { required: true, message: "商品数量", trigger: "blur" }
          ],
          productPrice: [
            { required: true, message: "商品单价", trigger: "blur" }
          ],
          deliveryTime: [
            { required: true, message: "购物时间", trigger: "blur" }
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
      let params = JSON.parse(JSON.stringify(this.formData));
      if (params.deliveryTime === null) {
        params.deliveryTime = "";
      }
      Api.PaymentList(params)
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
        paymentName: "",
        paymentMobile: "",
        productName: "",
        deliveryTime: ""
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
      if (!!row.paymentHistoryId) {
        this.addDialog.title = "编辑";
        this.addDialog.form = {
          paymentHistoryId: row.paymentHistoryId,
          paymentName: row.paymentName,
          paymentMobile: row.paymentMobile,
          paymentAccount: row.paymentAccount,
          productName: row.productName,
          productCode: row.productCode,
          productQuantity: row.productQuantity,
          productPrice: row.productPrice,
          deliveryTime: row.deliveryTime,
          isEnable: row.isEnable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          paymentName: "",
          paymentMobile: "",
          paymentAccount: "",
          productName: "",
          productCode: "",
          productQuantity: "",
          productPrice: "",
          deliveryTime: "",
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
          if (params.deliveryTime === null) {
            params.deliveryTime = "";
          }
          if (!!params.paymentHistoryId) {
            // 编辑
            Api.PaymentListUpdate(params)
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
            Api.PaymentListSave(params)
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
        Api.PaymentListDelete({
          paymentHistoryId: row.paymentHistoryId
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
      Api.PaymentListDownload().then(res => {
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
.PaymentRecord {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>