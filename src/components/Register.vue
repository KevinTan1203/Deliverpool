<template>
  <div class="logo-container">
    <img clas="logo" src="../assets/deliverpool.png" alt="">  
  </div>
  <div id="horizontal-rule"></div>
  <div id="container">
    <div id="donut">
      <strong>WELC<img src="../assets/donut.png" alt="">ME!</strong> 
    </div>
    <p class="tag-line">Orders don't have to be made alone</p>

    <form id="form">
      <div class="formli">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <input 
          type="text" 
          id="username"
          v-model="userData" 
          placeholder="Enter Username"
          size="50"/>
        <br/>
        <br/>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
        </svg>
        <input 
          type="email" 
          id="email"
          v-model="emailData" 
          placeholder="Enter email"
          size="50"/>
        <br/>
        <br/>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
        </svg>
        <input 
          type="text" 
          id="phonenumber"
          v-model="phoneData" 
          placeholder="Enter Phone Number"
          size="50"/>
        <br/>
        <br/>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
        <input 
          type="password" 
          id="password"
          minlength="8" 
          v-model="passwordData" 
          placeholder="Enter Password (min 8 characters and numbers)"
          size="50"/>
        <br/>
        <br/>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
        <input 
          type="password" 
          id="verifypassword"
          minlength="8" 
          v-model="cfmPasswordData" 
          placeholder="Confirm Password"
          size="50"/>
        <br/>
        <br/>
        <div class="save">
          <button id="signup" type="button" v-on:click="register()"><span><strong>SIGN UP</strong></span></button>
        </div>
      </div>
    </form>

    <div class="background-images-1">
      <img src="../assets/woman1.png" alt="">
    </div> 
    <div class="background-images-2">
      <img src="../assets/woman2.png" alt="">
    </div> 
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      userData: "",
      emailData: "",
      phoneData: "",
      passwordData: "",
      cfmPasswordData: "",
    };
  },

  methods: {
    //Creating user in firebase
    register() {
      createUserWithEmailAndPassword(auth, this.emailData, this.passwordData)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          alert(user);
          savetofs(user, this.userData, this.emailData, this.phoneData);
          this.$emit("loggedin");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
          // ..
        });

      //saving user's account information to fs
      async function savetofs(user, username, email, phone) {
        try {
          console.log(username);
          const docRef = await setDoc(doc(db, "Users", user), {
            Username: username,
            Email: email,
            Phone: phone,
          });
          console.log(docRef);
          document.getElementById("myform").reset();
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  border: 3px solid rgb(233, 228, 228, 0.5);
  margin: auto;
  margin-top: 30px;
  width: 700px;
  padding: 10px;
  height: 600px;
  text-align: center;
  box-shadow: 2.5px 2.5px rgb(233, 228, 228, 0.6);
}

label {
  width: 100px;
  display: inline-block;
  text-align: right;
}

/* ------- Logo ------- */
.logo-container {
  height: 60px;
  padding: 30px;
}

.logo {
  position: absolute;
  left: 50px;
}

#horizontal-rule {
  border-top: 3px solid rgb(233, 228, 228, 0.5);
  border: 10;
}

#container #donut {
  font-family: sans-serif;
  font-size: 35px;
  line-height: 100px;
  align-content: center;
  vertical-align: center;
  color: #63a4ff;
}

#donut img {
  margin-right: 2px;
  margin-top: 20px;
  width: 1em;
  height: 1em;
  padding-left: 2px;
}

/* ------- Tag Line ------- */
.tag-line {
  font-family: sans-serif;
  margin-top: -20px;
  font-style: italic;
  line-height: 65px;
  align-items: center;
  vertical-align: top;
  font-size: 25px;
  color: #ffad42;
}

/* ------- Credential Form ------- */
#form .formli #username, #email, #phonenumber, #password, #verifypassword {
  background: rgba(99, 164, 255, 0.13);
  border: none;
  border-radius: 5px;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 20px;
}

.bi-telephone-fill,
.bi-person-circle,
.bi-envelope-fill,
.bi-lock-fill {
  background: rgba(99, 164, 255, 0.13);
  color: #63a4ff;
  border-radius: 5px;
  position: relative;
  top: 13px;
  margin-right: 10px;
}

input:hover {
  box-shadow: 3px 3px rgb(219, 209, 186);
  border-radius: 5px;
}

/* ------- Login Button ------- */
#signup {
  position: relative;
  border-radius: 5px;
  border: 5px white;
  width: 350px;
  height: 20px;
  padding-top: 10px;
  padding-bottom: 25px;
  background-color: #63a4ff;
  color: white;
  font-size: 15px;
}

#signup:hover {
  transition: all 0.5s;
  cursor: pointer;
}

#signup span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#signup span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#signup:hover span {
  padding-right: 20px;
}

#signup:hover span:after {
  opacity: 1;
  right: 0;
}

/* ------- Background Images ------- */
.background-images-1 {
  position: absolute;
  left: 100px;
  top: 550px;
}

.background-images-1 img {
  width: 15em;
  height: 25em;
}

.background-images-2 {
  position: absolute;
  transform: scaleX(-1);
  right: 50px;
  top: 550px;
}

.background-images-2 img {
  width: 25em;
  height: 25em;
}
</style>
