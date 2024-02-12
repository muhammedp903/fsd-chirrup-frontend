<template>
  <div class="card mb-3" >
<!--    For normal posts:-->
    <div v-if="!post.draft">
      <router-link id="postText" :to="'/posts/' + post.post_id">
        <div class="card-body">
          <h5 class="card-title">{{post.text}}</h5>
        </div>
      </router-link>

      <div class="card-footer bg-transparent">
        <span class="btn likes" @click="likeUnlikePost">
          <i v-if="likeButtonState" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
          {{post.likes.length}}
        </span>

        <span class="author">
          {{ timeSince }} &nbsp
          <router-link :to="'/users/' + post.author.user_id" id="author" >
            {{"@" + post.author.username }}
          </router-link>
        </span>
      </div>
    </div>

<!--    For draft posts:-->
    <div v-else>
      <router-link id="postTextDraft" :to="'/posts/draft/' + post.draftId + '/edit'">
        <div class="card-body">
          <h5 class="card-title">{{post.text}}</h5>
        </div>
      </router-link>

      <div class="card-footer bg-transparent">
        <span class="draftLabel">
          Draft post. Open to edit or publish
        </span>
      </div>
    </div>
  </div>


</template>

<script>
import {store} from "@/services/store";
import {postService} from "@/services/posts.service";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  computed:{
    likeButtonState(){
      return this.post.likes.some(like => like.user_id == localStorage.getItem("user_id"));
    },
    timeSince(){
      // Calculate time since post was created and relevant unit
      let timeSince = Date.now() - new Date(this.post.timestamp).getTime();
      let timeSinceInMinutes = Math.floor(timeSince / 60000);
      if(timeSinceInMinutes < 1){
        return "Just now";
      } else if(timeSinceInMinutes < 60){
        return timeSinceInMinutes + " minutes ago";
      } else if(timeSinceInMinutes < 1440){
        return Math.floor(timeSinceInMinutes / 60) + " hours ago";
      } else if(timeSinceInMinutes < 10080){
        return Math.floor(timeSinceInMinutes / 1440) + " days ago";
      } else if(timeSinceInMinutes < 40320){
        return Math.floor(timeSinceInMinutes / 10080) + " weeks ago";
      } else if(timeSinceInMinutes < 525600){
        return Math.floor(timeSinceInMinutes / 43200) + " months ago";
      } else {
        return Math.floor(timeSinceInMinutes / 525600) + " years ago";
      }
      // return new Date(this.post.timestamp).toLocaleString("en-GB", {day: "numeric", month: "numeric", year: "2-digit",})
    }
  },
  methods: {
    likeUnlikePost(){
      this.error = "";
      if(!store.authenticated){
        this.$root.error = "Sign in to like a post";
        this.$root.toast.show();
        return;
      }
      if(!this.post.likes.some(like => like.user_id == localStorage.getItem("user_id"))){
        postService.likePost(this.post.post_id)
            .then(() => {
              this.post.likes.push({user_id: localStorage.getItem("user_id")}); // add the current user to the likes list in the local post object
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      } else {
        postService.unlikePost(this.post.post_id)
            .then(() => {
              this.post.likes.splice(this.post.likes.findIndex(like => like.user_id == localStorage.getItem("user_id")), 1); // remove current user from local likes list
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      }
    },
  }
}
</script>

<style scoped>
  @import url('bootstrap-icons/font/bootstrap-icons.css');

  #postText{
    text-decoration: none;
    color: #000;
  }
  #postTextDraft{
    text-decoration: none;
    color: grey;
  }
  @media (max-width: 768px) {
    .card-title{
      font-size: 1em;
    }
  }
  .card-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 768px) {
    .author {
      font-size: 70%;
    }
  }
  .card-body:hover{
    border-color: #808080;
    background-color: #f0f0f0;
  }
  #author:hover{
    font-weight: bold;
  }
  .likes:hover{
    scale: 1.1;
  }
  .bi-heart-fill{
    color: red;
  }
  @media (prefers-color-scheme: dark) {
    #postText{
      color: #fff;
    }
    #postTextDraft{
      color: #fff;
    }
    .card-body:hover{
      border-color: #808080;
      background-color: #404040;
    }
  }
</style>