<template>
  <div class="mt-4">
    <div v-if="post.loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-else>
      <h3>{{post.author.first_name + " " + post.author.last_name}}</h3>

      <router-link :to="'/users/' + post.author.user_id">
        <h4>@{{post.author.username}}</h4>
      </router-link>
      <br/>

      <h5>{{post.text}}</h5>
      <p>{{timestamp}}</p>

      <span class="btn likes" @click="likeUnlikePost">
        <i v-if="likeButtonState" class="bi bi-heart-fill"></i>
        <i v-else class="bi bi-heart"></i>
        {{post.likes.length}}
      </span>

      <br/><br/>
      <span class="edit" v-if="isCurrentUserPost">
        <button class="btn btn-secondary me-2" @click="editPost">Edit</button>
        <button class="btn btn-danger" @click="deletePost">Delete</button>
      </span>

    </div>

  </div>
</template>

<script>
import {postService} from "@/services/posts.service";
import {store} from "@/services/store";

export default {
  data(){
    return {
      post: {},
      isCurrentUserPost: false,
      store,
      error: "",
    };
  },
  computed:{
    likeButtonState(){
      return this.post.likes.some(like => like.user_id == localStorage.getItem("user_id"));
    },
    timestamp(){
      return new Date(this.post.timestamp).toLocaleString();
    }
  },
  created() {
    this.getPost();
  },
  methods: {
    getPost(){
      this.post.loading = true;

      postService.getSinglePost(this.$route.params.id)
          .then((post) => {
            this.post = post;
            if(store.authenticated){
              this.isCurrentUserPost = post.author.user_id == localStorage.getItem("user_id");
            }
            this.post.loading = false;
          })
          .catch((error) => {
            this.$root.error = error;
            this.$root.toast.show();
          })
    },
    editPost(){
      this.$router.push(`/posts/${this.post.post_id}/edit`);
    },
    deletePost(){
      postService.deletePost(this.post.post_id)
          .then(() => {
            this.$router.push("/profile");
          })
          .catch((error) => {
            this.$root.error = error;
            this.$root.toast.show();
          })
    },
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
              this.getPost();
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      } else {
        postService.unlikePost(this.post.post_id)
            .then(() => {
              this.getPost();
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      }
    },
  },
};
</script>

<style scoped>
@import url('bootstrap-icons/font/bootstrap-icons.css');
.likes:hover{
  scale: 1.1;
}
</style>