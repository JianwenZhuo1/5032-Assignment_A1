import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import HomePage from '../pages/HomePage.vue'
import SupportPage from '../pages/SupportPage.vue'
import FeedbackPage from '../pages/FeedbackPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import AdminPage from '../pages/AdminPage.vue'

// Import resource pages
import ManagingAnxiety from '../pages/ManagingAnxiety.vue'
import StressRelief from '../pages/StressRelief.vue'
import WellbeingGuide from '../pages/WellbeingGuide.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/support', component: SupportPage },
  { path: '/feedback', component: FeedbackPage, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/admin', component: AdminPage, meta: { requiresAdmin: true }},

  // Resources
  { path: '/resources/anxiety', component: ManagingAnxiety },
  { path: '/resources/stress', component: StressRelief },
  { path: '/resources/wellbeing', component: WellbeingGuide },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Admin route protection
  if (to.meta.requiresAdmin) {
    if (currentUser && currentUser.role === "admin") {
      next()
    } else {
      alert("Access denied: Admins only")
      next("/home")
    }
    return
  }

  // Auth route protection
  if (to.meta.requiresAuth) {
    if (currentUser) {
      next()
    } else {
      alert("Please log in to access this page")
      next("/login")
    }
    return
  }

  next() // Allow all other routes
})

export default router
