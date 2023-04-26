<template>
  <div>
    <br />
    <br />
    <h1>Reports</h1>
    <!-- <br /> -->
    <!-- <center> -->
      <!-- <div class="search-container">
        <input type="text" class="search-input" placeholder="Search..." v-model="search" />
        <button class="searchButton" :disabled="searchLoading" @click="handleSearch">{{ searchLoading ? "Loading..." : "Search" }}</button>
      </div> -->
    <!-- </center> -->
    <!-- <br /> -->
    <p v-if="!fullReport && fullSummary">all your reports in one place..</p>
    <!-- report detail if clicked -->
    <div v-if="fullReport && fullSummary">
      <h2>Full Report</h2>
      <p>{{ fullReport }}</p>
      <h2>Full Summary</h2>
      <p>{{ fullSummary }}</p>
    </div>
    </div>
    <div class="grid-container">
      <div v-for="(report, index) in reports" :key="index" class="grid-cell" @click="getReportDetail(report)">
        <strong>Report: </strong><p>{{ report.report_title }}</p>
        <strong>Summary: </strong><p>{{ report.summary_title }}</p>
        <br /><br /><br />
       
      </div>
    </div>
    
</template>


<script>
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import { ref,onMounted } from 'vue';
import Cookies from "js-cookie";
import axios from "axios";
import router from "../router/index.js";
// import { onMounted } from '@vue/composition-api';

export default {
  setup() {
    const accessToken = Cookies.get('access_token')
    let reports = ref([]);
    const search = ref(null);
    const searchLoading = ref(false);
    let fullReport = ref(null);
    let fullSummary = ref(null);


   onMounted(() => {
      // loginChecker();
    });

   const fetchReports = async () => {
        try {
            const response = await fetch(baseUrl+'/list_reports/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
            });
            const data = await response.json();
            // reports = JSON.stringify(data)
            reports.value = data;

            console.log(reports.value)
           
            } catch (error) {
                console.log(error);
            //     alert('Something went wrong,----- please send a message on the contact page if error persists.');
            }
    };


    const loginChecker = () => {
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
    }

    const getReportDetail = async (report) => {
      try {
        const response = await fetch(baseUrl+`/report_detail/${report.id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fullReport.value = data.full_report;
        fullSummary.value = data.full_summary;
      } catch (error) {
        console.log(error);
      }
    }

    


    fetchReports();

    return {
      reports,
      // search,
      // searchLoading,
      fullReport,
      fullSummary,
      getReportDetail
    };
  },
};
</script>


<style scoped>
.grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-gap: 10px;
          padding: 70px;
          width:100%;
        }


@media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
      padding:1px;
    }

  }
        .grid-cell {
          border: 1px solid #ffffff;
          padding-top: 40px;
          padding-left: 40px;
          padding-right: 40px;
          padding-bottom: 10px;
          position: relative;
          min-height: 350px;
          word-wrap: break-word;
        }

        

        .use-button {
            position: absolute;
            top: 92%;
            left: 4%;
            z-index: 100;
            width: 100px;
            height: 40px;
            padding-bottom:10%;
          }


          .search-container {
            position: relative;
            width: 300px;
            height: 40px;
            border-radius: 20px;
            
          }
          .search-input {
            width: 300px;
            height: 40px;
            border-radius: 20px;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
            padding: 0px 20px;
          }
          .search-icon {
            color: #aaa;
            font-size: 20px;
          }
          .searchButton {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 40px;
            width: 80px;
            background: linear-gradient(
              266.45deg,
              #f990f7 -50.37%,
              #4a86ef 102.5%,
              #643eec 122.97%
            );
            color: white;
            border: none;
            border-radius: 0px 20px 20px 0px;
            cursor: pointer;
          }
</style>