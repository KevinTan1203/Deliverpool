<template>
  <div id="cuisine">
    <h3>Cuisine</h3>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault1"
        value="Fastfood"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault1">
        Fast Food
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault2"
        value="Western"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault2"> Western </label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault3"
        value="Vegetarian"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault3">
        Vegetarian
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault4"
        value="Dessert"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault4"> Dessert </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Beverage"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Beverage </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Local"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Local </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Chinese"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Chinese </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Halal"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Halal </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Indian"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Indian </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="cuisine"
        id="flexRadioDefault5"
        value="Japanese/ Korean"
        @click="updateCuisine"
      />
      <label class="form-check-label" for="flexRadioDefault5"> Japanese/ Korean </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateCuisine(event) {
      this.$emit("updateCuisine", event.target.value);
    },
  },
};
</script>

<style></style>
