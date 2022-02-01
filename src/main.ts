import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


createApp(App).use(Toast).mount('#app')
