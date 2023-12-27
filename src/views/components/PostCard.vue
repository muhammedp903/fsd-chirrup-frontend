<template>
  <div class="card mb-3" >
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
        <router-link :to="'/users/' + post.author.user_id" id="author" >
          {{"@" + post.author.username }}
        </router-link>
      </div>
    </div>

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
    timestamp(){
      return new Date(this.post.timestamp).toLocaleString();
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
</style>