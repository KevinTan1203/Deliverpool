<template>
  <div id="filter-container">
    <CuisineFilter id="cuisineFilter" @updateCuisine="updateCuisine" />
    <PlatformFilter id="platformFilter" @updatePlatform="updatePlatform" />
    <Sorting
      id="sorting"
      @sortByDistance="sortByDistance"
      @sortByRating="sortByRating"
    />
  </div>
</template>

<script>
import CuisineFilter from "../components/CuisineFilter.vue";
import PlatformFilter from "../components/PlatformFilter.vue";
import Sorting from "../components/Sorting.vue";
export default {
  components: {
    CuisineFilter,
    PlatformFilter,
    Sorting,
  },
  methods: {
    updatePlatform(newdata) {
      this.filterData.platform = newdata;
      this.$emit("updateFilterData", this.filterData);
    },
    updateCuisine(newdata) {
      this.filterData.cuisine = newdata;
      this.$emit("updateFilterData", this.filterData);
    },
    sortByRating() {
      this.$emit("sortByRating", true);
    },
    sortByDistance() {
      this.$emit("sortByDistance", true);
    },
  },
  data() {
    return {
      filterData: {
        platform: "",
        cuisine: "",
      },
    };
  },
};
</script>

<style scope>
#filter-container {
  /* border-right: 2px solid rgba(216, 216, 216, 0.58); */
  padding-left: 10px;
}
#cuisineFilter {
  margin-top: 20px;
  border-bottom: 2px solid rgba(216, 216, 216, 0.58);
  padding-bottom: 20px;
  width: 80%;
}
#platformFilter {
  margin-top: 20px;
  border-bottom: 2px solid rgba(216, 216, 216, 0.58);
  width: 80%;
  padding-bottom: 20px;
}
#sorting {
  margin-top: 20px;
}
</style>
