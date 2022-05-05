<template>
  <div style="margin-left: 50%; margin-right: 50px;"> 
    <router-link to="/profile">
        <p class="myaccount">My Account </p>
    </router-link>
    <p class ="fav"> &nbsp; > &nbsp; Favourite Restaurant </p>
    <br/>
    <br/>
    <hr/>
    <br/>
    <div class="container">
      <h1 class="main_order_line">Favourite Restaurants</h1>
      <div id ="favRes" v-for="(v, k) in sortedDict" :key="v">
        <img 
          :src="v[1]"
          alt = "Restaurant picture"
          width = "230"
          height="200"
        />
        <div class="details">
          <h5><b> Number of times ordered: {{v[0]}}</b></h5>
          <h6> {{k}} </h6>
        </div>
      </div>
    </div>
  </div>
  <br>
  <br>
</template>
<script>
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  name: "FavRestaurants",

  data() {
    return {
      user: "",
      favRestaurant: {},
      sortedDict: {},
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getfavRestaurant(user);
      }
    });
  },

  methods: {
    async sortDict(dict) { 
      var items = Object.keys(dict).map(
      (key) => { return [key, dict[key]] });

      items.sort(
      (first, second) => { return second[1][0] - first[1][0] }
      );
      console.log(items);

      let newDict = {}
      for (let i = 0; i<items.length; i++) {
        newDict[items[i][0]] = items[i][1];
      }
      this.sortedDict = newDict;

    },
    async getfavRestaurant(user) {
      try {
        const userRef = doc(db, "Users", user.uid);
        const userRefSnap = await getDoc(userRef);
        this.favRestaurant = userRefSnap.data().favRestaurant;
        this.sortDict(this.favRestaurant)
        console.log("Succesfully get restaurants");
      } catch(error) {
        console.error("Error getting restaurants: ", error);
      }
    },
  },
}
</script>
<style scoped>
/* -------- Headers -------- */
.main_order_line {
  font-size: 31px;
  position: relative;
  bottom: 30px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: black;
  text-decoration-thickness: 2px;
}

.myaccount, .fav {
  display: inline;
  font-size: 20px;
}

.details {
  /* border: black solid 1px; */
  position: relative;
  left: 230px;
  bottom: 140px;
  width: 460px;
  padding-left: 15px;
}

#restaurant-name {
  position: relative;
  bottom: 50px;
  font-size: 20px;
  left: 30px;
}

#favRes {
    border: #aeacac solid 1px;
    border-radius: 10px;
    height:200px;
}

img {
  padding: 10px;
}
</style>