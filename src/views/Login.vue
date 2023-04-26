<template>
  <router-link to="/signup" class="nav-link active" aria-current="page">
    <button class="theme-outline-button signup-button">
      <span class="outline-text">Signup</span>
      <!-- <img src="../assets/enhance-arrow.png" alt="" class="signup-arrow" /> -->
    </button>
  </router-link>
  <!-- right side background image -->

  <div class="bg-image"></div>
  <!-- <p class="bg-image-text">Quicker medical summaries and responses to patients lead to better satisfaction.</p> -->
  <p class="bg-image-text">"The healthcare industry is ripe for disruption and AI is poised to be a driving force." <br/> - Dr. Eric Topol</p>
  <!-- form to left side -->
  <div class="leftside-form">
    <!-- <br /><br /><br /><br /> -->
    <h1>Login</h1>
    <form @submit.prevent="login" method="post">
      <center>
        <div class="form-group">
          <label for="emailInput" class="formLabels">Email address</label>
          
          <div class="col-sm-5">
            <input
              required
              type="email"
              class="form-control"
              id="emailInput"
              v-model="username"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />

            <!-- <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              > -->
          </div>
        </div>
        <div class="form-group">
          <label for="passwordInput" class="formLabels">Password</label>
          <div class="col-sm-5">
            <input
              required
              type="password"
              class="form-control"
              id="passwordInput"
              v-model="password"
              placeholder="Password"
            />
          </div>
        </div>
      </center>
      <br />
      <p v-if="loginValidationMessage">
        {{ this.loginValidationMessage }}
      </p>
      <br />
      <button type="submit" class="submit-button" role="button">Submit</button>
    </form>
  </div>
</template>
<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import axios from "axios";
import Cookies from "js-cookie";
import router from "../router/index.js";
export default {
  setup() {},
  data() {
    return {
      username: "",
      password: "",
      accessToken: null,

      loginValidationMessage: null,
    };
  },

  computed: {},
  mounted() {
    this.checkCookieUpdate();
  },
  methods: {
    checkCookieUpdate() {
      var accessToken = Cookies.get("access_token");

      return axios
        .get(
          // "http://localhost:8000/login_check/",
          baseUrl + `/login_check/`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // handle the response from the server

          if (response.data["status"] == "logged in") {
            const redirectPath = this.$route.query.redirect || "/";
            console.log(redirectPath)
          router.push(redirectPath);

            // router.push("/");
          }
        })
        .catch((error) => {
          // handle the error
          console.log(error);
        });
    },

    setCookie() {
      // set an HTTP-only cookie with the 'access_token' value
      Cookies.set("access_token", this.accessToken, { secure: true });
      // retrieve the 'access_token' cookie value
    },
    login() {
      axios
        .post(
          // "http://localhost:8000/token",
          baseUrl + `/token`,
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )

        .then(
          (response) => {
            // handle the response from the server
            if ("access_token" in response.data) {
              this.accessToken = response.data["access_token"];

              this.setCookie();

              // redirect to the home view
              const redirectPath = this.$route.query.redirect || "/";
            console.log(redirectPath)
          router.push(redirectPath);
            }
          },
          (error) => {
            // console.log(error);
            console.log(
              "login went to error_________________",
              error.response.data
            );
            this.loginValidationMessage = error.response.data["detail"];

            // handle the error
          }
        );
    },
  },
};
</script>

<style>
.formLabels {
  font-size: 5;
  font-family: Arial, sans-serif;
  color: "grey";
  padding: 20px;
}

.signup-button {
  /* float: left; */
  right: 5%; /* 1255 / container width * 100% */
  top: 2%;
  z-index: 999;
  position: fixed;
  display: flex;
  /* width:55px; */
}

@media (max-width: 768px) {
  .signup-button {
    left: 58% !important;
    top: 18px;
    z-index: 1000;
    /* padding:10px; */
    padding:0px;
    /* text-align: center; */
     display: flex;
  align-items: center;
  }
  
  .theme-outline-button {
    width: 58px;
    height: 32px;
    padding: 5px;
  }
  .signup-arrow {
    display: none;
  }
  .bg-image {
    display: none;
  }
  .bg-image-text {
    display: none;
  }
}

@media (min-width: 1140px) {
  .bg-image {
    background-image: url("/src/assets/login2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    /* background-position: center center; */
    position: fixed;
    top: 0;
    left: 0%;
    width: 70%;
    height: 100%;
    object-fit: cover;
    z-index: 3;
    background-color:#3b2667;
  }

  /* body{
    overflow: hidden;
  } */

  .bg-image-text {
    left: 50%;
    bottom: 5%;
    font-size: 20px;
    font-weight: 600;
    /* text-align: right; */
    font-family: "Poppins", sans-serif;
    text-shadow: 15px 15px 15px rgba(0, 0, 0, 19);
    position: fixed;
    /* height: 100vh; */
    z-index: 4;
    text-align: right;
  }

  .leftside-form {
    background-color: rgb(107, 53, 155);
    color: black;
    /* float: left; */
    width: 35%;
    position: fixed;
    right: 0;
    top: 0;
    padding-top:9%;
    padding-left: 5%;
    height: 100vh;
    z-index: -3;
  }
    .leftside-form h1,.leftside-form label,.leftside-form p{
    /* background-color: rgb(107, 53, 155); */
    color: black;
    
  }
}



</style>
