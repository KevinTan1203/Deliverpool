<template>
  <div>
    <h3>Sort by</h3>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="sort"
        id="flexRadioDefault4"
        @click="sortByDistance"
      />
      <label class="form-check-label" for="flexRadioDefault4">
        Estimated Delivery Time
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="sort"
        id="flexRadioDefault5"
        @click="sortByRating"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Rating </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sortByDistance() {
      this.$emit("sortByDistance", true);
    },
    sortByRating() {
      this.$emit("sortByRating", true);
    },
  },
};
</script>

<style></style>
