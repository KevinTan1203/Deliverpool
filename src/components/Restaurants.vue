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
          How to create a pool?
        </button>
      </div>
    </div>
  </div>
  <Popup v-if="displayInfo" @popupClosed="toggleInfoPopup">
    <h5 style="color: #f57c00; font-weight: bold">How to Create a Pool</h5>
    <p style="text-decoration: underline">
      Please read the following instructions carefully:
    </p>
    <ol style="text-align: left; font-size: 18px">
      <li>
        Click on <b>“Create”</b> will direct you to the corresponding
        restaurant’s page on the delivery platform.
      </li>
      <li>
        Start a <b>Group Order</b> on the platform and copy the invite link.
        Note: For Grab, you can only do so on the mobile app.
      </li>
      <li><b>Come back to Deliverpool and fill in Pool Creation Form.</b></li>
      <li>The pool that you created will be shown under the My Pools page.</li>
      <li>
        You will be notified via email when there is less than 10 mins to the
        cut-off time set by you.
      </li>
      <li>The pool will close once the cut-off time is reached.</li>
      <li>Check out the group order on the delivery platform.</li>
      <li>Sit back and wait for your food to be delivered!</li>
    </ol>
  </Popup>
  <div id="restaurants">
    <div id="grabfood">
      <h2 class="create-pools-restaurant-headers"
        v-show="
          this.filteredPlatform == '' || this.filteredPlatform == 'GrabFood'
        "
      >
        Order from GrabFood
      </h2>
      <div id="restaurant-list">
        <div
          :key="item.key"
          v-for="item in restaurants"
          v-show="!searchActivated"
        >
          <div v-if="item.platform == 'GrabFood'" id="restaurant-details">
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div :key="item.key" v-for="item in restaurants">
          <div
            v-if="
              item.platform == 'GrabFood' &&
              item.name.toLowerCase().includes(this.searchResult.toLowerCase()) &&
              searchActivated
            "
            id="restaurant-details"
          >
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- food panda -->
    <div id="foodpanda">
      <h2 class="create-pools-restaurant-headers"
        v-show="
          this.filteredPlatform == '' || this.filteredPlatform == 'Foodpanda'
        "
      >
        Order from Foodpanda
      </h2>
      <div id="restaurant-list">
        <div
          :key="item.key"
          v-for="item in restaurants"
          v-show="!searchActivated"
        >
          <div v-if="item.platform == 'Foodpanda'" id="restaurant-details">
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div :key="item.key" v-for="item in restaurants">
          <div
            v-if="
              item.platform == 'Foodpanda' &&
              item.name.toLowerCase().includes(this.searchResult.toLowerCase()) &&
              searchActivated
            "
            id="restaurant-details"
          >
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Deliveroo -->
    <div id="deliveroo">
      <h2 class="create-pools-restaurant-headers"
        v-show="
          this.filteredPlatform == '' || this.filteredPlatform == 'Deliveroo'
        "
      >
        Order from Deliveroo
      </h2>
      <div id="restaurant-list">
        <div
          :key="item.key"
          v-for="item in restaurants"
          v-show="!searchActivated"
        >
          <div v-if="item.platform == 'Deliveroo'" id="restaurant-details">
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div :key="item.key" v-for="item in restaurants">
          <div
            v-if="
              item.platform == 'Deliveroo' &&
              item.name.toLowerCase().includes(this.searchResult.toLowerCase()) &&
              searchActivated
            "
            id="restaurant-details"
          >
            <img :src="item.picture" width="300" height="200" />
            <div id="restaurant-name">{{ item.name }}</div>
            <div id="rating-timing">
              <div id="rating">
                <svg
                  id="star-icon"
                  width="20px"
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
                <div id="rating">{{ item.rating }}</div>
              </div>
              <div id="timing">
                <svg
                  id="clock-icon"
                  width="20px"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>{{ Math.round(item.distance * 6 + 12) }} min</div>
              </div>
            </div>
            <div>
              <button
                id="create-button"
                @click="createPool(item.platformUrl, item.restaurant_id)"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import Popup from "./Popup.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "restaurantsPage",
  data() {
    return {
      searchResult: "",
      searchActivated: false,
      displayInfo: false,
      user: false,
    };
  },
  props: ["restaurants", "filteredPlatform", "postalCode"],
  methods: {
    createPool(platformUrl, restaurantObject) {
      if (this.user) {
        this.restaurantName = restaurantObject.name;
        this.$router.push({
          path: `/createPoolsForm/${restaurantObject}`,
        });
        window.open(platformUrl, "_blank");
      } else {
        alert(
          "Please sign in first. You will be directed to the Sign In page."
        );
        this.$router.push({ path: "/login" });
      }
    },
    change(x) {
      this.searchResult = x;
      this.searchActivated = true;
    },
    toggleInfoPopup() {
      this.displayInfo = !this.displayInfo;
    },
  },
  components: {
    SearchBar,
    Popup,
  },
  watch: {
    postalCode: function (newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  }
};
</script>

<style scoped>
/* -------------- General styling -------------- */
* {
  font-style: normal;
  font-weight: 400;
}

/* -------------- Main Restaurant Block -------------- */
#restaurants {
  /* border: black solid 1px; */
  margin-top: 20px;
}

/* -------------- Food Provider Horizontal List -------------- */
#restaurant-list {
  display: flex;
  max-width: 300px;
  position: relative;
  top: 65px;
}

/* -------------- Restaurant Block Details -------------- */
#restaurant-details {
  display: flex;
  flex-direction: column;
  height: 300px;
  padding-bottom: 10px;
  text-align: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-left: 65px;
  width: 300px;
}

#rating-timing {
  display: flex;
  justify-content: space-around;
}

#create-button {
  width: 60px;
  height: 30px;
  background-color: #ffad42;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

#create-button:hover {
  background-color: #e7a651;
  width: 80px;
}

#rating {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 70px;
}

#timing {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;
}

#star-icon,
#clock-icon {
  color: hsl(34, 76%, 61%);
}

#grabfood {
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
}

#foodpanda {
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 50px;
}

#deliveroo {
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 50px;
}

.create-pools-restaurant-headers {
  color: #f57c00;
  font-weight: 700;
  position: absolute;
}



#info {
  border: none;
  background-color: #ffffff;
}

#restaurant-name {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#main {
  margin-top: 25px;
}
</style>
