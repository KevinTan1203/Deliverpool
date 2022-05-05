<template>
  <NavBar/>
  <div style="text-align: center">
    <h1>404 Page Not Found</h1>
    <p>Please click on the above available options.</p>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "NotFound",
  components: {
    NavBar,
  }
}
</script>
