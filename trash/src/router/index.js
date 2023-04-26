import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
// import Gallery from "../views/Gallery.vue";
// import Detail from "../views/Detail.vue";
// import Upload from "../views/Upload.vue";
import Pricing from "../views/Pricing.vue";
// import Login from "../views/Login.vue";
// import Signup from "../views/Signup.vue";
// import Profile from "../views/Profile.vue";
// import RechargeCheckout from "../views/RechargeCheckout.vue";
import Contact from "../views/Contact.vue";
// import BackgroundRemover from "../views/BackgroundRemover.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  // { path: "/gallery", name: "Gallery", component: Gallery },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  // { path: "/detail", name: "Detail", component: Detail },
  // { path: "/upload", name: "Upload", component: Upload },
  { path: "/pricing", name: "Support", component: Pricing },
  // { path: "/login", name: "Login", component: Login },
  // { path: "/signup", name: "Signup", component: Signup },
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
export default router;
