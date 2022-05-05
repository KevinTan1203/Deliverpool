<template>
  <div style="margin-left: 50%; margin-right: 50px;"> 
    <router-link to="/profile">
        <p class="myaccount">My Account </p>
    </router-link>
    <p class ="invitefriends"> &nbsp; > &nbsp; Invite Friends </p>
    <br>
    <br>
    <hr>
    <br>
    <div class="inv">
        <img class = "inv" src ="../assets/invitefriends.png" alt = ""/>
        <br>
        <p class = "invf1"> Invite Friends to Join Deliverpool! </p> 
        <p class = "invf2"> Don't miss out the fun! </p> 
            <button 
            id="share" 
            style="margin-left:38%"
            v-on:click="copylink()"
            > Share your Link </button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        copylink() {
            let site = "https://deliverpoll.web.app"
            navigator.clipboard.writeText(site).then(
            function () {
                alert("Copied invite link successfully!");
            },);
        }
    }

}
</script>

<style scoped>
.inv {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 467px;
    height: 369px;
    align-content: center;
}

.invf1 {
    margin-left: auto;
    margin-right: auto;
    width: 16em;
    font-size: 30px;
    color: darkblue;
    text-align: center;
}

.invf2 {
    margin-left: auto;
    margin-right: auto;
    width: 16em;
    font-size: 20px;
    color:#63a4ff;
    text-align: center;
}


.myaccount, .invitefriends {
    display:inline;
    font-size: 20px;
}

#share {
    border-radius: 5px;
    border: 5px black;
    width: 200px;
    height: 20px;
    padding-bottom: 25px;
    background-color: #63a4ff;
    color: white;
    font-size: 15px;
    position: relative;
    right: 45px;
}
</style>