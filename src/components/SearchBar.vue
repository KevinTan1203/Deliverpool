<template>
  <div class="search">
    <div id="searchbar">
      <button id="button" type="submit" v-on:click="queryDatabase()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="mag-glass"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="-1 -1 17 17"
          v-on:click="queryDatabase()"
        >
          <path
            stroke="#63a4ff"
            stroke-width="1px"
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
        <i class="bi bi-search"></i>
      </button>
      <input
        id="searchContent"
        v-model="restaurantInput"
        type="text"
        placeholder="Search for a restaurant"
      />
    </div>
    <button id="reset" v-on:click="refreshPage()">Reset Search</button>
  </div>
</template>
<script>
export default {
  name: "searchBar",

  data() {
    return {
      restaurantOfChoice: "",
      restaurantInput: "",
    };
  },

  emits: ["shareRestaurant"],

  methods: {
    queryDatabase() {
      console.log(this.restaurantInput);
      document.getElementById("searchbar").value = "";
      this.$emit("shareRestaurant", this.restaurantInput);
    },
    refreshPage() {
      window.location.reload();
    }
  },
};
</script>
<style scoped>
.search {
  width: 550px;
}
#button {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  z-index: 1;
}
.bi-search {
  width: 25px;
  height: 23px;
  color: #63a4ff;
  z-index: 1;
}
#searchbar {
  display: inline-block;
  width: 380px;
  border-radius: 25px;
  border: 1px solid rgb(190, 189, 189, 0.8);
  padding-left: 8px;
  margin-right: 20px;
}
#searchContent {
  border: none;
  width: 310px;
  outline: none;
}
#reset {
  background: none;
  border: 1px solid rgb(190, 189, 189, 0.8);
  border-radius: 10px;
  height: 30px;
  font-size: 15px;
}
#reset:hover {
  background-color: #ffad42;
}
</style>
