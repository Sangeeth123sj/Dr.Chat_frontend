<template>
  <div class="container-fluid">
    <!-- login button -->
    <router-link to="/login" class="nav-link active" aria-current="page">
      <button class="theme-outline-button login-button">
        <span class="outline-text">Login</span>
      </button>
    </router-link>
    <div class="row mt-5">
      <!-- previous questions column -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-header">Previous Questions</div>
          <div class="card-body overflow-auto chat-history">
            <ul class="list-group">
              <li v-for="(chat, index) in chat" :key="index" class="list-group-item">
               <strong>question:</strong> {{ chat.question }}
                <br/>
               <strong>answer:</strong> {{ chat.answer }}
              </li>
            </ul>
          </div>
        </div>
      </div>

    <!-- question-answer area -->
    <div class="col-md-9">
      <div class="card">
        <div class="card-header">Ask a question</div>
        <div class="card-body">
          <div class="form-group">
            <textarea class="form-control" rows="5" v-model="question"></textarea>
          </div>
          <br/>
          <div class="form-group text-right">
            <button class="btn btn-primary" @click="submitQuestion">Submit</button>
          </div>
        </div>
      </div>

      <!-- chatbot response area -->
      <div class="card mt-4">
        <div class="card-header">Response</div>
        <div class="card-body">
          <div v-if="chat">
            <p><strong>You:</strong> {{ question }}</p>
            <p><strong>Chatbot:</strong> {{ answer }}</p>
          </div>
          <div v-else>{{ response }}</div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import axios from "axios";
import Cookies from "js-cookie";
import router from "../router/index.js";
export default {
  name: "ChatDoc",
  data() {
    return {
      question: "",
      questions: [],
      response: "",
      access_token: "",
      chat: false,
      answer: "",
    };
  },
  
  methods: {
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
    async submitQuestion() {
      // Add the question to the list of previous questions
      // this.questions.push(this.question);

      // Make an API call to get the chatbot's response
      try {
        const response = await fetch(baseUrl+`/chat_doc/?text=`+this.question, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access_token}`,
          }
        });
        const data = await response.json();
        this.answer = data.answer;
        this.chat = data.chat;
      } catch (error) {
        console.log(error);
        this.response = "Error in getting response";
      }
    },
  },

  mounted() {
    // this.access_token = Cookies.get("access_token");
    // this.loginChecker()
  },
};

</script>
<style scoped>
  /* login button styling */
  .login-button {
    right: 5%;
    top: 15px;
    z-index: 999;
    position: absolute;
  }

  /* style for previous questions column */
  .card-header {
    font-weight: bold;
  }

  /* style for question-answer area */
  textarea {
    resize: none;
  }
  h4,p{
    color:black;
    text-align: left;
  }
  strong{
    color:rgb(52, 49, 49)
  }
  .chat-history {
  overflow-y: auto;
   max-height: 400px;
}
</style>
