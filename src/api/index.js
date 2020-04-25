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
      url: '/sms/order_management/download',
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
      url: '/sms/provider_management/download',
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
      url: '/sms/sales_management/download',
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
      url: '/sms/staff_management/download',
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
      url: '/sms/normal_user/download',
      method: 'post',
      data
    })
  },


}
