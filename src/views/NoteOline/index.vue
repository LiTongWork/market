<template>
  <div class="page-content NoteOline">
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
  name: "NoteOline",
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
.NoteOline {
  .pagination {
    padding: 20px;
    text-align: center;
  }
}
</style>