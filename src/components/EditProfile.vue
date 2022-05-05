<template>
  <!-- profile options component for profile overview page -->
  <div style="width: 100%;">
    <div style="width: 40%; float: left;"> 
      <button class="openbtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="main-user-logo"
          width="100"
          height="100"
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
        <div class = "main-username">    
          {{this.username}} 
        </div>
      </button>
      <hr id="divider"> 
      <div class="editprofile">
        <div class = "editprofile-text">
          Edit Profile >
        </div>
        <form id="form">
          <div class="formli">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="40"
              fill="currentColor"
              class = "person-circle"
              viewBox="0 0 16 16"
            >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
            </svg>
            <output 
              type="text" 
              id="username" 
              size="50"
            >
              {{this.username}}
            </output>
            <button 
              class="openUsername" 
              v-on:click="openUsername()"
            >
            Update
            </button>
            <div class="popup" id="usernameForm">             
                <input 
                  type="text" 
                  id="username_input"
                  placeholder="Enter new username" 
                  name="username" 
                  v-model="newUsername"
                >  
                <button 
                  class="updateUsername" 
                  v-on:click="updateUsername()"
                  :disabled="!usernameIsValid"
                >Save
                </button>            
                <p class = "errorMsg"
                   v-if="!usernameIsValid">
                   Valid Username is required
                </p>       
            </div>

            <br/>
            <br/>
            <br/>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="40"
              fill="currentColor"
              class="bi bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"
              />
            </svg>
            <output
             type="text" 
             id="username"> 
              {{this.email}}
            </output>
            <button 
              class="openEmail" 
              v-on:click="openEmail()"
            >Update
            </button>
            <div class="popup" id="emailForm">             
                <input 
                  type="text"
                  id="email_input"
                  placeholder="Enter new email" 
                  name="email" required
                  v-model="newEmail"
                > 
                <router-link to="/login"> 
                <button 
                class="resetEmail" 
                v-on:click="updateEmail"
                :disabled="!emailIsValid"
                >Save
                </button>    
                </router-link> 
                <p class = "errorMsg"
                   v-if="!emailIsValid">
                   Valid Email is required
                </p>              
            </div>
            <br/>
            <br/>
            <br/>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="40"
              fill="currentColor"
              class="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
            <output 
              type="text" 
              id="username"> 
              {{this.phonenumber}}
            </output>
            <button 
              class="openPhone" 
              v-on:click="openPhone()"
            >
            Update
            </button>
            <div class="popup" id="phoneForm">             
                <input 
                  type="text" 
                  id="phone_input"
                  placeholder="Enter new phonenumber" 
                  name="phone" 
                  v-model="newPhone"
                >  
                <button 
                class="updatePhone" 
                v-on:click="updatePhone()"
                :disabled ="!phoneIsValid"
                >Save
                </button> 
                <p class = "errorMsg"
                   v-if="!phoneIsValid">
                   Valid Phone is required
                </p>                
            </div>
            <br/>
            <br/>
            <br/>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="40"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              />
            </svg>
            <output 
              type="password" 
              id="username"> 
              ********
            </output>
            
              <button 
              class="resetpassword" 
              v-on:click="togglePopup()"
              >
              Reset
              </button>

            <br/>
            <br/>
            <br/>

            <div class="save">
                <router-link to="/login"> 
                <button
                  id="logout"
                  v-on:click="logout()"
                > 
                Logout
                </button>
                </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Popup v-if="joinBtnClicked" @popupClosed="togglePopup">
      <h4> Reset Password</h4>
      <p>
        Are you sure you want to reset your password? A link will be sent to you!
      </p>
      <router-link to="/login">
      <button class="btn joinBtn" @click="sendPasswordResetEmail">
        Reset Password
      </button>
      </router-link>
    </Popup>
  </div>
</template>

