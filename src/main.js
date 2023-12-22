
import { createApp } from 'vue'
import App from './views/App.vue'

import "@popperjs/core/dist/umd/popper.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import router from "./router"

createApp(App).use(router).mount('#app')
