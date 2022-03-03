<template>
  <Deliverpool />
  <Register @loggedin="redirect" />
</template>

<script>
import Deliverpool from "@/components/Deliverpool.vue";
import Register from "@/components/Register.vue";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  name: "Signup",
  components: {
    Deliverpool,
    Register,
  },

  methods: {
    redirect() {
      console.log(auth.currentUser.uid);
      if (auth.currentUser) {
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>

<style></style>