<script>
import Popup from "./Popup.vue";
import {
  doc,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, 
  onAuthStateChanged, 
  signOut, 
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  components: {
    Popup,
  },
  data() {
    return {
      user:false,
      username:"",
      newUsername: "",
      address: "",
      list:[],
      email: "",
      phonenumber:"",
      newEmail: "",
      newPhone: "",
      joinBtnClicked: true,
    };
  },
  computed: {
    phoneIsValid() {
      if (
        this.newPhone && this.newPhone.length >= 8
      ) {
        console.log("Valid Phone Number");
        return true;
      }
      console.log("Invalid Phone Number");
      return false;
    },
    usernameIsValid() {
      if (
        this.newUsername
      ) {
        console.log("Valid Username");
        return true;
      } 
      console.log("Invalid Username");
      return false;
    },
    emailIsValid() {
      if (
        this.validEmail(this.newEmail) && this.email != this.newEmail
      ) {
        console.log("Valid Email");
        return true;
      } 
      console.log("Invalid Email");
      return false;
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.username = this.getUsername(this.user);
        this.email = this.getEmail(this.user);
        this.phonenumber = this.getPhoneNumber(this.user);
        this.togglePopup();
      }
    });
    
  },

  methods: {
    togglePopup() {
      this.joinBtnClicked = !this.joinBtnClicked;
      // console.log(this.joinBtnClicked)
    },
    //Validate email
    validEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    sendPasswordResetEmail() {
      alert("An email will be sent to you to reset your password!");
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email).then(() => {
        console.log('Email sent');
      }).catch((error) => {
        console.log(error);
      })
    },
    
    updateEmail() {
      alert("Please use your new email to sign in again")
      const auth = getAuth();
      this.email = this.newEmail;
      const docRef = doc(db, "Users", auth.currentUser.uid);
      updateEmail(auth.currentUser, this.newEmail).then(() => {
        updateDoc(docRef, {Email: this.newEmail});
        console.log('Email changed');
        // Email change.
      }).catch((error) => {
        // An error happened.
         alert(error)
         console.log(error);
       });
    },
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
    async openUsername() {
      document.getElementById("usernameForm").style.display = "block";
    },

    async openEmail() {
      document.getElementById("emailForm").style.display = "block";

    },
    async openPhone() {
      document.getElementById("phoneForm").style.display = "block";
    },
    
    async getEmail(user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        let z = await getDoc(docRef);
        this.email = z.get("Email");
        console.log("Succesfully retrieve Email");
      } catch (error) {
        console.error("Error getting email: ", error);
      }
    },
    async getPhoneNumber(user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        let z = await getDoc(docRef);
        this.phonenumber = z.get("Phone");
        console.log("Succesfully retrieve Phone Number");
      } catch (error) {
        console.error("Error getting phone number: ", error);
      }
    },
    async updateUsername() {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {Username: this.newUsername});
        
        this.username = this.newUsername
        window.location.reload();
        console.log("Succesfully updated username")
        this.$emit("modified");
        
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async updatePhone() {
      try {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(docRef, {Phone: this.newPhone});
        this.phone = this.newPhone
        console.log("Succesfully updated phone")
        this.$emit("modified");
        window.location.reload();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  },
};
</script>

<style scoped>

.errorMsg {
  color: red;
  margin-bottom: 1px;
  position: relative;
  left: 20px;
  margin-left:45px;
  margin-top:10px;
}

/* The popup form - hidden by default */
.popup {
  display: none;
}

#divider {
  position: relative;
  height: 2px;
  left: 50px;
  bottom: 30px;
}

/* ------- Main user logo and name ------- */
#main-user-logo {
  position: relative;
  left: 50px;
}

.main-username {
  position: relative;
  bottom: 65px;
  left: 190px;
  font-size: 25px;
  color: black;
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.openbtn {
  border: none;
  background: transparent;
}

/* ------- Edit Profile ------- */
.editprofile {
  position: relative;
  left: 100px;
  bottom: 10px;
}

.editprofile-text {
  position: relative;
  bottom: 20px;
}

#form .formli #username,
#email,
#phonenumber,
#password,
#verifypassword {
  background: rgba(99, 164, 255, 0.13);
  border: none;
  border-radius: 5px;
  text-align: left;
  /* font-size: 18px; */
  height: 40px; 
  position: relative;
  bottom: 2px;
  width: 60%;
  padding-left: 10px;
  padding-top: 5px;
}

.bi-telephone-fill,
.person-circle,
.bi-envelope-fill,
.bi-lock-fill{
  background: rgba(99, 164, 255, 0.13);
  color: #63a4ff;
  border-radius: 10px;
  position: relative;
  margin-right: 10px;
  bottom: 5px;
}

/* ------- Update Button ------- */
.openUsername, .openEmail, .openPhone, .resetpassword {
  background: rgba(99, 164, 255, 0.13);
  border-radius: 10px;
  border: none;
  color: rgba(0, 68, 255, 0.795);
  height: 40px;
  width: 100px;
  position: relative;
  left: 10px;
  bottom: 2px;
}

.openUsername:hover, .openEmail:hover, .openPhone:hover, .resetpassword:hover {
  border: 2px solid #63a4ff;
}

#username_input, #email_input, #phone_input {
  background: rgba(99, 164, 255, 0.13);
  border-radius: 5px;
  position: relative;
  left: 60px;
  top: 5px;
  height: 40px;
  padding-left: 10px;
  width: 200px;
  border: none;
}

.resetEmail, .updateUsername, .updatePhone {
  background: rgba(99, 164, 255, 0.13);
  color: rgba(0, 68, 255, 0.795);
  border-radius: 5px;
  position: relative;
  left: 80px;
  top: 5px;
  border: 1px solid rgba(99, 164, 255, 0.1);
  height: 40px;
  width: 70px;
}

/* ------- Logout Button ------- */
#logout {
  position: relative;
  border-radius: 5px;
  border: 5px black;
  width: 150px;
  height: 40px;
  left: 200px;
  background-color: rgba(99, 164, 255, 0.13);
  color: rgba(0, 68, 255, 0.795);
  font-size: 20px;
}

#logout:hover {
  transition: all 0.5s;
  cursor: pointer;
}

#logout span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#logout span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#logout:hover span {
  padding-right: 20px;
}

#logout:hover span:after {
  opacity: 1;
  right: 0;
}

.joinBtn {
  background-color: #ffad42;
  border-radius: 15px;
  color: #ffffff;
  font-weight: bold;
}
</style>