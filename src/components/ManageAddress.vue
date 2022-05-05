<template>
  <!-- Manage addresses component for profile overview page -->
  <div id="container">
    <router-link to="/profile">
      <p class="myaccount">My Account</p>
    </router-link>

    <p class="recent">&nbsp; > &nbsp; Manage Address</p>
    <br />
    <br />
    <hr />

    <div class="location" v-if="this.default">
      <img class="image3" src="../assets/manageaddresses.png" alt="" />
      <div id="addressLine">
        <b>{{ this.default.Name }}</b>
        <br />
        <br />
        <p class="addressLine2">
          {{ this.default.Street }} Singapore {{ this.default.Postal }}
        </p>
        <p class="addressLine3">{{ this.default.Note }}</p>
      </div>
      <span id="modifyBtns">
        <img
          class="imgBtn"
          src="../assets/editPen.png"
          alt="Edit"
          type="button"
          width="40"
        />
        <img
          class="imgBtn"
          src="../assets/delete.png"
          alt="Delete"
          width="40"
          v-on:click="deleteAddress(this.default)"
        />
      </span>
    </div>
    <span
      ><strong id="default" v-if="this.default"
        >**Default Address**</strong
      ></span
    >
    <hr id="separator" />
    <div id="section">
      <div class="location" v-for="item in list" :key="item">
        <img class="image3" src="../assets/manageaddresses.png" alt="" />
        <h3 id="addressLine">
          <b>{{ item.Name }} </b>
          <br />
          <br />
          <p class="addressLine2">
            {{ item.Street }} Singapore {{ item.Postal }}
          </p>
          <p class="addressLine3">{{ item.Note }}</p>
        </h3>
        <span id="modifyBtns">
          <img
            class="imgBtn"
            src="../assets/editPen.png"
            alt="Edit"
            type="button"
            width="40"
            v-on:click="makeDefault(item, true)"
          />
          <img
            class="imgBtn"
            src="../assets/delete.png"
            alt="Delete"
            width="40"
            v-on:click="deleteAddress(item)"
          />
        </span>
      </div>
    </div>
    <form id="form">
      <label for="address">Select an address: </label>
      <select
        name="address"
        id="address"
        class="form-select"
        v-model="addressName"
      >
        <option value="Eusoff Hall">Eusoff Hall</option>
        <option value="Kent Ridge Hall">Kent Ridge Hall</option>
        <option value="King Edward VII Hall">King Edward VII Hall</option>
        <option value="Raffles Hall">Raffles Hall</option>
        <option value="Sheares Hall">Sheares Hall</option>
        <option value="Temasek Hall">Temasek Hall</option>
        <option value="College of Alice & Peter Tan">
          College of Alice & Peter Tan
        </option>
        <option value="Residential College 4">Residential College 4</option>
        <option value="Tembusu College">Tembusu College</option>
        <option value="PGP Residence">PGP Residence</option>
        <option value="UTown Residence">UTown Residence</option>
      </select>
      <input
        class="form-control"
        type="text"
        id="address"
        v-model="note"
        maxlength="80"
        placeholder="Note to rider"
      />
      <button
        id="add"
        type="button"
        v-on:click="addAddresses()"
        :disabled="!formIsValid"
      >
        <strong>Add New Address</strong>
      </button>
    </form>
  </div>
  <br />
  <br />
</template>

