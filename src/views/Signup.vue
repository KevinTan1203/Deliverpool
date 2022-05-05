<template>
  <Register @loggedin="redirect" />
</template>

<script>
import Register from "@/components/Register.vue";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  name: "Signup",
  components: {
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
