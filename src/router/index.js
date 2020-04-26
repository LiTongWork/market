import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},



// 404 page must be placed at the end !!!
{
  path: '/',
  component: Layout,
  redirect: '/Home',
  name: 'Home',
  hidden: true,
  children: [{
    path: 'Home',
    meta: {
      isMenu: true
    },
    component: () => import('@/views/index')
  }]
}
]

export const asyncRoutes = [
  {
    path: '/OrderManage',
    component: Layout,
    meta: {
      title: '订单管理',
      breadcrumb: false,
      roles: ['管理员']
    },
    children: [{
      path: '',
      name: 'OrderManage',
      component: () => import('@/views/OrderManage/index'),
      meta: {
        title: '订单管理',
        roles: ['管理员']
      }
    }]
  },
  {
    path: '/ProviderManage',
    component: Layout,
    meta: {
      title: '供应商管理',
      breadcrumb: false,
      roles: ['管理员']
    },
    children: [{
      path: '',
      name: 'ProviderManage',
      component: () => import('@/views/ProviderManage/index'),
      meta: {
        title: '供应商管理',
        roles: ['管理员']
      }
    }]
  },
  {
    path: '/SalesManage',
    component: Layout,
    meta: {
      title: '销售管理',
      breadcrumb: false,
      roles: ['管理员']
    },
    children: [{
      path: '',
      name: 'SalesManage',
      component: () => import('@/views/SalesManage/index'),
      meta: {
        title: '销售管理',
        roles: ['管理员']
      }
    }]
  },
  {
    path: '/StaffManage',
    component: Layout,
    meta: {
      title: '员工管理',
      breadcrumb: false,
      roles: ['管理员']
    },
    children: [{
      path: '',
      name: 'StaffManage',
      component: () => import('@/views/StaffManage/index'),
      meta: {
        title: '员工管理',
        roles: ['管理员']
      }
    }]
  },
  {
    path: '/UserManage',
    component: Layout,
    meta: {
      title: '普通用户管理',
      breadcrumb: false,
      roles: ['管理员']
    },
    children: [{
      path: '',
      name: 'UserManage',
      component: () => import('@/views/UserManage/index'),
      meta: {
        title: '普通用户管理',
        roles: ['管理员']
      }
    }]
  },
  // {
  //   path: '/PasswordManage',
  //   component: Layout,
  //   meta: {
  //     title: '修改密码',
  //     breadcrumb: false,
  //     roles: ['管理员']
  //   },
  //   children: [{
  //     path: '',
  //     name: 'PasswordManage',
  //     component: () => import('@/views/PasswordManage/index'),
  //     meta: {
  //       title: '修改密码',
  //       roles: ['管理员']
  //     }
  //   }]
  // },

  {
    path: '/ShoppingRecord',
    component: Layout,
    meta: {
      title: '购物记录',
      breadcrumb: false,
      roles: ['普通用户']
    },
    children: [{
      path: '',
      name: 'ShoppingRecord',
      component: () => import('@/views/ShoppingRecord/index'),
      meta: {
        title: '购物记录',
        roles: ['普通用户']
      }
    }]
  },

  {
    path: '/PaymentRecord',
    component: Layout,
    meta: {
      title: '支付记录',
      breadcrumb: false,
      roles: ['普通用户']
    },
    children: [{
      path: '',
      name: 'PaymentRecord',
      component: () => import('@/views/PaymentRecord/index'),
      meta: {
        title: '支付记录',
        roles: ['普通用户']
      }
    }]
  },
  // {
  //   path: '/FillingMember',
  //   component: Layout,
  //   meta: {
  //     title: '充会员',
  //     breadcrumb: false,
  //     roles: ['普通用户']
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'Integral',
  //       component: () => import('@/views/FillingMember/Integral'),
  //       meta: {
  //         title: '会员积分',
  //         roles: ['普通用户']
  //       }
  //     },
  //     {
  //       path: 'Level',
  //       name: 'Level',
  //       component: () => import('@/views/FillingMember/Level'),
  //       meta: {
  //         title: '会员等级',
  //         roles: ['普通用户']
  //       }
  //     },
  //     {
  //       path: 'Time',
  //       name: 'Time',
  //       component: () => import('@/views/FillingMember/Time'),
  //       meta: {
  //         title: '会员时间',
  //         roles: ['普通用户']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/MembersManage',
  //   component: Layout,
  //   meta: {
  //     title: '普通用户管理',
  //     breadcrumb: false,
  //     roles: ['员工']
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'MembersManage',
  //       component: () => import('@/views/MembersManage/MembersManage'),
  //       meta: {
  //         title: '会员管理',
  //         roles: ['员工']
  //       }
  //     },
  //     {
  //       path: 'NonMembersManage',
  //       name: 'NonMembersManage',
  //       component: () => import('@/views/MembersManage/NonMembersManage'),
  //       meta: {
  //         title: '非会员管理',
  //         roles: ['员工']
  //       }
  //     },
  //   ]
  // },
  {
    path: '/Attendance',
    component: Layout,
    meta: {
      title: '考勤打卡',
      breadcrumb: false,
      roles: ['员工']
    },
    children: [
      {
        path: '',
        name: 'Attendance',
        component: () => import('@/views/Attendance/index'),
        meta: {
          title: '考勤打卡',
          roles: ['员工']
        }
      },
    ]
  },
  {
    path: '/NoteOline',
    component: Layout,
    meta: {
      title: '在线请假',
      breadcrumb: false,
      roles: ['员工']
    },
    children: [
      {
        path: '',
        name: 'NoteOline',
        component: () => import('@/views/NoteOline/index'),
        meta: {
          title: '在线请假',
          roles: ['员工']
        }
      },
    ]
  },


  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
