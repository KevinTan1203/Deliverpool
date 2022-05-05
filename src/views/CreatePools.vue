<template>
  <NavBar @emitPostalCode="updatePostalCode" />
  <div class="container-fluid m-0">
    <div class="row gx-3">
      <div class="col-2" id="filter">
        <FilterBar
          @updateFilterData="updateFilterData"
          @sortByDistance="sortByDistance"
          @sortByRating="sortByRating"
        />
        <button id="reset-filter" @click="reset">Reset Filter</button>
      </div>
      <div class="col" id="restaurants">
        <Restaurants
          :restaurants="restaurants"
          :filteredPlatform="this.filterData.platform"
          :postalCode="this.postalCode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Restaurants from "@/components/Restaurants.vue";
import NavBar from "@/components/NavBar.vue";
import FilterBar from "../components/Filters.vue";
import firebaseApp from "../firebase.js";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
  name: "CreatePools",

  components: {
    Restaurants,
    NavBar,
    FilterBar,
  },
  data() {
    return {
      restaurants: [],
      restaurantsStore: [], //store values before filter
      filterData: {
        platform: "",
        cuisine: "",
      },
      postalCode: "119077", //NUS POSTAL CODE
    };
  },

  methods: {
    redirect() {
      if (auth.currentUser) {
        this.$router.push({ path: "/" });
      }
    },
    reset() {
      this.restaurants = this.restaurantsStore;
      location.reload();
    },
    sortByRating() {
      console.log("rating sort");
      this.restaurants.sort(this.ratingComparator);
    },
    sortByDistance() {
      console.log("distance sort");
      this.restaurants.sort(this.distanceComparator);
    },
    distanceComparator(a, b) {
      //used to sort resaurant data
      if (a.distance < b.distance) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }
      return 0;
    },
    ratingComparator(a, b) {
      //used to sort resaurant data
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    },
    async getRestaurantsData() {
      const querySnapshot = await getDocs(collection(db, "Restaurants"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var restaurant = doc.data();
        restaurant.restaurant_id = doc.id;
        this.restaurants.push(restaurant);
      });
    },
    updateFilterData(newdata) {
      this.filterData = newdata;
      this.updateRestaurantsData();
    },
    updatePostalCode(postalCode) {
      this.postalCode = postalCode;
    },
    updateRestaurantsData() {
      if (this.restaurantsStore.length > 0) {
        this.restaurants = this.restaurantsStore;
      }
      let newRestaurants = [];
      if (this.filterData.platform == "") {
        //only cuisine is filtered
        for (const restaurant of this.restaurants) {
          if (restaurant.cuisine.includes(this.filterData.cuisine)) {
            newRestaurants.push(restaurant);
          }
        }
      } else if (this.filterData.cuisine == "") {
        //Only platform is filtered
        for (const restaurant of this.restaurants) {
          if (restaurant.platform == this.filterData.platform) {
            newRestaurants.push(restaurant);
          }
        }
      } else {
        //both values are filtered
        for (const restaurant of this.restaurants) {
          if (
            restaurant.platform == this.filterData.platform &&
            restaurant.cuisine.includes(this.filterData.cuisine)
          ) {
            newRestaurants.push(restaurant);
          }
        }
      }
      //Update Restaurant values
      this.restaurantsStore = this.restaurants;
      this.restaurants = newRestaurants;
      console.log(this.restaurants);
    },
  },
  mounted() {
    this.getRestaurantsData();
  },
};
</script>

<style scoped>
#create-pools {
  display: flex;
}
#filter {
  border-right: 2px solid rgba(216, 216, 216, 0.58);
  height: 100%;
}

#reset-filter {
  width: 100px;
  height: 30px;
  background-color: #ffad42;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 10px;
  margin-top: 20px;
}

#restaurants {
  padding-left: 20px;
}
</style>
