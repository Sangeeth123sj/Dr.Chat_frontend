<template>
<div class="no-overflow">
  <!-- right side background image -->
  <div class="bg-image2"></div>
  <p class="bg-image-text">Experience the future of healthcare with AI summarization and expert recommendations.</p>
  <!--  -->
  <!-- form to left side -->
  <div class="leftside-form">
    <!-- <br /><br /><br /><br /> -->
    <h1>Sign-up</h1>
    <form @submit.prevent="onSubmit">
      <center>
      <div class="form-group">
        <label for="usernameInput" class="formLabels">Username</label>
        <div class="col-sm-5">
          <input
            required
            v-model="form.username"
            type="text"
            class="form-control"
            id="usernameInput"
            aria-describedby="emailHelp"
            placeholder="Username"
          />
        </div>
        <label for="emailInput" class="formLabels">Email address</label>
        <div class="col-sm-5">
          <input
            required
            v-model="form.email"
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="fullName" class="formLabels">Fullname</label>
        <div class="col-sm-5">
          <input
            required
            v-model="form.full_name"
            type="text"
            class="form-control"
            id="fullName"
            placeholder="Fullname"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="passwordInput" class="formLabels">Password</label>
        <div class="col-sm-5">
          <input
            required
            v-model="form.password"
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
          />
        </div>
      </div>
      <p v-if="validationMessage">{{ this.validationMessage }}</p>
      <br /><br />
      <button type="submit" class="submit-button" role="button">Submit</button>
      </center>
    </form>
  </div>
</div>
</template>
<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import axios from "axios";
import router from "../router/index.js";
export default {
  data() {
    return {
      validationMessage: null,
      form: {
        username: "",
        email: "",
        full_name: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await axios.post(
          // "http://localhost:8000/signup",
          baseUrl + `/signup`,
          this.form,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response.data);
        if (response.data["signup_status"] == "success") {
          router.push("/login");
        } else {
          console.log("entered else");
          this.validationMessage = response.data["signup_status"];
        }
      } catch (error) {
        this.validationMessage = "oops something went wrong! please contact us";
      }
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

@media (max-width: 1140px) {
  .bg-image {
    display: none;
  }
  .bg-image-text {
    display: none;
  }
}

@media (min-width: 1140px) {
  .bg-image2 {
    background-image: url("../assets/medical_desk.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    /* background-position: center center; */
    position: fixed;
    top: 0;
    left: 0%;
    width: 70%;
    height: 100%;
    /* object-fit: cover; */
    z-index: 3;
    background-color:#3b2667;
  }

 


  .bg-image-text {
    left: 2%;
    bottom: 5%;
    font-size: 20px;
    /* text-align: right; */
    font-family: "Poppins", sans-serif;
    color: white;
    position: fixed;
  }

  .leftside-form {
    background-color: white;
    float: left;
    width: 35%;
    position: fixed;
    right: 0;
    top: 0;
    padding-top:9%;
    height: 100vh;
    z-index: 1;
  }
}
</style>
