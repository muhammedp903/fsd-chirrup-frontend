<template>
  <div>
    <em v-if="post.loading">Loading post...</em>

    <div v-else>
      <router-link :to="'/users/' + post.author.user_id">
        <h3>{{post.author.first_name + " " + post.author.last_name}}</h3>
      </router-link>

      <button v-if="isCurrentUserPost" @click="editPost">Edit</button>
      <button v-if="isCurrentUserPost" @click="deletePost">Delete</button>

      <p>Text: {{post.text}}</p>
      <p>Date: {{post.timestamp}}</p>
      <p>Likes: {{post.likes.length}}</p>

      <button v-if="store.authenticated" @click="likeUnlikePost">{{likeButtonText}}</button>

      <hr />
      <p>All post info</p>
      <p>{{post}}</p>
    </div>

    <div v-if="error">{{error}}</div>
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
    likeButtonText(){
      if(this.post.likes.some(like => like.user_id == localStorage.getItem("user_id"))) return "Unlike";
      return "Like";
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
          .catch(error => this.error = error);
    },
    editPost(){
      this.$router.push(`/posts/${this.post.post_id}/edit`);
    },
    deletePost(){
      postService.deletePost(this.post.post_id)
          .then(() => {
            this.$router.push("/profile");
          })
          .catch(error => this.error = error);
    },
    likeUnlikePost(){
      if(!this.post.likes.some(like => like.user_id == localStorage.getItem("user_id"))){
        postService.likePost(this.post.post_id)
            .then(() => {
              this.getPost();
            })
            .catch(error => this.error = error);
      } else {
        postService.unlikePost(this.post.post_id)
            .then(() => {
              this.getPost();
            })
            .catch(error => this.error = error);
      }
    },
  },
};
</script>

<style scoped>

</style>