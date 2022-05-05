<template>
  <div id="restaurant-block">
    <span id="restaurant-name"><b> {{ name }} </b></span>
    <br />
    <b>
    <ul id="second-row">
      <li> <strong> {{ foodProvider }}</strong> </li>
      <li> <strong> {{ platform }} </strong> </li>
    </ul>
    <ul id="third-row">
      <li>
        <svg
        id="star-icon"
        width="20"
        height="35"
        class="w-6 h-6"
        fill="#e7a651"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        ></path>
        </svg>
        {{ ratings }} 
      </li>
      <li>
        <strong>Opening Hours:</strong> {{ openingHours }}
      </li>
      <li>
        <strong>Estimated Delivery Time:</strong> {{ deliveryTime }}
      </li>
    </ul>
    </b>
    <br />
    <br /> 
  </div>
  <hr id="line">
</template>
<script>
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "restaurant_display",
  data() {
    return {
      name: "",
      ratings: "",
      postal: "",
      foodProvider: "",
      platform: "",
      openingHours: "",
      deliveryTime: "20 mins" // Calculate the delivery time
    };
  },

  mounted() {
    this.getRestaurant(this.$route.params.id);
  },

  methods: {
    async getRestaurant(id) {
      try {
        const docRef = doc(db, "Restaurants", id);
        let z = await getDoc(docRef);
        console.log(z.get("cuisine"));
        this.name = z.get("name");
        this.ratings = z.get("rating");
        this.postal = z.get("postalCode");
        this.foodProvider = this.getCuisine(z.get("cuisine"));
        this.platform = z.get("platform");
        this.openingHours = z.get('openingHours');
        console.log("Succesfully retrieve restaurant details");
      } catch (error) {
        console.error("Error getting restaurant details: ", error);
      }
    },
    getCuisine(element) {
      if (Array.isArray(element)) {
        return element[0];
      } else {
        return element;
      }
    }
  },
};
</script>
<style scoped>
* {
  font-family: sans-serif;
}

/* ------- Main Div Block ------- */
#restaurant-block {
  position: relative;
  border: 0px solid rgb(190, 189, 189, 0.5);
  height: 150px;
  bottom: 5px;
}


/* ------- Display Restaurant Name ------- */
#restaurant-name {
  position: relative;
  font-size: 40px;
  left: 50px;
  top: 5px;
}

/* ------- Display Second Row Data ------- */
ul {
  position: relative;
  right: 5px;
  top: 10px;
  list-style-type: none;
}

ul li {
  width: 100%;
}

li {
  display: inline;
  padding: 30px;
}

#line {
  position: relative;
  height: 5px;
  background-color: #63a4ff;
  border: none;
  bottom: 10px;
  width: 100%;
}
</style>