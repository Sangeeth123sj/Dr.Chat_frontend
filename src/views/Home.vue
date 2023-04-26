<template>
  <div>
    <!-- login button -->
    <router-link to="/login" class="nav-link active" aria-current="page">
      <button class="theme-outline-button login-button">
        <span class="outline-text">Login</span>
      </button>
    </router-link>

    <!-- header section with logo -->
    <!-- <header>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <img src="../assets/logo.png" alt="Logo" class="logo" />
            </div>
          </div>
        </div>
      </div>
    </header> -->

    <!-- main section with features -->
    <main>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-6">
            <div class="feature-card">

              <div class="feature-card-body">
                        <div class="feature-card-image">
                            <img src="../assets/report.jpg" alt="Medical Report Summarization" />
                        </div>
                <h3 class="feature-card-title">Medical Report Summarization</h3>
                <p class="feature-card-description">
                  Summarize your medical reports in a few clicks with our advanced AI technology.
                </p>
                <router-link to="/summarize">
                  <button class="btn btn-primary feature-card-button"><router-link to="/summarize" class="route-white">Try It Now</router-link></button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="feature-card">
              
              <div class="feature-card-body">
                    <div class="feature-card-image">
                        <img src="../assets/summary.jpg" alt="AI Doctor" />
                    </div>
                <h3 class="feature-card-title">Chat Doc</h3>
                <p class="feature-card-description">
                  Get instant answers to your medical questions and doubts with our advanced AI technology.
                </p>
                <router-link to="/chat_doc">
                  <button class="btn btn-primary feature-card-button"><router-link to="/chat_doc" class="route-white">Try It Now</router-link></button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
<br/><br/>


<!-- Summarizer benefits -->


<!-- summarizer benefits section with green background -->
<section class="summarizer-benefits-section">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="summarizer-section-title">Summarizer Benefits</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-5">
        <div class="summarizer-benefit-card">
          <h3 class="summarizer-benefit-title">All your medical reports and summaries in one place.</h3>
          <p class="summarizer-benefit-description">
            We can keep a history of all your medical reports and the summaries you generate.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="summarizer-benefit-card">
          <h3 class="summarizer-benefit-title">Improved Patient statisfaction and <br/>Faster Insurance Procedures.</h3>
          <p class="summarizer-benefit-description">
            With our summarization technology, you can make the summarization of medical reports faster inorder to make faster insurance prodecures.
          </p>
        </div>
      </div>
      <div class="col-md-1">
      </div>

      <div class="row">
        <div class="col-md-1">
        </div>
      <div class="col-md-5">
        <div class="summarizer-benefit-card">
          <h3 class="summarizer-benefit-title">Save Time and Effort</h3>
          <p class="summarizer-benefit-description">
            Our advanced summarization technology can help you quickly and easily understand the key points of long articles or documents, saving you time and effort.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="summarizer-benefit-card">
          <h3 class="summarizer-benefit-title">Improved Productivity</h3>
          <p class="summarizer-benefit-description">
            With our summarization technology, you can quickly extract the essential information from lengthy documents, enabling you to make faster and more informed decisions and boosting your productivity.
          </p>
        </div>
    </div>
    <div class="col-md-1">
        </div>
    </div>
    </div>
  </div>
  <button type="button" class="try-button"><router-link to="/summarize" class="route-white">Try For  Free</router-link></button>
</section>

<br/><br/>
    <!-- chat benefits section with light blue background -->
<section class="chat-benefits-section">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="section-title">Chat Doc Benefits</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-5">
        <div class="chat-benefit-card">
          <h3 class="chat-benefit-title">Instant Answers to Medical Questions</h3>
          <p class="chat-benefit-description">
            Our advanced AI technology can provide patients with instant answers to their medical questions and doubts, reducing the need for unnecessary doctor visits.
          </p>
        </div>
      </div>
      <div class="col-md-5">
        <div class="chat-benefit-card">
          <h3 class="chat-benefit-title">24/7 Availability</h3>
          <p class="chat-benefit-description">
            Chat Doc is available 24/7, allowing patients to get answers to their medical questions at any time, from anywhere.
          </p>
        </div>
      </div>
      <div class="col-md-1">
      </div>
    </div>
  </div>
  <button type="button" class="try-button"><router-link to="/chat_doc" class="route-white">Try For  Free</router-link></button>
</section>

<br/><br/>





  </div>
</template>

<style scoped>
  /* login button styling */
  .login-button {
    right: 5%;
    top: 15px;
    z-index: 999;
    position: fixed;
  }

  .try-button{
    padding:20px;
    border-radius: 30px;
  }

  /* logo styling */
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

  /* feature card styling */
  .feature-card {
    margin-top: 2em;
  }

  .feature-card-image img {
    width: 100%;
    height: auto;
  }

  .feature-card-body {
    background-color: #f7f7f7;
    padding: 2em;
    border-radius: 10px;
  }

  .feature-card-title {
    margin-top: 0;
    color: black;
  }

  .feature-card-description {
    margin-bottom: 2em;
    color: black;
  }

  .feature-card-button {
    width: 100%;
  }




  /* new section styling */
.new-section {
  background-color: #fff;
  padding: 3em;
  border-radius: 10px;
}

.new-section h2 {
  color: #646cff;
  margin-top: 0;
}

.new-section p {
  font-size: 1.2em;
  line-height: 1.6em;
  color: #333;
  margin-bottom: 1em;
}

.new-section ul {
  list-style: disc;
  margin-left: 1.5em;
  margin-bottom: 2em;
}

.new-section li {
  font-size: 1.2em;
  line-height: 1.6em;
  color: #333;
}

.chat-benefits-section {
  background-color: rgba(29, 29, 29, 0.558);
  padding: 5em 0;
  border-radius: 10px;
}

.section-title {
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2em;
  color:#646cff;
}
.summarizer-section-title {
  font-size: 2.5em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2em;
  color:white;
}

.chat-benefit-card {
  background-color:#fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2em;
}

.chat-benefit-title {
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 1em;
  color:black;
}

.chat-benefit-description {
  font-size: 1.1em;
  line-height: 1.5em;
  color: #666;
}





/* summarizer benefits style */


.summarizer-benefits-section {
  background-color: #6e399cc9;
  padding: 50px 0;
  color: #fff;
   border-radius: 10px;
}

.summarizer-benefit-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width:100%;
}

.summarizer-benefit-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color:black;
}

.summarizer-benefit-description {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 0;
  color:grey;
}


 </style>
 <script>

export default {
name: "Home"
};
</script>
