<template>
  <Login @loggedin="redirect" />
</template>

<script>
import Login from "@/components/Login.vue";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  name: "LoginPage",
  components: {
    Login,
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
