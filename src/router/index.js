import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/login.vue"),
  },

  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../views/Toolbar.vue"),
    children: [
      {
        path: "/simple",
        name: "simple",
        component: () => import("../views/Simple.vue"),
      },

      {
        path: "/apicon",
        name: "apicon",
        component: () => import("../views/Apicon.vue"),
      },
    ],
  },

  {
    path: "",
    name: "toolbar",
    component: () => import("../views/ToolbarProduct.vue"),
    children: [
      {
        path: "/products",
        name: "products",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("../views/Order.vue"),
      },

      { path: "/me", name: "me", component: () => import("../views/Me.vue") },
      {
        path: "/grade",
        name: "grade",
        component: () => import("../views/Grade.vue"),
      },
      {
        path: "/productid/:id",
        name: "productid",
        component: () => import("../components/productid.vue"),
      },
      {
        path: "/manage",
        name: "manage",
        component: () => import("../views/ManageProduct.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
