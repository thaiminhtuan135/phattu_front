import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from "@/components/User/UserLayout.vue";
import {User} from "@/auth/User";
const { getUser , hasToken } = User();
const requireAuth = (to, from, next) => {

  if (!hasToken()) {
    next({ name: "login", params: {} });
  } else next();
};

const requireAuthAdmin = (to, from, next) =>{
  if (!hasToken()) {
    next({ name: "login", params: {} });
  } else {
    const user = getUser();
    if (user.roles === "ADMIN") {
      next();
    } else {
      next({ name: "access-denied", params: {} });
    }
  }
}
const requireAuthManager = (to, from, next) =>{
  if (!hasToken()) {
    next({ name: "login", params: {} });
  } else {
    const user = getUser();
    if (user.roles === "MANAGER") {
      next();
    } else {
      next({ name: "access-denied", params: {} });
    }
  }
}
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/MainVue.vue'),
    beforeEnter: requireAuthAdmin,
  },
  {
    path: '/manager/dashboard',
    name: 'manager-dashboard',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/manager/ManagerDashboard.vue'),
    beforeEnter: requireAuthManager,
  },
  {
    path: '/manager/don-dang-ky',
    name: 'manager-don-dang-ky',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/manager/DonDangKyManager.vue'),
    beforeEnter: requireAuthManager,
  },
  {
    path: '/user/dashboard',
    name: 'user-dashboard',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/user/UserDashboard.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/user/dang-ky-hoat-dong-dao-trang',
    name: 'user-dang-ky-hoat-dong-dao-trang',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/user/DangKyThamGiaDaoTrang.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'auth',
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'auth',
    },
    component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    meta: {
      layout: 'auth',
    },
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/admin/phattu',
    name: 'admin-phattu',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/admin/PhatTu.vue'),
    beforeEnter: requireAuthAdmin,
  },
  {
    path: '/admin/dao-trang',
    name: 'admin-dao-trang',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/admin/DaoTrang.vue'),
    beforeEnter: requireAuthAdmin,
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    meta: {
      layout: 'default',
    },
    component: () => import(/* webpackChunkName: "access-denied" */ '@/components/common/AccessDeny.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import(/* webpackChunkName: "page-not-found" */ '@/components/common/PageNotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
