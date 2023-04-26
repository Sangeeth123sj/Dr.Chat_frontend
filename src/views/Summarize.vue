<template>
  <div>
    <!-- login button -->
    <router-link to="/login" class="nav-link active" aria-current="page">
    <button class="theme-outline-button login-button">
      <span class="outline-text">Login</span>
      <!-- <img src="../assets/enhance-arrow.png" alt="" class="signup-arrow" /> -->
    </button>
  </router-link>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-8">
          <ReportInput />
        </div>
        <div class="col-sm-4 col-md-4 mobile-padding">
          <ChatBox />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportInput from "../components/ReportInput.vue";
import ChatBox from "../components/ChatBox.vue";
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import Cookies from "js-cookie";
import axios from 'axios';
import router from "../router/index.js";

export default {
  mounted(){
    // this.loginChecker()
  },
  methods:{
    loginChecker() {
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
            router.push("/summary");
          }
        })
        .catch((error) => {
          // handle the error
          console.log(error);
          router.push("/login")
        });
    },

  },
name: "Summarize",
components: {
ReportInput,
ChatBox,
},
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.align-logo{
  display: inline-block;
}

@media screen and (max-width: 575px) {
  .mobile-padding {
    padding-top: 100px; /* 10px top and bottom padding */
  }
}


 /* login button styling */
  .login-button {
    /* float: left; */
    right: 5%; /* 1255 / container width * 100% */
    top: 15px;
    z-index: 999;
    position: absolute;
    /* display: flex; */
    /* width:55px; */
  }


@media (max-width: 768px) {
    .login-button {
      right: 98px !important;
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
}
</style>