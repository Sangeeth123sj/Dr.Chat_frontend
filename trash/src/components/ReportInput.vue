<template>
<br/>
<div class="input-report">
    <form @submit.prevent="submitForm">
      
 <div v-if="loadingResult" >
            <strong>Creating a summary..</strong>
          </div>
      <div v-else>
        <h2>Summary</h2>
       
      </div>
      <textarea
        class="black-border"
        rows="18"
       
        type="text"
        v-model="text"
        placeholder="input the Report"
        required
      />
      

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
       <li><strong>Keywords:</strong> {{this.keywords}}</li>
       <br/>
          <li><strong>Medicine:</strong> {{this.medicines}}</li>
          <br/>
          <li><strong>Lifestyle:</strong> {{this.lifestyle}}</li>
          <br/>
        </ul>
    </div>

</div>
</template>
<script>

import Cookies from "js-cookie";
import axios from 'axios';
export default {
  data() {
    return {
      initialPrompt:null,
      loadingResult: false,
      text: "",
      formSubmitted: false,
      keywords: null,
      medicines: null,
      lifestyle: null,
      
      
      
    };
  },

  methods: {
    revertToReport(){
      this.text = this.initialPrompt;
    },
    submitForm: function () {
      this.formSubmitted = true;
      this.loadingResult = true;
      console.log(this.loadingResult)

                        
          axios.post(
                  // "http://127.0.0.1:8000/summarize/",
                  "https://healthsnapbackend-production.up.railway.app/summarize/" ,
                  
                  {
                    text: this.text,
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
                                console.log(data);
                                
                                this.initialPrompt = this.text;
                                this.text = data["summary"];
                                this.keywords = data["keywords"]
                                this.medicines = data["medicines"]
                                this.lifestyle = data["lifestyle"]
                                this.loadingResult = false;
                                Cookies.set("report", this.text, { secure: true });
                                console.log("cookie report:", Cookies.get("report"))
                                console.log("this.text", this.text)
                              });



                  (error) => {
                    
                    console.log(error);
                            this.text = "Something went wrong please try again";
                            this.loadingResult = false;
                    

                    // handle the error
                  }
                

    }
        
      
      
    

    
  },

  mounted: function () {},

  computed: {
    
    
    
  },
};
</script>

<style>
/* CSS */
.black-border {
    border: 3px solid black;
    border-radius: 6px;
    background-color:  #f2f2f2;
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
</style>
