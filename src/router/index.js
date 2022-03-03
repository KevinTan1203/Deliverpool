import { createRouter, createWebHistory } from "vue-router";
import JoinPools from "@/views/JoinPools.vue";
import Signup from "@/views/Signup.vue";
import LoginPage from "@/views/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "JoinPools",
    component: JoinPools,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
