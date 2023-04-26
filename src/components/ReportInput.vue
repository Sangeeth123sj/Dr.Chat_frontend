<template>
<br/>
<div class="input-report">
    <form @submit.prevent="submitForm">
      
 <div v-if="loadingResult" >
            <strong>Creating a summary..</strong>
          </div>
      <div v-if="summarized">
        <h2>Summary <button id="copy-button" type="button"  @click="copyText">COPY </button></h2>
      </div>
            <div v-if="!summarized">
        <h2>Enter Medical report</h2>
      </div>

      <!-- select input type -->
        <div class="radio-container">
          <input type="radio" id="gmail" name="contact" class="radio-button" value="text" v-model="inputType"/>
          <label for="gmail" class="radio-label right-tile" :class="{ 'selected': medium === 'gmail' }">text input</label>
          <input type="radio" id="linkedin" name="contact" class="radio-button" value="file" v-model="inputType"/>
          <label for="linkedin" class="radio-label left-tile" :class="{ 'selected': medium === 'linkedin' }">file input</label>
        </div>



      <div v-if="inputType == `file`">
        <div class="file-upload-input dark-text">
          <input
              type="file"
              ref="fileInput"
              id="file-upload"
              class="upload-styling"
              accept=".pdf, .doc, .docx, .xls, .xlsx"
              @change="onFileSelected"
              required
            />
          <p class="dark-text">Accepts .pdf, .doc, .docx, .xls, .xlsx</p>
        </div>
      </div>
      <div v-if="inputType == `text`">
        <textarea
          class="black-border"
          rows="17"
        
          type="text"
          v-model="text"
          placeholder="input the Report"
          required
        />
      </div>
      

      <br />
       
      
      <button type="submit" class="left-submit-button" role="button">
        Submit <div v-if="loadingResult" >
            <i class="fa fa-spinner fa-spin"></i>
          </div>
      </button>
      
      <button type="button" @click="revertToReport" class="left-back-report-button">Back to report</button>
      
    </form>
    <br/><br/>
    <div v-if="!loadingResult && formSubmitted" class="specifics">
      <ul>
       <li><strong>Keywords:</strong> <div v-if="loadingRelateds" >
            <i class="fa fa-spinner fa-spin"></i>
          </div> <div v-else> <p>{{ this.keywords }}</p> </div> </li>

       <br/>
          <li><strong>Related Medicines:</strong> <div v-if="loadingRelateds" >
            <i class="fa fa-spinner fa-spin"></i>
          </div> <div v-else> <p>{{ this.medicines }}</p> </div></li>
          <br/>
          <li><strong>Suggested Lifestyle:</strong><div v-if="loadingRelateds" >
            <i class="fa fa-spinner fa-spin"></i>
          </div> <div v-else> <p>{{ this.lifestyle }}</p> </div></li>
          <br/>
        </ul>
    </div>

