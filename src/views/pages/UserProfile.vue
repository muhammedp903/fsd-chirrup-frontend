<template>
  <div>
    <div v-if="user.loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-else>
      <h1>{{user.first_name + " " + user.last_name}}</h1>

      <h4>@{{user.username}}</h4>

      <span class="followers">
        <i class="bi bi-people-fill"></i>
        {{"&nbsp" + user.followers.length}}

        <span class="btn followUnfollow" v-if="!isCurrentUser && store.authenticated" @click="followAction">
          <i v-if="isFollowing" class="bi bi-person-fill-dash"></i>
          <i v-else class="bi bi-person-fill-add"></i>
          {{isFollowing ? "Unfollow" : "Follow"}}
        </span>
      </span>

      <br/><br/>

      <div v-if="user.posts.length">
        <PostCard v-for="post in user.posts" :key="post.post_id" :post="post"/>
      </div>
      <p v-else>Nothing to see here...</p>

    </div>
  </div>
</template>

<script>
import {store} from "@/services/store"
import {socialService} from "@/services/social.service";
import PostCard from "@/views/components/PostCard.vue";

export default {
  components: {PostCard},
  data(){
    return {
      user: {},
      isFollowing: false,
      store
    };
  },
  created() {
    this.user.loading = true;
    let id = this.$route.params.id;

    socialService.getUser(id)
        .then((user) => {
          this.user = user;
          this.user.posts.sort((a, b) => b.timestamp - a.timestamp); // sort posts by timestamp to display chronologically
          
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
    followAction(){
      if(this.isFollowing){
        socialService.unfollowUser(this.user.user_id)
            .then(() => {
              this.isFollowing = false;
              this.user.followers.splice(this.user.followers.findIndex(follower => follower.user_id == localStorage.getItem("user_id")), 1); // remove current user from local followers list
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      } else {
        socialService.followUser(this.user.user_id)
            .then(() => {
              this.isFollowing = true;
              this.user.followers.push({user_id: localStorage.getItem("user_id")}); // add the current user to the followers list to update follower count locally
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
@import url('bootstrap-icons/font/bootstrap-icons.css');
.followers{
  font-size: larger;
  display: inline-flex;
  align-items: center;
}
.followUnfollow{
  font-size: 100%;
}
.followUnfollow:hover{
  scale: 1.1;
}
</style>