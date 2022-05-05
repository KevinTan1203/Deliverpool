<template>
<div v-if="user">
  <NavBar />
  <PoolsList @modified="change" :key="refreshComp" />
</div>
<div v-else>
  Please sign in first. Click 
  <router-link to="/login">here</router-link> to sign in.
</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PoolsList from "@/components/PoolsList.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "MyPools",

  components: {
    NavBar,
    PoolsList,
  },

  data() {
    return {
      refreshComp: 0,
      user: false,
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
    },
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
