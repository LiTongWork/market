<template>
  <div class="page-t">
    <div class="page-serach-box">
      <div class="btns-box">
        <div>筛选条件</div>
        <slot name="btns"></slot>
      </div>
      <div class="search-box">
        <slot name="search"></slot>
      </div>
    </div>
    <div class="table-top">
      <div class="table-name">数据列表</div>
      <div class="table-btn">
        <slot name="table-btns"></slot>
      </div>
    </div>
    <div>
      <slot name="table"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageSearch",
  data: () => {
    return {};
  }
};
</script>
<style lang="scss">
.page-t {
  .page-serach-box {
    border: 1px solid #eef1f6;
    margin-bottom: 10px;
    .btns-box {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #eef1f6;
      padding: 0 20px;
      font-size: 12px;
    }
    .search-box {
      padding: 5px;
    }
    .search-item {
      display: inline-block;
      vertical-align: middle;
      margin: 5px;
    }
    label {
      font-weight: normal;
    }
    .search-bar-input,
    .search-bar-select {
      width: 195px;
    }
  }
  .table-top {
    height: 50px;
    background: #eef1f6;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }
}
</style>