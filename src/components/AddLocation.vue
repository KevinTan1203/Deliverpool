<template>
  <div id="container">
    <form id="myform">
      <h2>Add Delivery location</h2>
      <div class="formli">
        <label for="location">Location: </label>
        <input
          type="text"
          v-model="locData"
          placeholder="Enter Delivery location"
        />
        <br />
        <br />
        <label for="email">Email: </label>
        <input type="text" v-model="emailData" placeholder="Enter email" />
        <button @click="locDisplay">Save</button>
        <br />
        <br />
      </div>
    </form>
  </div>
</template>

<script>
/*
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp); */

export default {
  emits: ["locationdata"],
  data() {
    return {
      locData: "",
      emailData: "",
    };
  },
  methods: {
    locDisplay() {
      console.log(1);
      this.$emit("locationdata", this.locData);
    },
    /*async savetofs() {
        try {
            const docRef = await setDoc(doc(db, "Addresses", this.emailData), {
                Address: this.locData,
                Email: this.emailData,
            });
            console.log(docRef)
            document.getElementById("myform").reset();
            this.$emit("added");
        } catch (error) {
            console.error("Error adding documen: ", error)
        }
    } */
  },
};
</script>

<style></style>
