<template>
  <div class="container-fluid ps-0" id="main">
    <div class="row">
      <div class="col">
        <SearchBar @shareRestaurant="change($event)" />
      </div>
      <div class="col-3 text-end">
        <button class="align-middle" id="info" @click="toggleInfoPopup()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#FFAD42"
            class="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </svg>
          How to join a pool?
        </button>
      </div>
    </div>
  </div>
  <Popup v-if="displayInfo" @popupClosed="toggleInfoPopup">
    <h5 style="color: #f57c00; font-weight: bold">How to Join a Pool</h5>
    <p style="text-decoration: underline">
      Please read the following instructions carefully:
    </p>
    <ol style="text-align: left; font-size: 18px">
      <li>
        Click on <b>“Join”</b> and a pop-up window will let you copy the group
        order invite link to your clipboard.
      </li>
      <li>
        Go to the delivery platform for this pool and add your favorite dishes
        to the group order. Note: For Grab, you need their mobile app to do so.
      </li>
      <li>
        The pool that you joined will be reflected under the My Pools page.
      </li>
      <li>
        <b
          >You can only quit a pool if there is still more than 10 mins to its
          cut-off time.</b
        >
      </li>
      <li>
        The pool will close once the cut-off time is reached and the owner will
        check out the group order on the delivery platform.
      </li>
      <li>Sit back and wait for your food to be delivered!</li>
    </ol>
  </Popup>
  <div id="availablePools">
    <h2 id="title" style="color: #f57c00; font-weight: bolder">
      Available Pools
    </h2>
    <div id="pool-list" v-if="openPools.length > 0" v-show="!searchActivated">
      <div v-for="pool in openPools" :key="pool.id" class="m-1">
        <div class="card pool">
          <img :src="pool.picture" class="card-img-top" />
          <div class="card-body">
            <h6 class="card-title">{{ pool.restaurant }}</h6>
            <div class="pool-details">
              <ul>
                <li>Collect at: {{ pool.collectionPoint }}</li>
                <li>Vacancies: {{ pool.vacancies }}</li>
                <li>Delivery fee/ pax: S${{ pool.avgDelivery }}</li>
                <li>Platform: {{ pool.platform }}</li>
                <li>Close in: {{ pool.closein }} mins</li>
              </ul>
            </div>
            <div class="text-center">
              <button
                class="btn joinBtn"
                @click="joinPool(pool.id, pool.inviteLink)"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="pool-list" v-if="openPools.length > 0">
      <div v-for="pool in openPools" :key="pool.id" class="m-1">
        <div
          v-if="pool.restaurant.toLowerCase().includes(this.searchResult.toLowerCase()) && searchActivated"
          class="card pool"
        >
          <img :src="pool.picture" class="card-img-top" />
          <div class="card-body">
            <h6 class="card-title">{{ pool.restaurant }}</h6>
            <div class="pool-details">
              <ul>
                <li>Collect at: {{ pool.collectionPoint }}</li>
                <li>Vacancies: {{ pool.vacancies }}</li>
                <li>Delivery fee/ pax: S${{ pool.avgDelivery }}</li>
                <li>Platform: {{ pool.platform }}</li>
                <li>Close in: {{ pool.closein }} mins</li>
              </ul>
            </div>
            <div class="text-center">
              <button
                class="btn joinBtn"
                @click="joinPool(pool.id, pool.inviteLink)"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else style="margin-top: 50px; text-align: center">
      <h5>No available pools yet. Create your own pool!</h5>
    </div>

    <Popup v-if="joinBtnClicked" @popupClosed="togglePopup">
      <h4>Join a Pool</h4>
      <p>
        Click on the button below to copy the group order invite link to your
        clipboard!
      </p>
      <button class="btn joinBtn" @click="copyAndJoin(poolId, inviteLink)">
        Get Invite Link
      </button>
    </Popup>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import SearchBar from "./SearchBar.vue";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  doc,
  getDoc,
  arrayUnion,
  increment,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "OpenPools",

  components: {
    Popup,
    SearchBar,
  },
  props: ["filterData"],
  watch: {
    filterData: function (newdata) {
      this.updateOpenPools(newdata); //Update pool data to filter data
    },
  },
  data() {
    return {
      user: "",
      openPools: [],
      openPoolsStore: [],
      joinBtnClicked: false,
      poolId: "",
      inviteLink: "",
      searchResult: "",
      searchActivated: false,
      displayInfo: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    // close pools that have elapsed cut-off time
    const db = getFirestore(firebaseApp);
    getDocs(collection(db, "Pools"))
      .then((querySnapshot) => {
        querySnapshot.forEach((d) => {
          let pool = d.data();
          if (pool.open && pool.cutoffTime.seconds < Date.now() / 1000) {
            updateDoc(doc(db, "Pools", d.id), {
              open: false,
            });
            // console.log("Closed: ", d.id)
          }
        });
        this.getOpenPools();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(this.openPools)
    // console.log(this.user)
  },
  methods: {
    updateOpenPools() {
      if (this.openPoolsStore.length > 0) {
        this.openPools = this.openPoolsStore;
      }
      let newOpenPools = [];
      for (const pool of this.openPools) {
        console.log(this.filterData);
        if (this.filterData.address != "" && this.filterData.platform != "") {
          //Both is filtered
          console.log("both filtered");
          if (
            pool.platform == this.filterData.platform &&
            pool.collectionPoint.toLowerCase().includes(
              this.filterData.address.toLowerCase())
          ) {
            newOpenPools.push(pool);
          }
        } else if (this.filterData.address != "") {
          console.log("address filtered");
          ///Filter only by address
          if (
            pool.collectionPoint.toLowerCase().includes(
              this.filterData.address.toLowerCase())
          ) {
            newOpenPools.push(pool);
          }
        } else {
          console.log("platform filtered");
          if (pool.platform == this.filterData.platform) {
            newOpenPools.push(pool);
          }
        }
      }
      this.openPoolsStore = this.openPools;
      this.openPools = newOpenPools;
    },
    async getOpenPools() {
      const db = getFirestore(firebaseApp);
      // query for open pools with at least one vacancy
      const q = query(
        collection(db, "Pools"),
        where("open", "==", true),
        where("vacancies", ">=", 1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((d) => {
        let poolInfo = d.data();
        // console.log(poolInfo)
        let pool = {};
        pool["id"] = d.id;
        getDoc(poolInfo.restaurant)
          .then((res) => {
            let restInfo = res.data();
            pool["restaurant"] = restInfo.name;
            pool["picture"] = restInfo.picture;
            pool["platform"] = restInfo.platform;
            pool["collectionPoint"] = poolInfo.collectionPoint;
            pool["vacancies"] = poolInfo.vacancies;
            pool["avgDelivery"] = (
              poolInfo.totalDelivery /
              (poolInfo.usersJoined.length + 2)
            ).toFixed(2);
            pool["closein"] = Math.round(
              (poolInfo.cutoffTime.seconds - Date.now() / 1000) / 60
            );
            pool["inviteLink"] = poolInfo.inviteLink;
            pool["usersJoined"] = [];
            for (const u of poolInfo.usersJoined) {
              // console.log(u.id)
              pool["usersJoined"].push(u.id);
            }
            pool["owner"] = poolInfo.initiator.id;
            // console.log(pool)
            // add this pool to openPools for this user only if he's not already in the pool
            if (
              !pool["usersJoined"].includes(this.user.uid) &&
              pool["owner"] != this.user.uid
            ) {
              this.openPools.push(pool);
            }
            // console.log(doc.id, "=>", doc.data())
          })
          .catch((err) => console.error(err));
      });
    },

    joinPool(poolId, poolInvite) {
      // console.log(poolId)
      // console.log(poolInvite)
      // console.log(this.user)
      if (this.user) {
        this.togglePopup();
        this.poolId = poolId;
        this.inviteLink = poolInvite;
      } else {
        alert(
          "Please sign in first. You will be directed to the Sign In page."
        );
        this.$router.push({ path: "/login" });
      }
    },

    togglePopup() {
      this.joinBtnClicked = !this.joinBtnClicked;
      // console.log(this.joinBtnClicked)
    },

    toggleInfoPopup() {
      this.displayInfo = !this.displayInfo;
      // console.log(this.joinBtnClicked)
    },

    // copy the invite link to clipboard and join the pool
    async copyAndJoin(poolId, inviteLink) {
      // console.log(inviteLink)
      // add user to this pool's usersJoined, reduce vacancies
      // and copy invite link to user's clipboard
      const db = getFirestore(firebaseApp);
      const pool = doc(db, "Pools", this.poolId);
      const userRef = doc(db, "Users", this.user.uid);

      const userRefSnap = await getDoc(userRef);
      const favRestaurantObj = userRefSnap.data().favRestaurant;

      let z = await getDoc(pool);
      let resName = z.get("restName");
      let resPic = z.get("restPic");
      if (resName in favRestaurantObj) {
        let value = favRestaurantObj[resName][0];
        favRestaurantObj[resName] = [value + 1, resPic];
      } else {
        favRestaurantObj[resName] = [1, resPic];
      }
      await updateDoc(userRef, {
        favRestaurant: favRestaurantObj,
      });

      let x = await getDoc(userRef);
      let value = x.get("Points") + 10;
      await updateDoc(userRef, {
        LastOrder: new Date(),
        Points: value,
      });

      // console.log(this.user)
      // console.log(pool.id, user.id)
      const batch = writeBatch(db);
      batch.update(pool, {
        usersJoined: arrayUnion(userRef),
        vacancies: increment(-1),
      });
      batch.update(userRef, {
        joinedPools: arrayUnion(pool),
        combinedPools: arrayUnion(pool),
      });
      await batch.commit();
      navigator.clipboard.writeText(String(inviteLink)).then(
        function () {
          alert("Copied invite link successfully!");
        },
        function () {
          alert(
            "Error copying the link to clipboard" +
              "please copy directly here: " +
              String(inviteLink)
          );
        }
      );
      this.$router.go();
    },

    change(x) {
      this.searchResult = x;
      if (this.searchResult != "") {
        this.searchActivated = true;
      }
    },
  },
};
</script>

<style scoped>
#pool-list {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
}
.pool {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 520px;
  font-size: 18px;
  margin-right: 20px;
}
.pool img {
  width: 100%;
  height: 200px;
}
.pool-details {
  height: 200px;
  /* border: black solid 1px;*/
  font-size: 16px;
}
.pool h6 {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.joinBtn {
  background-color: #ffad42;
  border-radius: 15px;
  color: #ffffff;
  font-weight: bold;
}
#main {
  margin-top: 25px;
}
#availablePools {
  margin-top: 20px;
}
#info {
  border: none;
  background-color: #ffffff;
}
</style>
