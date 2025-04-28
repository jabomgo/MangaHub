import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/capitulos",
      name: "capitulos",
      component: () => import("../views/CapitulosView.vue"),
    },
    {
      path: "/favoritos",
      name: "favoritos",
      component: () => import("../views/FavoritosView.vue"),
    },
    {
      path: "/pesquisando",
      name: "pesquisando",
      component: () => import("../views/PesquisandoView.vue"),
    },
    {
      path: "/leitor",
      name: "leitor",
      component: () => import("../views/LeitorView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: () => import("../views/CadastroView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
