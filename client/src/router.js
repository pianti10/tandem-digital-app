import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/RegisterView.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach(async (to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        //Authentication check
        const token = localStorage.getItem('token')
        if(token) {
            //revisa si el token es valido
            return next()
        }
        return next('/login')
    }
    next();
})

export default router;
