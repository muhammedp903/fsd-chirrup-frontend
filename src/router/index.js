import {createRouter, createWebHistory} from "vue-router";

import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import NotFound from "../views/pages/NotFound.vue";
import SinglePost from "@/views/pages/SinglePost.vue";
import UserProfile from "@/views/pages/UserProfile.vue";
import Register from "@/views/pages/Register.vue";
import EditPost from "@/views/pages/EditPost.vue";
import MyProfile from "@/views/pages/MyProfile.vue";

const ifAuthenticated = (to, from) => {
    const loggedIn = localStorage.getItem("session_token");
    if (loggedIn){
        return;
    }
    return "/login";
};

// check if current user before entering users/:id
const ifCurrentUser = (to, from) => {
    const loggedIn = localStorage.getItem("session_token");
    if (loggedIn){
        const userId = localStorage.getItem("user_id");
        if (userId === to.params.id){
            // change route to profile page
            return "/profile";
        }
    }
};

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/posts/:id", component: SinglePost},
    {path: "/users/:id", component: UserProfile, beforeEnter: ifCurrentUser},
    {path: "/profile", component: MyProfile, beforeEnter: ifAuthenticated},
    {path: "/posts/new", component: EditPost, beforeEnter: ifAuthenticated},
    {path: "/posts/draft/:id/edit", component: EditPost, beforeEnter: ifAuthenticated},
    {path: "/posts/:id/edit", component: EditPost, beforeEnter: ifAuthenticated},
    {path: "/:pathMatch(.*)*", component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;