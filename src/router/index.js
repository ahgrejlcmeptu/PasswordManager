import {createRouter, createWebHistory} from 'vue-router'
import {createPinia, setActivePinia} from "pinia"

const pinia = createPinia();
setActivePinia(pinia);
import {useUser} from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      meta: {
        auth: true,
        layout: 'Main'
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/main/HomeView.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('../views/main/CreateView.vue')
        },
        {
          path: 'password/:id',
          name: 'password',
          component: () => import('../views/main/PasswordView.vue')
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: () => import('../views/main/EditView.vue')
        },
        {
          path: 'keys',
          name: 'keys',
          meta: {
            admin: true,
          },
          component: () => import('../views/main/KeysView.vue')
        },
        {
          path: 'users',
          name: 'users',
          meta: {
            admin: true,
          },
          component: () => import('../views/main/UsersView.vue')
        },
      ]
    },
    {
      path: '/auth',
      name: 'SingIn',
      meta: {
        layout: 'Other'
      },
      component: () => import('../views/SingInView.vue')
    },
    {
      path: '/signup/:id',
      name: 'SignUp',
      meta: {
        layout: 'Other'
      },
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/signup',
      name: 'SignFirst',
      meta: {
        layout: 'Other'
      },
      component: () => import('../views/SignFirstView.vue')
    },
    // {
    //   path: '/:notFound(.*)',
    //   name: 'notFound',
    //   meta: {
    //     layout: 'Main'
    //   },
    //   component: () => import('../views/main/HomeView.vue')
    // },
  ]
})

router.beforeEach((to, gfrom, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin
  const user = useUser()

  if (requireAuth) {
    if (!user.user.id) {
      return next('/auth?message=login')
    }
  }

  if (!requireAuth) {
    if (user.user.id) {
      return next('/')
    }
  }

  if (requireAdmin) {
    if (!user.isAdmin) {
      return next('/')
    }
  }

  return next()
})

export default router