</div>
</template>
<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import Cookies from "js-cookie";
import axios from 'axios';
export default {
  data() {
    return {
      initialPrompt:null,
      loadingResult: false,
      loadingRelateds: false,
      text: "",
      formSubmitted: false,
      keywords: null,
      medicines: null,
      lifestyle: null,
      summarized: false,
      copied: false,
      inputType: "text",
      medicalReportFile: null,
      accessToken: null
      
    };
  },

  mounted(){
    this.accessToken = Cookies.get('access_token');
  },
  methods: {

    
    copyText() {
      navigator.clipboard.writeText(this.text);
      this.copied = true;
      // setTimeout(() => {
      //   this.copied = false;
      // }, 2000);
       const button = document.getElementById("copy-button");
        if (button) {
          button.innerText = "Copied!";
          setTimeout(() => {
            this.copied = false;
            button.innerText = "Copy";
          }, 2000);
        }
    },
    revertToReport(){
      this.text = this.initialPrompt;
      this.summarized = false;
      this.copied = false;
    },

    onFileSelected() {
    this.medicalReportFile = event.target.files[0];
    let formData = new FormData();
    formData.append('file', this.medicalReportFile);
    this.keywords = null                       
    this.medicines = null
    this.lifestyle = null
    axios.post(baseUrl+'/file_read', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      this.text = response.data.text;
      this.inputType="text";
    })
    .catch(error => {
      console.log(error);
    });
  },

    submitForm: function () {
      this.formSubmitted = true;
      this.loadingResult = true;
      this.loadingRelateds = true;
      // console.log(this.loadingResult)

                        
      axios.post(
          baseUrl + "/summarize/",
          {
            text: this.text,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            if (
              data.error &&
              data.error.detail === "Input text exceeds max characters limit: 50000"
            ) {
              this.text = `Sorry ${data.error.detail}. Please contact us for summarizing large reports.`;
              this.loadingResult = false;
            } else {
              // console.log("Entered Else");
              this.initialPrompt = this.text;
              this.text = data["summary"];
              console.log("summary", this.text);
              this.loadingResult = false;
              this.summarized = true;
              // Cookies.set("report", this.text);
              window.sessionStorage.setItem("report", this.text);
              // console.log("cookie report:", window.sessionStorage.getItem("report"));
              // console.log("this.text", this.text);

              // Add another axios.post request to hit the /infer/ endpoint
              axios
                .post(
                  baseUrl + "/infer/",
                  {
                    text: this.text,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.accessToken}`,
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  }
                )
                .then((response) => {
                  const { data } = response;
                  this.keywords = data["keywords"];
                  console.log("keywords", this.keywords);
                  this.medicines = data["medicines"];
                  console.log("medicines", this.medicines);
                  this.lifestyle = data["lifestyle"];
                  console.log("lifestyle", this.lifestyle);
                  this.loadingRelateds = false;
                })
                .catch((error) => {
                  console.log(error);
                  this.text = "Something went wrong. Please try again";
                  this.loadingRelateds = false;
                });
            }
          })
          .catch((error) => {
            console.log(error);
            this.text = "Something went wrong. Please try again";
            this.loadingResult = false;
          });
                        

    }
                
              
              
            

    
  },

 

  computed: {
    
    
    
  },
};
</script>

<style>
/* CSS */
.black-border {
    border: 3px solid black;
    border-radius: 6px;
    background-color:  white;;
}
textarea{
    border:#6f86a0;
    border:3px;
    top:10%;
}

input[type="range"] {
  filter: lime;
}

.rangers {
  align-items: justify-content;
}
.button-3 {
  float: left;
    background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}



.image_count {
  font-size: 2px;
}

/* Styling the button */
.advanced-btn {
  cursor: pointer;
  border: 1px solid #3498db;
  background-color: transparent;
  height: 50px;
  width: 200px;
  color: #3498db;
  font-size: 1.5em;
  box-shadow: 0 6px 6px rgba(47, 127, 81, 0.6);
}

.file-upload-input {
  /* position: absolute; */
  /* font-size: 9px; */
  border: 3px solid black;
  padding-bottom: 40%; 
  width:100%;
  background-color:white;
  border-radius: 5px;
}
.upload-styling{
  width:100%;
}

.dark-text{
  color:#333;
}


.left-back-report-button{
float:left;
 background: linear-gradient(to right, #3759de, #09518f);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 13px;
  transition: all 0.3s ease-in-out;
  margin-left: 10px; /* add external space on the left side */
}


.left-submit-button{
float:left;
background: linear-gradient(to right, #3759de, #09518f);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 15px;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 13px;
  transition: all 0.3s ease-in-out;
}


/* radio button styling */


/* Style for the radio button container */
.radio-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

/* Style for the radio button */
.radio-button {
  display: none;
  align-items: center;
  justify-content: center;
  /* font-size: 10px; */
  /* font-weight: bold; */
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

/* Style for the radio button label */
.radio-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}



.radio-button:checked + .radio-label {
  background: linear-gradient(
      266.45deg,
      #f990f7 -50.37%,
      #4a86ef 102.5%,
      #643eec 122.97%
    ); /* Initial background color */
  color: rgb(255, 255, 255); /* Initial text color */
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out; /* Transition properties */
}

.radio-button:not(:checked) + .radio-label {
  background-color: #fff; /* Final background color */
  color: #333; /* Final text color */
}

/* Style for the left tile */
.left-tile {
  margin-right: 10px;
}

/* Style for the right tile */
.right-tile {
  margin-left: 10px;
}



</style>
