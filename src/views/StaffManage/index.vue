<template>
  <div class="page-content StaffManage">
    <page-search>
      <div slot="btns">
        <el-button size="mini" @click="reset">重置条件</el-button>
        <el-button size="mini" type="primary" @click="fetch">查询结果</el-button>
      </div>
      <div slot="search">
        <div class="search-item"></div>
      </div>
      <div slot="table-btns">
        <el-button type="primary" size="mini">导出所有数据</el-button>
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
          <el-table-column prop="staff_password" label="密码" align="center" width></el-table-column>
          <el-table-column prop="leader_name" label="领导姓名" align="center" width></el-table-column>
          <el-table-column prop="leader_mobile" label="领导手机号" align="center" width></el-table-column>
          <el-table-column prop="staff_card_no" label="银行卡号" align="center" width></el-table-column>
          <el-table-column prop="staff_card_name" label="账户姓名" align="center" width></el-table-column>
          <el-table-column prop="staff_card_bank" label="开户行" align="center" width></el-table-column>
          <el-table-column prop="staff_salary" label="薪资(月)" align="center" min-width="100"></el-table-column>
          <el-table-column prop="staff_working_years" label="工作年限" align="center" min-width="120"></el-table-column>
          <el-table-column prop="staff_address" label="住址" align="center" width></el-table-column>
          <el-table-column prop="is_enable" label="是否正常" align="center" width></el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center" width></el-table-column>
          <el-table-column prop="modify_time" label="修改时间" align="center" width></el-table-column>
          <el-table-column prop="date" label="操作" align="center" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">添加</el-button>
              <el-button type="text">删除</el-button>
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
      formData: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      tableDataLoading: false,
      tableData: []
    };
  },
  created() {},
  methods: {
    getTableData() {
      console.log("获取表格数据");
    },
    fetch() {
      console.log("fetch");
      this.formData.pageNo = 1;
      this.getTableData();
    },
    reset() {
      console.log("reset");
      Object.assign(this.formData, {
        pageNo: 1
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