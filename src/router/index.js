import { createRouter, createWebHistory } from "vue-router";
import Summarize from "../views/Summarize.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import ChatDoc from "../views/ChatDoc.vue";
import ReportList from "../views/ReportList.vue";
import Pricing from "../views/Pricing.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
// import Profile from "../views/Profile.vue";
// import RechargeCheckout from "../views/RechargeCheckout.vue";
import Contact from "../views/Contact.vue";
import Cookies from "js-cookie";
// import router from "../router/index.js";
import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
// import BackgroundRemover from "../views/BackgroundRemover.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/summarize", name: "Summarize", component: Summarize, 
    meta: { requiresAuth: true } // <-- set the meta field for auth requirement
  },
  { path: "/chat_doc", name: "ChatDoc", component: ChatDoc, meta: { requiresAuth: true } },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/history", name: "ReportList", component: ReportList, meta: { requiresAuth: true } },
  // { path: "/upload", name: "Upload", component: Upload },
  { path: "/pricing", name: "Support", component: Pricing },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  // { path: "/profile", name: "Profile", component: Profile },
  // {
  //   path: "/background_remover",
  //   name: "BackgroundRemover",
  //   component: BackgroundRemover,
  // },
  // { path: "/recharge", name: "RechargeCheckout", component: RechargeCheckout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});






router.beforeEach(async (to, from, next) => {
  const isAuthenticated = Cookies.get('access_token');
  const requiresAuthStatus = to.matched.some(record => record.meta.requiresAuth)
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated,
    // redirect the user to the login page
    if (to.name !== 'Login') {
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
    
  } else {
    // Otherwise, send a request to check the validity of the access token
    // console.log("else")
    try {
      const response = await axios.get(`${baseUrl}/login_check/`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${isAuthenticated}`,
        },
      });

      if (response.data.status === 'logged in') {
        next();
      } else {
        // If the token is expired or invalid, redirect the user to the login page
        next({ path: '/login', query: { redirect: to.fullPath } });
      }
    } catch (error) {
      // console.log("EERROORR",requiresAuthStatus);
      if (to.name !== 'Login' && requiresAuthStatus ) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
      } else {
        next();
      }
      // Handle errors as needed
      // next({ path: '/login'});
    }
  }
});


// router.beforeEach((to) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // <-- check if the route requires auth
//   const accessToken = Cookies.get("access_token");
//   console.log("requiresAuth:", requiresAuth)
//   if (!accessToken) {
//     console.log("entered no access token")
//     return '/login'
//     // next({ name: "Login" });
//   } else {
//     const isAuthenticated =   axios
//       .get(baseUrl + "/login_check/", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         // alert("entered login redirect outside condition - ",response.data)
//         if (response.data.status === "logged in") {
//           // alert("entered loggged in redirect")
//           next();
//         } if (response.data.status === "not logged in" && requiresAuth)  {
//           alert("entered login redirect")
//           router.push("/login");
//         } if (response.data.detail === "Not authenticated" && requiresAuth)  {
//           // alert("entered login redirect")
//           router.push("/login");
//         }
//       })
//       .catch((error) => {
//         console.log(error, requiresAuth);
//         if (requiresAuth){
//           console.log("entered login check error redirect")
//           router.push("/login");
//         }
//       });
    
//     // checking whether the url requires auth check and redirecting conditionally if auth required
//     if (requiresAuth && !isAuthenticated) {
//       router.push("/login");// <-- redirect to login page if not authenticated
//     }
//   }
// });


export default router;
