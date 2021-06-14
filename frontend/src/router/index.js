import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import creaPost from '../views/creaPost.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'
import Register from '../views/Register.vue'
import UserPosts from '../views/User.vue'
import Admin from '../views/Administration.vue'
import axios from 'axios'
const token = localStorage.getItem('jwt')
const userId = localStorage.getItem('userId')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/creaPost',
    name: 'creaPost',
    component: creaPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/:id',
    name: 'post',
    component: Post,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'userposts',
    component: UserPosts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/administration',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    }
  }
]

const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (localStorage.getItem('user_rights') != 768) {
          next({ name: 'Home' })
        } else {
          axios
            .get("http://localhost:5000/api/admin/users", {
              headers: { Authorization: "Bearer " + token },
            })
            .then((response) => {
              let n;
              for (n in response.data) {
                if (response.data[n].id == userId) {
                  if (response.data[n].rights === 768) {
                    next()
                  } else {
                    alert("Vous n'avez pas l'autorisation nécessaire pour accéder à cette page.")
                    next({ name: 'Home' })
                  }
                }
              }
            });
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
