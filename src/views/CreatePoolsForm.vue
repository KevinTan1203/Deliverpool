<template>
  <div v-if="user">
    <NavBar />
    <DisplayRestaurant />
    <PoolCreationForm />
  </div>
  <div v-else>
    Please sign in first. Click 
    <router-link to="/login">here</router-link> to sign in.
  </div>
</template>

<script>
import PoolCreationForm from "../components/PoolCreationForm.vue";
import NavBar from "@/components/NavBar.vue";
import DisplayRestaurant from "@/components/DisplayRestaurant.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    PoolCreationForm,
    NavBar,
    DisplayRestaurant,
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
