/*global Vue*/
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {route} from "vant/lib/utils/router";

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/Privacy.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/Terms_of_Use.vue')
    },
    {
      path: '/wallet',
      name: 'WalletIndex',
      component: () => import('@/views/Wallet/Index.vue')
    },
    {
      path: '/wallet/transactions',
      name: 'WalletTransactions',
      props: (route) => ({
        userGuid: route.query.userGuid,
      }),
      component: () => import('@/views/Wallet/Transactions.vue')
    },
    {
      path:'/wallet/vouchers',
      name: 'VouchersIndex',
      props: (route) => ({
        userGuid: route.query.userGuid,
        partnerGuid: route.query.partnerGuid
      }),
      component: () => import('@/views/Wallet/Vouchers.vue')
    },
    {
      path:'/business',
      name: 'BusinessIndex',
      props: (route) => ({
        userGuid: route.query.userGuid
      }),
      component: () => import('@/views/Business/Index.vue')
    },

  ]
});
