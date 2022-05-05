<template>
  <div class="pool-form">
    <span id="title"><strong>Pool Creation Form</strong></span>
    <br />
    <br />
    <form id="form">
      <label for="addressOfCollection"
        >Collection Point <span style="color: red">*</span></label
      >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="35"
          fill="currentColor"
          class="bi bi-geo-alt-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
          />
        </svg>
        <select id="addressOfCollection" v-model="addressData">
          <option value="Eusoff Hall">Eusoff Hall</option>
          <option value="Kent Ridge Hall">Kent Ridge Hall</option>
          <option value="King Edward VII Hall">King Edward VII Hall</option>
          <option value="Raffles Hall">Raffles Hall</option>
          <option value="Sheares Hall">Sheares Hall</option>
          <option value="Temasek Hall">Temasek Hall</option>
          <option value="College of Alice & Peter Tan">College of Alice & Peter Tan</option>
          <option value="Residential College 4">Residential College 4</option>
          <option value="Tembusu College">Tembusu College</option>
          <option value="PGP Residence">PGP Residence</option>
          <option value="UTown Residence">UTown Residence</option>
        </select>
      </div>
      <br />
      <label for="price"
        >Total Delivery Fee <span style="color: red">*</span></label
      >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="35"
          fill="currentColor"
          class="bi bi-coin"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"
          />
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
          />
        </svg>
        <input
          type="number"
          step="0.01"
          id="price"
          placeholder="E.g $10"
          size="50"
          v-model="costData"
        />
      </div>
      <br />
      <label for="poolClosureTime"
        >Cut-off Time <span style="color: red">*</span></label
      >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="35"
          fill="currentColor"
          class="bi bi-alarm-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"
          />
        </svg>
        <input
          type="time"
          id="poolClosureTime"
          placeholder="Enter time to close pool"
          size="50"
          v-model="timeData"
        />
      </div>
      <br />
      <label for="foodLink"
        >Group Order Invite Link <span style="color: red">*</span></label
      >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="35"
          fill="currentColor"
          class="bi bi-link-45deg"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
          />
          <path
            d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
          />
        </svg>
        <input
          type="link"
          id="foodLink"
          placeholder="Copy invite link from your food delivery app"
          size="50"
          v-model="foodData"
        />
      </div>
      <br />
      <label for="addInformation">Additional Notes</label>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="35"
          fill="currentColor"
          class="bi bi-file-earmark-text-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
          />
        </svg>
        <input
          type="text"
          id="addInformation"
          maxlength="100"
          placeholder="Any collection instructions for others?"
          size="50"
          v-model="infoData"
        />
      </div>
      <br />
      <div class="save" style="text-align: center">
        <button
          id="submit"
          type="button"
          v-on:click="createForm()"
          :disabled="!formIsValid"
        >
          <span><strong>Submit</strong></span>
        </button>
      </div>
    </form>
    <br />
    <br />
  </div>
</template>
<script>
import firebaseApp from "../firebase.js";

