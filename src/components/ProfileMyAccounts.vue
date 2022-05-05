<template>
  
  <div id="right-component"> 
    <p class="myaccount">My Account ></p>
    <div class="favouriteres">
      <router-link to="/favrestaurant">
        <img class = "image1" src ="../assets/food-restaurant.png" alt = ""/>
        <div class = "ViewFavouriteRestaurant"> View Favourite Restaurants </div>
      </router-link>
    </div>
    <hr class="dividers"/>
    <div class="recentorders">
      <router-link to="/recentorders">
        <img class = "image2" src ="../assets/recentorders.png" alt = ""/>
        <div class = "ViewRecentOrders"> View Recent Orders</div>
      </router-link>
    </div>
    <hr class="dividers"/>
    <div class="addresses">
      <router-link to="/address">
        <img class = "image3" src ="../assets/manageaddresses.png" alt = ""/>
        <div class = "ManageAddresses"> Manage Addresses</div>
      </router-link>
    </div>
    <hr class="dividers"/>
    <div class="candr">
      <router-link to="/challengesandrewards">
        <img class = "image4" src ="../assets/trophy.png" alt = ""/>
        <div class = "ChallengesAndRewards"> Challenges and Rewards</div>
      </router-link>
    </div>
    <hr class="dividers"/>
    <div class="invite">
      <router-link to="/invitefriends">
        <img class = "image5" src ="../assets/gift-box.png" alt = ""/>
        <div class = "InviteFriends"> Invite Friends</div>
      </router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
/* ----------- Main Div Block ----------- */
#right-component {
  margin-left: 50%;
  margin-right: 50px;
}

/* ----------- Images ----------- */
.image1, .image2, .image3, .image4, .image5 {
  padding: 0px 0px 0px 0px;
  width: 75px;
  height: 75px;
  float: left;
  position: relative;
  left: 10px;
  top: 5px;
}

/* ----------- My Account Options Link, Hover ----------- */
.InviteFriends:hover, 
.ChallengesAndRewards:hover, 
.ManageAddresses:hover, 
.ViewRecentOrders:hover, 
.ViewFavouriteRestaurant:hover {
  color: #ecda35;
  cursor: pointer;
}

.InviteFriends, .ChallengesAndRewards, .ManageAddresses, .ViewRecentOrders, .ViewFavouriteRestaurant  {
  color: #63a4ff;
  padding: 5% 20%;
  font-size: 18px;
  position: relative;
  bottom: 15px;
}

/* ----------- My Account Link ----------- */
.myaccount {
  color: #63a4ff;
  opacity: 1;
}

.myaccount:hover {
  color: #ecda35;
  cursor: pointer;
}

/* ----------- My Account Image ----------- */
.editprofile {
  padding: 20px 5px;
  cursor: pointer;
  color: grey;
}

.openbtn {
  cursor: pointer;
  color: #63a4ff;
  background-color: white;
  border: none;
}

.openbtn:hover {
  color: #ecda35;
  cursor: pointer;
}

/* ----------- My Account Image ----------- */
.dividers {
  height: 2px;
  color: grey;
}
</style>