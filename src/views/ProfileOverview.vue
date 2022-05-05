<template>
<div v-if="user">
  <NavBar/>
  <EditProfile/>
  <ProfileMyAccounts/>
</div>
<div v-else>
  Please sign in first. Click 
  <router-link to="/login">here</router-link> to sign in.
</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ProfileMyAccounts from "@/components/ProfileMyAccounts.vue";
import EditProfile from "@/components/EditProfile.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,    
    ProfileMyAccounts,
    EditProfile,
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

}
</script>

<style>

</style>