import request from '@/utils/request'

export default {
  OrderList(data) { // 订单管理列表
    return request({
      url: '/sms/order_management/select',
      method: 'post',
      data
    })
  },

  OrderListSave(data) { // 订单管理添加
    return request({
      url: '/sms/order_management/save',
      method: 'post',
      data
    })
  },

  OrderListDelete(data) { // 订单管理删除
    return request({
      url: '/sms/order_management/delete',
      method: 'post',
      data
    })
  },

  OrderListUpdate(data) { // 订单管理编辑
    return request({
      url: '/sms/order_management/update',
      method: 'post',
      data
    })
  },

  OrderListDownload(data) { // 订单管理导出
    return request({
      url: '/sms/order_management/getUrl',
      method: 'post',
      data
    })
  },

  ProviderList(data) { // 供应商管理
    return request({
      url: '/sms/provider_management/select',
      method: 'post',
      data
    })
  },

  ProviderListSave(data) { // 供应商管理添加
    return request({
      url: '/sms/provider_management/save',
      method: 'post',
      data
    })
  },

  ProviderListDelete(data) { // 供应商管理删除
    return request({
      url: '/sms/provider_management/delete',
      method: 'post',
      data
    })
  },

  ProviderListUpdate(data) { // 供应商管理编辑
    return request({
      url: '/sms/provider_management/update',
      method: 'post',
      data
    })
  },

  ProviderListDownload(data) { // 供应商管理导出
    return request({
      url: '/sms/provider_management/getUrl',
      method: 'post',
      data
    })
  },


  SalesList(data) { // 销售管理
    return request({
      url: '/sms/sales_management/select',
      method: 'post',
      data
    })
  },

  SalesListSave(data) { // 销售管理添加
    return request({
      url: '/sms/sales_management/save',
      method: 'post',
      data
    })
  },

  SalesListDelete(data) { // 销售管理删除
    return request({
      url: '/sms/sales_management/delete',
      method: 'post',
      data
    })
  },

  SalesListUpdate(data) { // 销售管理编辑
    return request({
      url: '/sms/sales_management/update',
      method: 'post',
      data
    })
  },

  SalesListDownload(data) { // 销售管理导出
    return request({
      url: '/sms/sales_management/getUrl',
      method: 'post',
      data
    })
  },


  StaffList(data) { // 员工管理
    return request({
      url: '/sms/staff_management/select',
      method: 'post',
      data
    })
  },

  StaffListSave(data) { // 员工管理添加
    return request({
      url: '/sms/staff_management/save',
      method: 'post',
      data
    })
  },

  StaffListDelete(data) { // 员工管理删除
    return request({
      url: '/sms/staff_management/delete',
      method: 'post',
      data
    })
  },

  StaffListUpdate(data) { // 员工管理编辑
    return request({
      url: '/sms/staff_management/update',
      method: 'post',
      data
    })
  },

  StaffListDownload(data) { // 员工管理导出
    return request({
      url: '/sms/staff_management/getUrl',
      method: 'post',
      data
    })
  },


  UserList(data) { // 普通用户管理
    return request({
      url: '/sms/normal_user/select',
      method: 'post',
      data
    })
  },

  UserListSave(data) { // 普通用户管理添加
    return request({
      url: '/sms/normal_user/save',
      method: 'post',
      data
    })
  },

  UserListDelete(data) { // 普通用户管理删除
    return request({
      url: '/sms/normal_user/delete',
      method: 'post',
      data
    })
  },

  UserListUpdate(data) { // 普通用户管理编辑
    return request({
      url: '/sms/normal_user/update',
      method: 'post',
      data
    })
  },

  UserListDownload(data) { // 普通用户管理导出
    return request({
      url: '/sms/normal_user/getUrl',
      method: 'post',
      data
    })
  },


  ShoppingList(data) { // 购物记录管理
    return request({
      url: '/sms/shopping_record/select',
      method: 'post',
      data
    })
  },

  ShoppingListSave(data) { // 购物记录管理添加
    return request({
      url: '/sms/shopping_record/save',
      method: 'post',
      data
    })
  },

  ShoppingListDelete(data) { // 购物记录管理删除
    return request({
      url: '/sms/shopping_record/delete',
      method: 'post',
      data
    })
  },

  ShoppingListUpdate(data) { // 购物记录管理编辑
    return request({
      url: '/sms/shopping_record/update',
      method: 'post',
      data
    })
  },

  ShoppingListDownload(data) { // 购物记录管理导出
    return request({
      url: '/sms/shopping_record/getUrl',
      method: 'post',
      data
    })
  },


  PaymentList(data) { // 支付记录管理
    return request({
      url: '/sms/payment_history/select',
      method: 'post',
      data
    })
  },

  PaymentListSave(data) { // 支付记录管理添加
    return request({
      url: '/sms/payment_history/save',
      method: 'post',
      data
    })
  },

  PaymentListDelete(data) { // 支付记录管理删除
    return request({
      url: '/sms/payment_history/delete',
      method: 'post',
      data
    })
  },

  PaymentListUpdate(data) { // 支付记录管理编辑
    return request({
      url: '/sms/payment_history/update',
      method: 'post',
      data
    })
  },

  PaymentListDownload(data) { // 支付记录管理导出
    return request({
      url: '/sms/payment_history/getUrl',
      method: 'post',
      data
    })
  },


  AttendanceList(data) { // 考勤管理
    return request({
      url: '/sms/attendance_record/select',
      method: 'post',
      data
    })
  },

  AttendanceListSave(data) { // 考勤管理添加
    return request({
      url: '/sms/attendance_record/save',
      method: 'post',
      data
    })
  },

  AttendanceListDelete(data) { // 考勤管理删除
    return request({
      url: '/sms/attendance_record/delete',
      method: 'post',
      data
    })
  },

  AttendanceListUpdate(data) { // 考勤管理编辑
    return request({
      url: '/sms/attendance_record/update',
      method: 'post',
      data
    })
  },

  AttendanceListDownload(data) { // 考勤管理导出
    return request({
      url: '/sms/attendance_record/getUrl',
      method: 'post',
      data
    })
  },


  LeaveList(data) { // 请假管理
    return request({
      url: '/sms/leave/select',
      method: 'post',
      data
    })
  },

  LeaveListSave(data) { // 请假管理添加
    return request({
      url: '/sms/leave/save',
      method: 'post',
      data
    })
  },

  LeaveListDelete(data) { // 请假管理删除
    return request({
      url: '/sms/leave/delete',
      method: 'post',
      data
    })
  },

  LeaveListUpdate(data) { // 请假管理编辑
    return request({
      url: '/sms/leave/update',
      method: 'post',
      data
    })
  },

  LeaveListDownload(data) { // 请假管理导出
    return request({
      url: '/sms/leave/getUrl',
      method: 'post',
      data
    })
  },


}
