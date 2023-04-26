<template>

  <!-- <div class="chat">
    <div class="chat-box">
      <div class="message-container" v-for="message in messages">
        <div class="message" :class="{ 'message-sent': message.sent }">
          {{ message.text }}
        </div>
      </div>
      <div class="message-form">
        <textarea v-model="newMessage" @keyup.enter="sendMessage" rows=20></textarea>
        <br/><br/>
        <button @click="sendMessage" class="btn btn-primary">Send</button>
      </div>
    </div>
  </div> -->
  <br/>
  <h2>Q & A</h2>
<div class="rectangle mobile-padding">
  <div class="message-area">
    <br/>
    <strong class="answer-align">{{this.answer}}</strong>
  </div>
  <div class="input-area mobile-accomodate-input">
    
    <form @submit.prevent="submitForm">
       
    <input type="text" v-model="question" class="input-field mobile-margin" placeholder="chat">
   
    <button>Send
      <div v-if="loadingAnswer" >
            <i class="fa fa-spinner fa-spin"></i>
          </div>
    </button>
    </form>
  </div>
</div>
</template>

<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import Cookies from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      report: null,
      question:null,
      reportStatus:false,
      answer:null,
      loadingAnswer:false
    };
  },
  methods: {
    submitForm(){
      this.report = window.sessionStorage.getItem('report')
      if (this.report){
        // console.log("text with question:",this.report+`\nQuestion:`+this.question)
        this.loadingAnswer = true;
        this.reportStatus = true

                                       axios.post(
                 
                  baseUrl +"/q_and_a/" ,
                                            // "https://healthsnapbackend-production.up.railway.app/q_and_a/",
                                      //       + this.report+`\nQuestion:`+this.question,
                  {
                    text: this.report+`\nQuestion:`+this.question+":\n",
                  },
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  }
                )


                  .then((response) => {
                                return response.data;
                              })
                              
                              .then((data) => {
                                // console.log(data["answer"]);
                                              
                                            
                                this.answer = data["answer"];
                                this.loadingAnswer = false;
                              });



                  (error) => {
                    
                    console.log(error);
                            console.log(error);
                            this.answer = "Something went wrong please try again."
                            this.loadingAnswer = false;
                    

                    // handle the error
                  }
      }
      else{
          this.answer = "Please submit and summarize the report first."
          
      }
    },
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        sent: true
      });
      this.newMessage = "";
    }
  },
  mounted(){
    window.localStorage.removeItem('report');
    
  },
};
</script>
  
  <style>

.rectangle {
  width: 100%;
  height: 77%;
  border: 1px solid black;
  position: relative;
  border-radius:5px;
  background-color: white;
  /* background-color: white; */
}

.message-area {
  width: 100%;
  height: 85%;
  overflow: scroll;
color:black;
}

.message-area::-webkit-scrollbar {
  background-color: #6f86a0;
  width: 0.1em;
}

.message-area::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 0.5em;
}

.input-area {

  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
}

.input-field {
       /*  */
  background-color: white;
  flex-grow: 1;
  padding: 10px;
  border: 2px;
  border-color: black;
  border-radius: 10px;
  margin-right: 10px;
  outline: 3px solid black;
  color: black;
}

.send-btn {
  background-color: blue;
  color: white;
  
  border: none;
  border-radius: 10px;
  cursor: pointer;
  

}

.chatbox-input button {
  padding: 5px 10px 5px 10px;
  margin: 30px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
textarea {
width: 100%; /* or any desired width in pixels or percentage */
}
.answer-align{
  float: left;
  padding: 10px;
  color:black;
}


@media screen and (max-width: 575px) {
  .mobile-padding {
    padding-bottom: 50px;   
  }
  .mobile-margin{
    margin-bottom: 60px;
    flex-grow: 1;
  padding: 10px;
  padding-right: 1px;
  width:80%;
  }

}
</style>
