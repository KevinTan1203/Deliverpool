<template>
  <Deliverpool :location="location" />
  <AddLocation @locationdata="change($event)" />
</template>

<script>
import Deliverpool from "@/components/Deliverpool.vue";
import AddLocation from "@/components/AddLocation.vue";

export default {
  name: "App",
  components: {
    Deliverpool,
    AddLocation,
  },
  data() {
    return {
      location: "",
    };
  },
  methods: {
    change(x) {
      this.location = x;
      console.log(1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
