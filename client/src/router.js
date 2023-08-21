import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: () => import("./views/UsuariosView.vue"),
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

export default router;