import { arrayUnion, getDoc, getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, updateDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      user: false,
      addressData: "",
      costData: "",
      timeData: "",
      cutOffTimeData: "",
      foodData: "",
      infoData: "",
      restaurantId: "",
      list: [],
      addresses: [],
    };
  },
  computed: {
    formIsValid() {
      if (
        this.addressData &&
        this.validCost(this.costData) &&
        this.timeData &&
        this.foodData
      ) {
        console.log("Valid Form");
        return true;
      }
      console.log("Invalid Form");
      return false;
    },
  },
  mounted() {
    this.restaurantId = this.$route.params.id;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getRestaurants(user);
      }
    });
  },
  methods: {
    validCost(cost) {
      return cost > 0;
    },

    createForm() {
      savetofs(
        this.addressData,
        this.costData,
        this.timeData,
        this.foodData,
        this.infoData,
        this.restaurantId,
        this.user
      );

      async function savetofs(
        address,
        price,
        closureTime,
        foodLink,
        info,
        id,
        user
      ) {
        const restRef = doc(db, "Restaurants", id);
        let z = await getDoc(restRef);
        const userRef = doc(db, "Users", user.uid);
        let x = await getDoc(userRef);
        try {
          console.log("Creating Pool Form");
          console.log(closureTime);
          let today = new Date();
          let cutOff = new Date();
          const hour = closureTime.substring(0, 2);
          const minutes = closureTime.substring(3, 5);
          cutOff.setHours(hour, minutes, 0, 0);
          if (today.getTime() >= cutOff.getTime()) {
            cutOff.setDate(today.getDate() + 1);
          }
          console.log(cutOff);
          today.setHours(hour, minutes, 0, 0);
          const docRef = await addDoc(collection(db, "Pools"), {
            collectionPoint: address,
            cutoffTime: cutOff,
            date: new Date(),
            initiator: userRef, // Retrieve the user who initiated this pool
            inviteLink: foodLink,
            notes: info,
            open: true,
            platform: z.get("platform"),
            restaurant: restRef,
            restName: z.get("name"),
            restPic: z.get("picture"),
            totalCapacity: 5,
            totalDelivery: parseFloat(price),
            vacancies: 4,
            usersJoined: [],
          });
          console.log(docRef.id);
          await updateDoc(userRef, {
            createdPools: arrayUnion(docRef),
            combinedPools: arrayUnion(docRef),
          });

          // let key = "favRestaurant." + z.get("name")
          // await update(userRef, {[key]: 1})
          const userRefSnap = await getDoc(userRef);
          const favRestaurantObj = userRefSnap.data().favRestaurant;

          let resName = z.get("name");
          let resPic = z.get("picture")
          if (resName in favRestaurantObj) {
            let value = favRestaurantObj[resName][0]
            favRestaurantObj[resName] = [value + 1, resPic]
          } else {
            favRestaurantObj[resName] = [1, resPic]
          }

          await updateDoc(userRef, {
            favRestaurant: favRestaurantObj,
          });
          // const resRef = doc(db, "Users", auth.currentUser.uid);
          // let key = "favRestaurant." + z.get("name")
          // await update(resRef, {[key]:1});
          

          let value = x.get("Points") + 10
          await updateDoc(userRef, {
            LastOrder: new Date(),
            Points: value,
          });
          // document.getElementById('myform').reset();
          alert(
            "Pool was successfully created! You may now view your pools under My Pools tab."
          );
          window.location.replace("/mypools");
        } catch (error) {
          console.error("Error creating Pool Form", error);
        }
      }
    },
    async getRestaurants(user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        let z = await getDoc(docRef);
        this.list = z.get("favRestaurant");
        console.log(this.list)

        console.log("Succesfully retrieve restaurants");
      } catch (error) {
        console.error("Error getting restaurants: ", error);
      }
    },
  },
};
</script>
<style scoped>
* {
  position: relative;
}

/* ------- Pool Restaurant Details ------- */
.pool-form #title {
  font-size: 35px;
  text-align: center;
  color: #262626;
}

/* ------- Main Pool Creation Form ------- */
.pool-form {
  text-align: center;
  top: 20px;
}

#form {
  width: 600px;
  margin: auto;
  text-align: left;
}

label {
  color: #63a4ff;
  padding-left: 8px;
  margin-bottom: 5px;
}

.bi-geo-alt-fill,
.bi-coin,
.bi-alarm-fill,
.bi-link-45deg,
.bi-file-earmark-text-fill {
  color: #f18c08;
}

#addressOfCollection,
#price,
#poolClosureTime,
#foodLink,
#addInformation {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #63a4ff;
  border-radius: 5px;
  text-align: center;
  padding: 8px 0px 8px 8px;
  font-size: 20px;
  width: 540px;
}

::placeholder {
  font-size: 15px;
  color: #7c868a;
  text-align: left;
}

/* ------- Submit Button ------- */
#submit {
  color: white;
  background-color: #f18c08;
  border: 2px solid;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px;
  margin-top: -5px;
  width: 150px;
}

#submit:hover {
  background-color: #63a4ff;
}
</style>
