<template>
  <NavBar @emitPostalCode="updatePostalCode" />
  <div class="container-fluid m-0">
    <div class="row gx-3">
      <div id="filter" class="col-2">
        <PlatformFilter @updatePlatform="updatePlatform" />
        <button id="reset-filter" @click="reset">Reset Filter</button>
      </div>
      <div class="col" id="open-pools">
        <OpenPools :filterData="this.filterData" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import OpenPools from "@/components/OpenPools.vue";
import PlatformFilter from "../components/PlatformFilter.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "JoinPools",

  components: {
    NavBar,
    OpenPools,
    PlatformFilter,
  },

  data() {
    return {
      user: false,
      filterData: {
        platform: "",
        address: "",
      },
    };
  },

  methods: {
    change(x) {
      this.location = x;
    },
    reset() {
      location.reload();
    },
    updatePlatform(newdata) {
      // this.filterData.platform = newdata;
      const newObj = {};
      newObj["platform"] = newdata;
      newObj["address"] = this.filterData.address;
      this.filterData = newObj;
      console.log("updating");
    },
    updatePostalCode(newdata) {
      const newObj = {};
      newObj["platform"] = this.filterData.platform;
      newObj["address"] = newdata;
      this.filterData = newObj;
      console.log("xxxx");
      console.log(this.filterData);
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style scoped>
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

#filter {
  border-right: 2px solid rgba(216, 216, 216, 0.58);
  height: 80vh;
}

#open-pools {
  padding-left: 20px;
}
</style>
