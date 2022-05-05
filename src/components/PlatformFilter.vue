<template>
  <div id="Platform">
    <h3>Platform</h3>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="Platform"
        id="flexRadioDefault1"
        value="GrabFood"
        @click="updatePlatform"
      />
      <label class="form-check-label" for="flexRadioDefault1">
        GrabFood
      </label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="Platform"
        id="flexRadioDefault2"
        @click="updatePlatform"
        value="Foodpanda"
      />
      <label class="form-check-label" for="flexRadioDefault2"> Foodpanda</label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="Platform"
        id="flexRadioDefault3"
        @click="updatePlatform"
        value="Deliveroo"
      />
      <label class="form-check-label" for="flexRadioDefault3">
        Deliveroo
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updatePlatform(event) {
      this.$emit("updatePlatform", event.target.value);
    },
  },
};
</script>

<style scoped>
  #Platform {
    /* border-right: 2px solid rgba(216, 216, 216, 0.58); */
    padding-left: 10px;
    margin-top: 20px;
  }
</style>
