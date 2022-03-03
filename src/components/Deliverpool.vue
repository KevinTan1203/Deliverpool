<template>
  <div id="container">
    <h1>
      Deliverpool | <span id="deliver">Delivering to: {{ location }}</span> |
      <router-link to="/">Join Pools</router-link> |
      <router-link to="/create">Create Pools</router-link> |
      <router-link to="/faqs">FAQs</router-link> |
      <span v-if="user">{{ this.username }}</span>
      <router-link v-else to="/login">Login</router-link> |
      <button v-if="user" v-on:click="logout()">Log out</button>
      <router-link v-else to="/signup">Signup</router-link>
    </h1>
    <hr />
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
  props: {
    location: String,
  },

  data() {
    return {
      user: auth.currentUser,
      username: "",
    };
  },

  mounted() {
    async function display() {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      let z = await getDoc(docRef);
      console.log(z.get("Username"));
      return z.get("Username");
    }
    this.username = display();
    console.log(1);
    console.log(this.username);
  },

  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          window.location.reload();
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#container {
  text-align: justify;
}
</style>
