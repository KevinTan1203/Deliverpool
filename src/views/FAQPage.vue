<template>
  <div>
    <NavBar />
    <FAQ />
  </div>
</template>

<script>
import FAQ from "../components/FAQs.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    FAQ,
    NavBar,
  },
};
</script>

<style></style>
