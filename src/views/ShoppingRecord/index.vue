<template>
  <div class="page-content ShoppingRecord" v-loading.fullscreen.lock="fullscreenLoading">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item">
          <el-input v-model="formData.userName" clearable placeholder="姓名"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.userMobile" clearable placeholder="手机号"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.productName" clearable placeholder="商品名称"></el-input>
        </div>
        <div class="search-item">
          <el-input v-model="formData.productCode" clearable placeholder="商品编码"></el-input>
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
          <el-table-column prop="product_name" label="商品名称" align="center" width></el-table-column>
          <el-table-column prop="product_code" label="商品编码" align="center" width></el-table-column>
          <el-table-column prop="product_quantity" label="商品数量" align="center" width></el-table-column>
          <el-table-column prop="product_price" label="商品单价" align="center" width></el-table-column>
          <el-table-column prop="product_discount" label="商品折扣" align="center" width></el-table-column>
          <el-table-column prop="receivable_amount" label="优惠前金额" align="center" min-width="100"></el-table-column>
          <el-table-column prop="transaction_amount" label="实际交易金额" align="center" min-width="120"></el-table-column>
          <el-table-column prop="delivery_time" label="购物时间" align="center" width></el-table-column>
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
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="addDialog.form.userName" clearable placeholder="用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号" prop="userMobile">
            <el-input v-model="addDialog.form.userMobile" clearable placeholder="用户手机号"></el-input>
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
          <el-form-item label="商品折扣" prop="productDiscount">
            <el-input v-model="addDialog.form.productDiscount" clearable placeholder="商品折扣"></el-input>
          </el-form-item>
          <el-form-item label="优惠前价格" prop="receivableAmount">
            <el-input v-model="addDialog.form.receivableAmount" clearable placeholder="优惠前价格"></el-input>
          </el-form-item>
          <el-form-item label="实际交易金额" prop="transactionAmount">
            <el-input v-model="addDialog.form.transactionAmount" clearable placeholder="实际交易金额"></el-input>
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
  name: "ShoppingRecord",
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
        productName: "",
        productCode: ""
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
          productName: "",
          productCode: "",
          productQuantity: "",
          productPrice: "",
          productDiscount: "",
          receivableAmount: "",
          transactionAmount: "",
          deliveryTime: "",
          isEnable: "是"
        },
        rules: {
          userName: [{ required: true, message: "用户姓名", trigger: "blur" }],
          userMobile: [
            { required: true, message: "用户手机号", trigger: "blur" }
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
          productDiscount: [
            { required: true, message: "商品折扣", trigger: "blur" }
          ],
          receivableAmount: [
            { required: true, message: "优惠前金额", trigger: "blur" }
          ],
          transactionAmount: [
            { required: true, message: "实际交易金额", trigger: "blur" }
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
      console.log("formData", this.formData);
      this.tableDataLoading = true;
      Api.ShoppingList(this.formData)
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
        productName: "",
        productCode: ""
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
          shoppingRecordId: row.shopping_record_id,
          userName: row.user_name,
          userMobile: row.user_mobile,
          productName: row.product_name,
          productCode: row.product_code,
          productQuantity: row.product_quantity,
          productPrice: row.product_price,
          productDiscount: row.product_discount,
          receivableAmount: row.receivable_amount,
          transactionAmount: row.transaction_amount,
          deliveryTime: row.delivery_time,
          isEnable: row.is_enable
        };
      } else {
        this.addDialog.title = "添加";
        this.addDialog.form = {
          userName: "",
          userMobile: "",
          productName: "",
          productCode: "",
          productQuantity: "",
          productPrice: "",
          productDiscount: "",
          receivableAmount: "",
          transactionAmount: "",
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
          if (!!params.shoppingRecordId) {
            // 编辑
            Api.ShoppingListUpdate(params)
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
            Api.ShoppingListSave(params)
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
        Api.ShoppingListDelete({
          shoppingRecordId: row.shopping_record_id
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
      Api.ShoppingListDownload();
    }
  }
};
</script>

<style lang="scss" scoped>
.ShoppingRecord {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>