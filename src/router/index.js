import {createRouter, createWebHistory} from "vue-router";

import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import NotFound from "../views/pages/NotFound.vue";
import SinglePost from "@/views/pages/SinglePost.vue";
import Profile from "@/views/pages/Profile.vue";
import Register from "@/views/pages/Register.vue";

const ifAuthenticated = (to, from, next) => {
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
    {path: "/register", component: Register},
    {path: "/posts/:id", component: SinglePost},
    {path: "/users/:id", component: Profile},
    {path: "/profile", component: Profile, beforeEnter: ifAuthenticated},
    {path: "/:pathMatch(.*)*", component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;