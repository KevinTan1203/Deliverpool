<template>
  <div class="logo-container">
    <router-link to="/">
      <img class="logo" src="../assets/deliverpool.png" alt="" width="500" />
    </router-link>
  </div>
  <hr />
  <div id="container">
    <form id="form">
      <div class="donut">
        <strong>WELC<img src="../assets/donut.png" alt="" />ME BACK!</strong>
      </div>
      <p class="tag-line">Orders don't have to be made alone</p>
      <form class="credentials">
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
        <input
          type="email"
          id="email"
          v-model="emailData"
          placeholder="Email"
          size="35"
        /><br /><br />

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
        <input
          type="password"
          id="password"
          v-model="passwordData"
          placeholder="Password"
          size="35"
        /><br /><br />

        <div class="forgot-password">
          <a id="password-retrieval" href="" @click="sendPasswordResetEmail"
            >Forgot Password?</a
          >
        </div>
        <p
          class="errorMsg"
          v-if="error == 'Firebase: Error (auth/user-not-found).'"
        >
          No account is registered with this email
        </p>
        <p
          class="errorMsg"
          v-if="error == 'Firebase: Error (auth/invalid-email).'"
        >
          Please enter a valid email
        </p>
        <p
          class="errorMsg"
          v-if="error == 'Firebase: Error (auth/wrong-password).'"
        >
          Wrong password
        </p>
        <p
          class="errorMsg"
          v-if="error == 'Firebase: Error (auth/internal-error).'"
        >
          Please enter your password
        </p>
        <button id="login" type="button" v-on:click="login()">
          <span><strong>LOGIN</strong></span>
        </button>
      </form>
      <p class="tag-line bottom">
        Don't have an account yet? Sign up
        <router-link to="/signup">here</router-link>!
      </p>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      emailData: "",
      passwordData: "",
      error: "",
    };
  },

  computed: {
    //Validate account information
    formIsValid() {
      if (
        this.emailData &&
        this.validEmail(this.emailData) &&
        this.passwordData
      ) {
        return true;
      }
      return false;
    },
  },

  methods: {
    sendPasswordResetEmail() {
      alert("An email will be sent to you to reset your password!");
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.emailData)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },

    login() {
      signInWithEmailAndPassword(auth, this.emailData, this.passwordData)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential.user);
          this.$emit("loggedin");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          this.error = errorMessage;
        });
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: relative;
  bottom: 50px;
}

label {
  width: 100px;
  display: inline-block;
  text-align: right;
}

/* ------- Logo ------- */
.logo-container {
  position: relative;
  height: 60px;
  padding: 30px;
  margin-top: -80px;
  z-index: 1;
}

.logo {
  position: absolute;
  top: 100px;
  left: 50px;
  max-height: 100px;
}

/* ------- Horizontal line ------- */
hr {
  position: relative;
  border-top: 5px solid rgb(233, 228, 228, 0.5);
  top: 110px;
  left: 0;
}

/* ------- Sign up form box ------- */
#form {
  border: 3px solid rgb(233, 228, 228, 0.5);
  position: relative;
  top: 150px;
  margin: auto;
  margin-top: 30px;
  width: 500px;
  padding: 10px;
  height: 550px;
  text-align: center;
  box-shadow: 2.5px 2.5px rgb(233, 228, 228, 0.6);
}

.donut {
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
  position: relative;
  bottom: 12px;
}

.tag-line {
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
.credentials #email,
#password {
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
  height: 48px;
  bottom: 3px;
  width: 60px;
}

input:hover {
  box-shadow: 3px 3px rgb(219, 209, 186);
  border-radius: 5px;
}

.errorMsg {
  color: red;
  font-size: 20px;
  margin-top: 1px;
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
  background-color: #ffad42;
}

/* ------- Forgot password ------- */
.forgot-password {
  margin-right: -300px;
  font-size: 15px;
  padding-bottom: 30px;
  padding-top: 1px;
}

#password-retrieval {
  color: #63a4ff;
}
</style>
