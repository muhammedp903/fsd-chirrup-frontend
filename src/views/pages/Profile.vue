<template>
  <div>
    <em v-if="user.loading">Loading user...</em>

    <div v-else>
      <p>Name: {{user.first_name + " " + user.last_name}}</p>

      <button v-if="!isCurrentUser && store.authenticated" @click="followAction">{{followButtonText}}</button>

      <button v-if="isCurrentUser" @click="newPost">New Post</button>

      <ul v-if="user.posts.length">
        <li v-for="post in user.posts" :key="post.post_id">
          <router-link :to="'/posts/' + post.post_id">
            {{post.text}}
          </router-link>
        </li>
      </ul>
      <p v-else>Nothing to see here...</p>
<!--      <p>Posts: {{user.posts}}</p>-->

      <button v-if="isCurrentUser" @click="logout">Logout</button>

<!--      <hr />-->
<!--      <p>All user info</p>-->
<!--      <p>{{user}}</p>-->
    </div>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {userService} from "@/services/user.service";
import {store} from "@/services/store"
import {socialService} from "@/services/social.service";
import newPost from "@/views/pages/EditPost.vue";

export default {
  data(){
    return {
      user: {},
      isCurrentUser: false,
      isFollowing: false,
      error: "",
      store
    };
  },
  computed:{
    followButtonText(){
      if(this.isFollowing) return "Unfollow";
      return "Follow";
    }
  },
  created() {
    this.user.loading = true;
    let id = "";

    if(this.$route.path === "/profile"){
      // If the path is /profile, the user is logged in and on their own profile page...
      id = localStorage.getItem("user_id");
      this.isCurrentUser = true;
    } else {
      // ...otherwise, the path will be /user/:id - the user is viewing someone else's profile
      id = this.$route.params.id;
    }

    socialService.getUser(id)
        .then((user) => {
          this.user = user;
          let uid = localStorage.getItem("user_id");
          if(user.followers.some(e => e.user_id == uid)) { // check if the signed-in user is in the followers list of this user
            this.isFollowing = true;
          }
        })
        .catch(error => this.error = error);
  },
  methods: {
    newPost() {
      this.$router.push("/posts/new");
    },
    logout(){
      userService.logout()
          .then(() => {
            this.$router.replace("/");
            store.authenticated = false;
          })
          .catch(error => this.error = error);
    },
    followAction(){
      if(this.isFollowing){
        socialService.unfollowUser(this.user.user_id)
            .then(() => {
              this.isFollowing = false;
            })
            .catch(error => this.error = error);
      } else {
        socialService.followUser(this.user.user_id)
            .then(() => {
              this.isFollowing = true;
            })
            .catch(error => this.error = error);
      }
    },

  }
};
</script>

<style scoped>

</style>