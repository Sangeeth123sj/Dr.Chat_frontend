import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import axios from "axios";
import Cookies from "js-cookie";
const app = createApp(App).use(router,Cookies);
app.mount("#app");