<script>
import {
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../firebase.js";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export default {
  data() {
    return {
      user: false,
      building: "",
      street: "",
      postal: "",
      note: "",
      default: "",
      list: [],
      addressName: "",
      addressDict: {
        "Eusoff Hall": { street: "10 Kent Ridge Dr", postal: "119242" },
        "Kent Ridge Hall": {
          street: "10 Heng Mui Keng Terrace",
          postal: "119617",
        },
        "King Edward VII Hall": {
          street: "1A Kent Ridge Rd",
          postal: "119224",
        },
        "Raffles Hall": { street: "19 Kent Ridge Cres", postal: "119278" },
        "Sheares Hall": {
          street: "20 Heng Mui Keng Terrace",
          postal: "119618",
        },
        "Temasek Hall": { street: "12 Kent Ridge Dr", postal: "119243" },
        "College of Alice & Peter Tan": {
          street: "8 College Ave E",
          postal: "138615",
        },
        "Residential College 4": {
          street: "6 College Avenue East",
          postal: "138614",
        },
        "Tembusu College": { street: "28 College Ave E", postal: "138598" },
        "PGP Residence": {
          street: "27 Prince George's Park",
          postal: "118425",
        },
        "UTown Residence": {
          street: "36 College Ave E, North Tower",
          postal: "138600",
        },
      },
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getAddresses(user);
        this.getDefault(user);
      }
    });
  },
  computed: {
    formIsValid() {
      /*
      if (this.building && this.street && this.postal) {
        return true;
      }
      return false;
      */
      if (this.addressName) {
        return true;
      }
      return false;
    },
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          window.location.reload();
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },

    testlog() {
      console.log(this.addressDict[this.addressName].street);
    },

    async addAddresses() {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].Name == this.addressName) {
            alert("Cannot add same address");
            return;
          }
        }
        if (this.default.Name == this.addressName) {
          alert("Cannot add same address");
          return;
        }
        await updateDoc(docRef, {
          Addresses: arrayUnion({
            Name: this.addressName,
            Street: this.addressDict[this.addressName].street,
            Postal: this.addressDict[this.addressName].postal,
            Note: this.note,
          }),
        });
        let z = await getDoc(docRef);
        this.list = z.get("Addresses");
        if (this.list.length == 1) {
          this.makeDefault(this.list[0], false);
        }
        console.log("Succesfully added address");
        this.$emit("modified");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async getAddresses(user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        let z = await getDoc(docRef);
        this.list = z.get("Addresses");
        console.log("Succesfully retrieve addresses");
        if (this.list.length == 0) {
          this.makeDefault("", false);
        }
        if (this.list.length == 1) {
          this.makeDefault(this.list[0], false);
        }
      } catch (error) {
        console.error("Error getting addresses: ", error);
      }
    },
    async deleteAddress(address) {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        let z = await getDoc(docRef);
        await updateDoc(docRef, {
          Addresses: arrayRemove(address),
        });
        this.getAddresses(this.user);
        if (z.get("Default").Name == address.Name) {
          if (this.list.length > 1) {
            this.makeDefault(this.list[0], true);
          }
        }
        console.log("Succesfully removed address");
        this.$emit("modified");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
    async makeDefault(address, multiple) {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {
          Default: address,
        });
        this.default = address;
        if (multiple) {
          this.$emit("modified");
        }
        this.getDefault(this.user);
        console.log("Succesfully added default address");
      } catch (error) {
        console.error("Error making default address");
      }
    },
    async getDefault(user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        let z = await getDoc(docRef);
        this.default = z.get("Default");
        if (this.list.length > 0) {
          this.list = this.list.filter(
            (address) => address.Name != this.default.Name
          );
        }
        console.log("Succesfully retrieve default address");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
#container {
  /* border: black solid 1px; */
  margin-left: 50%;
  margin-right: 50px;
}
.myaccount,
.recent {
  display: inline;
  font-size: 20px;
}

/* ----------- Image for Manage Address ----------- */
.image3 {
  width: 80px;
  height: 80px;
  /* border: black solid 1px; */
}

.location {
  /* border: black solid 1px;*/
  font-weight: 700;
  display: flex;
  justify-content: center;
  color: #000000;
  height: 150px;
}

#section {
  max-height: 280px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#addressLine {
  /* border: black solid 1px; */
  font-size: 20px;
  width: 400px;
  display: inline-block;
  margin: auto;
  margin-top: 0;
}

.addressLine2,
.addressLine3 {
  font-size: 18px;
  max-width: 400px;
  font-weight: normal;
}

/* ----------- Address Creation Form ----------- */
#form {
  /* border: black solid 1px; */
  margin: auto;
  padding: 10px;
  margin-top: 60px;
  text-align: center;
  width: 400px;
}

#address {
  font-size: 15px;
  text-align: center;
  margin-bottom: 15px;
}

#add {
  position: relative;
  border-radius: 5px;
  border: 5px white;
  width: 200px;
  height: 36px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgba(99, 164, 255, 0.2);
  color: #004ba0;
  font-size: 15px;
}

.imgBtn {
  cursor: pointer;
  text-align: right;
  display: inline-block;
  position: relative;
  padding: 5px 5px;
}

#modifyBtns {
  display: inline-block;
  text-align: right;
  /* border: black solid 1px; */
  margin: auto;
  margin-top: 0;
}

#default {
  font-size: 15px;
  position: relative;
  left: 76%;
  bottom: 40px;
}

/* ----------- Main default address line ----------- */
#separator {
  position: relative;
  bottom: 25px;
  height: 2px;
}
</style>
