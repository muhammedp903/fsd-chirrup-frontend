<template>
  <div>
    <div v-if="user.loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-else>
      <h1>{{user.first_name + " " + user.last_name}}</h1>

      <button v-if="!isCurrentUser && store.authenticated" @click="followAction">{{followButtonText}}</button>

      <button v-if="isCurrentUser" @click="newPost">New Post</button>

      <br/><br/>

      <div v-if="user.posts.length">
        <PostCard v-for="post in user.posts" :key="post.post_id" :post="post"/>
      </div>
      <p v-else>Nothing to see here...</p>

      <button v-if="isCurrentUser" @click="logout">Logout</button>

    </div>
  </div>
</template>

<script>
import {userService} from "@/services/user.service";
import {store} from "@/services/store"
import {socialService} from "@/services/social.service";
import PostCard from "@/views/components/PostCard.vue";

export default {
  components: {PostCard},
  data(){
    return {
      user: {},
      isCurrentUser: false,
      isFollowing: false,
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
        .catch((error) => {
          this.$root.error = error;
          this.$root.toast.show();
        });
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
          .catch((error) => {
            this.$root.error = error;
            this.$root.toast.show();
          });
    },
    followAction(){
      if(this.isFollowing){
        socialService.unfollowUser(this.user.user_id)
            .then(() => {
              this.isFollowing = false;
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      } else {
        socialService.followUser(this.user.user_id)
            .then(() => {
              this.isFollowing = true;
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      }
    },

  }
};
</script>

<style scoped>

</style>