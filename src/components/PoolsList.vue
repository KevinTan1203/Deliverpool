<template>
<div class="container">
  <div>
    <h1>Pools that I created</h1>
    <p v-if="createdPools.length == 0" id="empty-message-1">You have not created any pools yet.</p>
    <div class="row mx-0 my-2 align-items-center pool" v-for="pool in createdPools" :key="pool">
      <div class="col-3 image-box">
        <img
          id="image"
          :src="pool.get('restPic')"
          alt="Restaurant picture"
          width="280"
          height="200"
        />
      </div>
      <div class="col-4 details">
        <h5><b>{{ pool.get("restName") }}</b></h5>
        <ul>
          <li><b>Collect at:</b> {{ pool.get("collectionPoint") }}</li>
          <li>
            <b>Number of users joined: </b> {{ pool.get("usersJoined").length }}
          </li>
          <li><b>Delivery fee (total):</b> ${{ pool.get("totalDelivery") }}</li>
          <li><b>Platform: </b> {{ pool.get("platform") }}</li>
          <li>
            <b>Cut-off time:</b>
            {{ pool.get("cutoffTime").toDate().toLocaleTimeString() }}
          </li>
        </ul>
      </div>
      <div class="col">
        <p class="notes"> <b>Notes:</b> {{ pool.get("notes") }} </p>
      </div>
    </div>
    <br>
    <br>
    <hr id="divider" />
  </div>

  <br />
  <br />
  <div>
    <h1>Pools that I joined</h1>
    <p v-if="joinedPools.length == 0" id="empty-message-2">You have not joined any pools yet.</p>
    <div class="row mx-0 my-2 align-items-center pool" v-for="pool in joinedPools" :key="pool">
      <div class="col-3 image-box">
        <img
          id="image"
          :src="pool.get('restPic')"
          alt="Restaurant picture"
          width="280"
          height="200"
        />
      </div>
      <div class="col-4 details">
        <h5><b>{{ pool.get("restName") }}</b></h5>
        <ul>
          <li><b>Collect at:</b> {{ pool.get("collectionPoint") }}</li>
          <li>
            <b>Number of users joined: </b> {{ pool.get("usersJoined").length }}
          </li>
          <li><b>Delivery fee (total):</b> ${{ pool.get("totalDelivery") }}</li>
          <li><b>Platform: </b> {{ pool.get("platform") }}</li>
          <li><b>Close in:</b> {{ getClosingStatus(pool.get("cutoffTime")) }}</li>
        </ul>
      </div>
      <div class="col-3">
          <p class="notes"> <b>Notes:</b> {{ pool.get("notes") }} </p>
      </div>
      <div class="col">
        <button class="quit-button" v-on:click="quitPool(pool)">Quit</button>
      </div>
    </div>
  </div>
  <br>
  <br>
</div>
</template>

<script>
import {
  doc,
  getFirestore,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  name: "PoolsList",

  data() {
    return {
      user: "",
      createdPools: [],
      joinedPools: [],
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
        const createRefs = z.get("createdPools");
        for (let i = 0; i < createRefs.length; i++) {
          let docRef = await getDoc(createRefs[i]);
          let time = this.getCloseIn(docRef.get("cutoffTime"));
          console.log(time);
          if (time >= -240) {
            this.createdPools.push(docRef);
            console.log(docRef.get("cutoffTime").toDate().to);
          }
        }
        const joinRefs = z.get("joinedPools");
        for (let i = 0; i < joinRefs.length; i++) {
          let docRef = await getDoc(joinRefs[i]);
          let time = this.getCloseIn(docRef.get("cutoffTime"));
          if (time >= -240) {
            this.joinedPools.push(docRef);
          }
        }
        console.log(this.createdPools);
        console.log(this.joinedPools);
        console.log("Succesfully retrieved pools");
      } catch (error) {
        console.error("Error getting pools: ", error);
      }
    },

    async quitPool(pool) {
      try {
        console.log(pool);
        const userRef = doc(db, "Users", this.user.uid);
        const poolRef = doc(db, "Pools", pool.id);
        let z = await getDoc(poolRef);
        if (this.getCloseIn(z.get("cutoffTime")) >= 10) {
          let newVac = z.get("vacancies") + 1;
          await updateDoc(poolRef, {
            usersJoined: arrayRemove(userRef),
            vacancies: newVac,
          });
          await updateDoc(userRef, {
            joinedPools: arrayRemove(poolRef),
            combinedPools: arrayRemove(poolRef),
          });
          this.$emit("modified");
          console.log("Successfully quited pool");
        } else {
          if (z.get("open")) {
            alert("Cannot quit pool that is closing in 10 minutes");
          } else {
            alert("Pool has closed");
          }
        }
      } catch (error) {
        console.error("Error quitting pool: ", error);
      }
    },

    getCloseIn(time) {
      return Math.round((time.seconds - Date.now() / 1000) / 60);
    },

    getClosingStatus(time) {
      const status = this.getCloseIn(time);
      if (status > 0) {
        return status + " min";
      }
      return "Pool has closed";
    },
  },
};
</script>

<style scoped>
/* --------------- Empty Pools Message --------------- */
#empty-message-1 {
  padding: 10px;
  margin: auto;
}

#empty-message-2 {
  padding: 10px;
  margin: auto;
}

/* --------------- Main Block of the Pools Created --------------- */
.pool {
  border: #aeacac solid 1px;
  border-radius: 10px;
  height: 250px;
  background-color: white;
}

h1 {
  color: orange;
  font-weight: bold;
  font-size: 35px;
}

/* --------------- Details within each Pool block --------------- */
ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
}

.image-box {
  text-align: center;
}

.details {
  padding-left: 25px;
}

.notes {
  overflow-wrap: break-word;
}
/* --------------- Quit function for each Pool block --------------- */
.quit-button {
  background-color: orange;
  border-radius: 10px;
  border: none;
  color: aliceblue;
  width: 70px;
}
/* --------------- Mini Divider between Joined and Created Pools --------------- */
#divider {
  width: 1250px;
  height: 3px;
  margin: auto;
}
</style>