import {createRouter, createWebHistory} from "vue-router";

import Home from "../Home.vue";
import Login from "../Login.vue";
import NotFound from "../NotFound.vue";

const ifAuthenticated = (to, from, next) => {
    // To use on routes requiring authentication
    // e.g. {path: "/dashboard", component: Dashboard, beforeEnter: ifAuthenticated},
    const loggedIn = localStorage.getItem("session_token");
    if (loggedIn){
        next();
        return;
    }
    next("/login");
};

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/:pathMatch(.*)*", component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;