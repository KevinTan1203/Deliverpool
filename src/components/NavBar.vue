<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/deliverpool.png" alt="" width="300" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- if the user is not logged in or has not saved any addresses-->
        <div
          v-if="addresses.length == 0"
          class="input-group me-auto"
          style="width: 650px"
        >
          <span class="input-group-text" style="background-color: #fff"
            >Delivering to:
          </span>
          <input
            class="form-control me-2"
            type="text"
            placeholder="Type your address"
            id="enterLocation"
            v-model.lazy="postalCode"
          />
        </div>
        <!-- if the user has logged in and has saved addresses -->
        <div v-else class="input-group me-auto" style="width: 650px">
          <span class="input-group-text">Delivering to: </span>
          <select class="form-select" v-model="postalCode">
            <option
              v-for="address in addresses"
              :key="address.Name"
              :value="address.Name"
            >
              {{ address.Name }}
            </option>
          </select>
        </div>

        <ul class="navbar-nav me-auto nav-fill w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Join Pools</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/createPools"
              >Create Pools</router-link
            >
          </li>
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" to="/mypools">My Pools</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faqs">FAQs</router-link>
          </li>
          <li v-if="user" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#63a4ff"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              {{ username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li class="options">
                <router-link class="dropdown-item" to="/profile"
                  >View my profile</router-link
                >
              </li>
              <li class="options">
                <a
                  class="dropdown-item"
                  href="#"
                  role="button"
                  @click="signOut()"
                  >Logout</a
                >
              </li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link" to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#63a4ff"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              Login/ Signup
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "NavBar",

  data() {
    return {
      user: "",
      addresses: [], // addresses that are already saved by the user
      postalCode: "", // postal code of input/ selected address
      username: "",
    };
  },

  watch: {
    postalCode(val) {
      console.log("emitting postal code");
      console.log(val);
      this.emitPostalCode(val);
    },
  },

  methods: {
    async getAddresses() {
      const docSnap = await getDoc(doc(db, "Users", this.user));
      if (docSnap.exists()) {
        const user = docSnap.data();
        // console.log(user)
        this.username = user.Username;
        if (user.Addresses) {
          console.log("has saved address");
          this.addresses = user.Addresses;
          // this.postalCode = user.Default.Name;
        }
        // console.log(this.addresses)
      } else {
        console.log("No such document!");
      }
    },

    emitPostalCode(postalCode) {
      this.$emit("emitPostalCode", postalCode);
    },

    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.$router.push({ path: "/login" });
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.uid;
        console.log("NavBar", this.user);
        this.getAddresses();
      }
    });
  },
};
</script>

<style scoped>
nav {
  border-bottom: 2px solid rgba(216, 216, 216, 0.58);
  box-shadow: 0px 2px 10px rgba(158, 158, 158, 0.27);
  margin-bottom: 20px;
}
.input-group-text {
  background-color: #fff;
  color: #828282;
}

.navbar-nav a.router-link-exact-active {
  color: #63a4ff;
}

.navbar-nav li::after {
  content: "";
  width: 0;
  height: 2px;
  background: transparent;
  display: block;
  margin: auto;
  transition: 0.5s;
}

.navbar-nav li:hover::after {
  width: 80%;
  background: #63a4ff;
}


/* ------------- Drop down menu for user ------------- */
#navbarDropdown {
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: black solid 1px; */
}
</style>
