<template>
  <div style="margin-left: 50%; margin-right: 50px;"> 
    <router-link to="/profile">
        <p class="myaccount">My Account </p>
    </router-link>
    <p class ="candf"> &nbsp; > &nbsp; Challenges And Rewards </p>
    <br/>
    <br/>
    <hr/>
    <br/>
    <div class= "container">
        <div class = "first">
            <button class="openbtn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60%"
                    height="60%"
                    fill="#63a4ff"  
                    class="bi bi-person-circle-reward"
                    viewBox="0 0 16 16"
                >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
                </svg>
            <div class = "username">    
                {{this.username}} 
            </div>
            <br>
            </button>
        </div>
        <div class = "second">
            <img class = "bg" src ="../assets/bluebackground.png" alt = ""/>
        </div>

        <div class = "third">
            <img class = "star" src ="../assets/star.png" alt = ""/>
            <br>
            <h5 class="details-points" style="margin-top:10px;"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{this.points}} <b>Points</b></h5>
        </div>

        <div class = "fourth">
            <img class = "fastfood" src ="../assets/fastfood.png" alt = ""/>
            <br>
            <h5 class="details-order" style="margin-top:10px;"> <b>Last Order:</b> <br>{{this.lastorder}} </h5>
        </div>
    </div>
  </div>
</template>

<script>
import {
    doc,
    getDoc,
  getFirestore,
} from "firebase/firestore";
import { getAuth, 
  onAuthStateChanged, 
} from "firebase/auth";
import firebaseApp from "../firebase.js";


const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    data() {
        return {
            username:"",
            lastorder:"",
            points:"",
        }
    },

    mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.username = this.getUsername(this.user);
        this.points = this.getPoints(this.user);
        this.lastorder = this.getLastOrder(this.user);
      }
    });
    },

    methods: {
        async getUsername(user) {
            try {
                const docRef = doc(db, "Users", user.uid);
                let z = await getDoc(docRef);
                this.username = z.get("Username");
                console.log("Succesfully retrieve Username");
            } catch (error) {
                console.error("Error getting username: ", error);
            }
        },
        async getPoints(user) {
            try {
                const docRef = doc(db, "Users", user.uid);
                let z = await getDoc(docRef);
                this.points = z.get("Points");
                console.log("Succesfully retrieve Points");
            } catch (error) {
                console.error("Error getting points: ", error);
            }
        },
        async getLastOrder(user) {
            try {
                const docRef = doc(db, "Users", user.uid);
                let z = await getDoc(docRef);
                this.lastorder = this.parseDate(z.get("LastOrder").toDate());
                console.log("Succesfully retrieve Last Order");
            } catch (error) {
                console.error("Error getting last order: ", error);
            }
        },
        parseDate(date) {
            const monthList = ["January", "February", "March", "April", "May", 
                            "June", "July", "August", "September", "October", 
                            "November", "December"];
            var day = date.getDate()
            var month = monthList[date.getMonth()]
            var hours;
            console.log(date)
            if (date.getHours() == 0) {
                hours = "00"
            } else {
                hours = date.getHours()
            }
            var mins = date.getMinutes()
            return day + " " + month + " " + hours + ":" + mins
        }
    },
}
</script>

<style scoped>
.myaccount, .candf {
    display:inline;
    font-size: 20px;
}

.openbtn {
    padding-left:50px;
    border: none;
    background: transparent;
}

.bg {
    width: 100%;
    height: 280px;
}

.container {
    display:grid;
}

.second {
    padding-top:30px;
}

.first, .second, .third, .fourth{
    grid-area: 1/1;
}

/* ------- User Reward Profile -------- */
.bi-person-circle-reward {
    position: relative;
    top: 65px;
    right: 5%;
}

/* ------- Star and fastfood icons ------- */
.star {
    position: relative;
    left: 53%;
    top: 110px;
    max-height: 20%;
    max-width: 20%;
}

.fastfood {
    position: relative;
    left: 79%;
    top: 110px;
    max-height: 20%;
    max-width: 20%;
}

/* ------- Info Display ------- */
.username {
    position: relative;
    top: 70px;
    right: 5%;
}

.details-points {
    position: relative;
    top: 120px;
    left: 50%;
    font-size: 15px;
    max-width: 200px;
}

.details-order {
    position: relative;
    top: 120px;
    left: 78%;
    font-size: 15px;
    max-width: 200px;
}
</style>