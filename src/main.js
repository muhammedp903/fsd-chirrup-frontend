import { createApp } from 'vue';
import App from './views/App.vue';

import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import router from "./router";

createApp(App).use(router).mount('#app');

(() => {
    'use strict'

    const setTheme = () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
        }
    }

    setTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setTheme();
    });

})()