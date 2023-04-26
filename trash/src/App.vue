
<template>
<div>


  <!-- navbar -->

<nav
      id="navbarNav"
      class="main-navigation stretch-nav navbar"
      :class="{ dark: isAboutPage }"
    >
      <div class="container">
        <router-link to="/" class="route-white">MEDSNAP</router-link>
        <a
          class="navbar-toggler"
          type="button"
          v-on:click="showNav = !showNav"
        >
          <span class="">
            <img src="./assets/ham.png" alt="" class="hamburger-icon" />
          </span>
        </a>
        <div class="hidenav-desktop">
          <ul class="nav-links">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/history" class="nav-link">History</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pricing" class="nav-link">Pricing</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

<!-- sidenavbar for phones -->
<transition name="slide">
    <div class="nav-container">
      <nav class="sidebar" :class="{ dark: isAboutPage }" v-if="showNav">
        <ul>
          <li>
            <router-link to="/" class="">Home</router-link>
          </li>
          <li>
            <router-link to="/history" class="nav-link">History</router-link>
          </li>
          <li>
            <router-link to="/pricing" class="nav-link">Pricing</router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>
      </nav>
    </div>
</transition>
<br/><br/>


<h1>MedSnap   <img src="/src/assets/ms_icon.png" class="align-logo" width="60" height="60" /></h1>

 <div>
    <router-view></router-view>
  </div>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<footer class="stretch-footer">
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <h3>Contact Us</h3>
        <p>123 Main Street, Anytown USA</p>
        <p>Phone: 555-555-1234</p>
        <p>Email: info@medsnap.com</p>
      </div>
      <div class="col-sm-6">
        <h3>Follow Us</h3>
        <ul class="social-media-icons">
          <li><a href="#"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#"><i class="fab fa-instagram"></i></a></li>
        </ul>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12">
        <p>&copy; 2023 Medsnap. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>

</div>


  <!-- <div class="container">
    <div class="row">
      <div class="col-sm-8 col-md-8">
        <ReportInput />
      </div>
      <div class="col-sm-4 col-md-4 mobile-padding">
        <ChatBox />
      </div>
    </div>
  </div> -->

</template>
<script>
import ReportInput from "./components/ReportInput.vue";
import ChatBox from "./components/ChatBox.vue";

export default {
data() {
return {
showNav: false,
currentRoute: "",
};
},
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




@media (min-width: 1140px) {
  .hamburger-icon {
    display: none;
  }
}

.sidebar {
  position: fixed;
  top: 9%;
  right: 0;
  height: 100vh;
  width: 40%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 800;
   /* your other styles */
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}


.nav-container {
  /* z-index: 999; */
}
.sidebar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
}

.sidebar a:hover {
  background-color: #eee;
}


@media screen and (max-width: 575px) {
  .mobile-padding {
    padding-top: 100px; /* 10px top and bottom padding */
  }
}
</style>
