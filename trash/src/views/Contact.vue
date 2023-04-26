<template>
  <h2>Contact Us</h2>
  <br />

  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <p align="left">
         
            If you have any questions or comments about our app, please don't
            hesitate to contact us using the form below.
         
        </p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control input-field-shadow"
              id="name"
              v-model="form.name"
              placeholder="Enter your name"
            />
          </div>
          <br />
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control input-field-shadow"
              id="email"
              v-model="form.email"
              placeholder="Enter your email address"
            />
            <br />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              class="form-control input-field-shadow"
              id="message"
              v-model="form.message"
              rows="5"
            ></textarea>
          </div>
          <br />

          <button type="submit" class="submit-button">Submit</button>
          <div v-if="mailSending">
            <p>Sending the mail</p>
            <i class="fa fa-spinner fa-spin"></i>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
export default {
  data() {
    return {
      mailSending: false,
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        this.mailSending = true;
        const response = await axios.post(
          baseUrl + "/help_mail",
          // "https://aiimagegeneratorfinal-production.up.railway.app/help_mail/",
          this.form,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.message === "Email sent successfully") {
          this.mailSending = false;
          alert("Mail sent!");
          this.form.name = "";
          this.form.email = "";
          this.form.message = "";
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.input-field-shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.submit-button {
  color: white;
  width: 60px;
  height: 36px;
  font-family: "Poppins", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  box-sizing: border-box;
  width: 148px;
  height: 52px;
  left: 1228px;
  z-index: 999;
  top: 17px;
  background: linear-gradient(
    266.45deg,
    #f990f7 -50.37%,
    #4a86ef 102.5%,
    #643eec 122.97%
  );
  border: 1px solid white;
  border-radius: 8px;
}
</style>
