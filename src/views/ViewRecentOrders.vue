<template>
<div v-if="user">
  <NavBar/>
  <EditProfile/>
  <ProfileViewRecentOrders/>
</div>
<div v-else>
  Please sign in first. Click 
  <router-link to="/login">here</router-link> to sign in.
</div>
</template>

<script>
import EditProfile from "@/components/EditProfile.vue";
import NavBar from "@/components/NavBar.vue";
import ProfileViewRecentOrders from "@/components/ProfileViewRecentOrders"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "RecentOrders",
  components: {
    NavBar,
    EditProfile,
    ProfileViewRecentOrders,
  },
  data() {
    return {
      user: false,
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style></style>