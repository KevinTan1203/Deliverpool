<template>
  <div class="logo-container">
      <img clas="logo" src="../assets/deliverpool.png" alt="">  
  </div>
  <div id="horizontal-rule"></div>
  <div id="container">
    <form id="form">
      <div class="donut">
        <strong>WELC<img src="../assets/donut.png" alt="">ME BACK!</strong> 
      </div>
      <p class="tag-line">Orders don't have to be made alone</p>
        <form class="credentials"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
          </svg>
          <input type="email" id="email" placeholder="Email" size="35"><br><br>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          </svg>
          <input type="text" id="password" placeholder="Password" size="35"><br><br>

          <div class="forgot-password">
            <a id="password-retrieval" href=""> Forgot Password?</a>
          </div>
          <button id="login" type="button" onclick="verifyCredentials()"><span><strong>LOGIN</strong></span></button>
        </form>
        <p class="tag-line bottom">Don't have an account yet? Sign up <router-link to="/signup">here</router-link>!</p>
      </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      emailData: "",
      passwordData: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.emailData, this.passwordData)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert(user);
          this.$emit("loggedin");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
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

/* ------- Sign up form box ------- */
#form {
  border: 3px solid rgb(233, 228, 228, 0.5);
  margin: auto;
  margin-top: 30px;
  width: 500px;
  padding: 10px;
  height: 500px;
  text-align: center;
  box-shadow: 2.5px 2.5px rgb(233, 228, 228, 0.6);
}

.donut {
  font-family: sans-serif;
  font-size: 35px;
  line-height: 100px;
  align-content: center;
  vertical-align: center;
  color: #63a4ff;
}

.donut img {
  margin-right: 2px;
  margin-top: 20px;
  width: 1em;
  height: 1em;
  padding-left: 2px;
}

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

.bottom {
  font-style: normal;
  padding-top: 30px;
  font-size: 20px;
}

/* ------- Credential Form ------- */
.credentials #email, #password {
  background: rgba(99, 164, 255, 0.13);
  border: none;
  border-radius: 5px;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 20px;
}

.bi-envelope-fill,
.bi-lock-fill {
  background: rgba(99, 164, 255, 0.13);
  color: #63a4ff;
  border-radius: 5px;
  position: relative;
  margin-right: 5px;
  top: 13px;
}

input:hover {
  box-shadow: 3px 3px rgb(219, 209, 186);
  border-radius: 5px;
}

/* ------- Login Button ------- */
#login {
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

#login:hover {
  transition: all 0.5s;
  cursor: pointer;
}

#login span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#login span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#login:hover span {
  padding-right: 20px;
}

#login:hover span:after {
  opacity: 1;
  right: 0;
}

/* ------- Forgot password ------- */
.forgot-password {
  font-family: sans-serif;
  margin-right: -300px;
  font-size: 15px;
  padding-bottom: 30px;
  padding-top: 1px;
}

#password-retrieval {
  color: #63a4ff;
}
</style>
