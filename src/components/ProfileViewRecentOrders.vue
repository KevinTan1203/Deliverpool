<template>
  <div style="margin-left: 50%; margin-right: 50px;"> 
    <router-link to="/profile">
        <p class="myaccount">My Account </p>
    </router-link>
    <p class ="recent">  &nbsp; > &nbsp; Recent Orders </p>
    <br/>
    <br/>
    <hr/>
    <br/>
    <div class="container">
      <h1 class="main_order_line">Recent Orders</h1>
      <div id="pool" v-for="pool in combinedPools" :key="pool">
        <img
          :src="pool.get('restPic')"
          alt="Restaurant picture"
          width="230"
          height="200"
        />
        <span id="restaurant-name"><b>{{ pool.get("restName") }}</b></span>
        <ul class="details">
          <li>{{ this.parseDate(pool.get("date").toDate()) }}</li>
          <li>{{ pool.get("platform") }}</li>
        </ul>
      </div>
    </div>
    <br/>
    <br/>
  </div>
</template>

<script>
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  name: "PoolsList",

  data() {
    return {
      user: "",
      combinedPools: [],
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getPools(user);
      }
    });
  },

  methods: {
    async getPools(user) {
      try {
        const userRef = doc(db, "Users", user.uid);
        let z = await getDoc(userRef);
        const createRefs = z.get("combinedPools");
        for (let i = createRefs.length - 1; i >= 0 ; i--) {
          let docRef = await getDoc(createRefs[i]);
          this.combinedPools.push(docRef);
          console.log(docRef.get("cutoffTime").toDate().to);
        }
        console.log(this.combinedPools);
        console.log("Succesfully retrieved pools");
      } catch (error) {
        console.error("Error getting pools: ", error);
      }
    },
    parseDate(date) {
      const monthList = ["January", "February", "March", "April", "May", 
                     "June", "July", "August", "September", "October", 
                     "November", "December"];
      var day = date.getDate()
      var month = monthList[date.getMonth()]
      var hours;
      var mins;
      // console.log(date)
      console.log(date.getHours())
      if (date.getHours() == 0) {
        hours = "00";
      } else if (date.getHours() < 10) {
        hours = "0" + date.getHours();
      } else {
        hours = date.getHours();
      }
      if (date.getMinutes() < 10) {
        mins = "0" + date.getMinutes();
      } else {
        mins = date.getMinutes();
      }
      return day + " " + month + " " + hours + ":" + mins;
    }
  },
};
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

/* -------- Pool Display -------- */
img {
  padding: 10px;
}

.details {
  /* border: black solid 1px; */
  list-style-type: none;
  max-width: 400px;
  position: relative;
  left: 230px;
  bottom: 130px;
}

#restaurant-name {
  position: relative;
  bottom: 50px;
  font-size: 20px;
  left: 15px;
}


#pool {
  height: 200px;
  border: #aeacac solid 1px;
  border-radius: 10px;
}

.myaccount, .recent {
    display:inline;
    font-size: 20px;
}
</style>