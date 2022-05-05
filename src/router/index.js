import { createRouter, createWebHistory } from "vue-router";
import JoinPools from "@/views/JoinPools.vue";
import Signup from "@/views/Signup.vue";
import LoginPage from "@/views/LoginPage.vue";
import CreatePools from "@/views/CreatePools.vue";
import ProfileOverview from "@/views/ProfileOverview.vue";
import PoolCreationForm from "@/views/CreatePoolsForm";
import ProfileAddresses from "@/views/ProfileAddresses.vue";
import FAQPage from "@/views/FAQPage.vue";
import FavouriteRestaurants from "@/views/ViewFavRestaurant.vue";
import RecentOrders from "@/views/ViewRecentOrders.vue";
import ChallengesAndRewards from "@/views/Challenges&Rewards.vue";
import InviteFriends from "@/views/InviteFriends.vue";
import MyPools from "@/views/MyPools.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/favrestaurant",
    name: "FavouriteRestaurants",
    component: FavouriteRestaurants,
  },
  {
    path: "/recentorders",
    name: "RecentOrders",
    component: RecentOrders,
  },
  {
    path: "/challengesandrewards",
    name: "ChallengesAndRewards",
    component: ChallengesAndRewards,
  },
  {
    path: "/invitefriends",
    name: "InviteFriends",
    component: InviteFriends,
  },
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
  {
    path: "/createPools",
    name: "CreatePools",
    component: CreatePools,
  },
  {
    path: "/profile",
    name: "ProfileOverview",
    component: ProfileOverview,
  },
  {
    path: "/createPoolsForm/:id",
    name: "CreatePoolsForm",
    component: PoolCreationForm,
  },
  {
    path: "/address",
    name: "ProfileAddresses",
    component: ProfileAddresses,
  },
  {
    path: "/faqs",
    name: "FAQs",
    component: FAQPage,
  },
  {
    path: "/mypools",
    name: "MyPools",
    component: MyPools,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
