<template>
  <div>
    <div v-if="post.loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-else>
      <router-link :to="'/users/' + post.author.user_id">
        <h3>{{post.author.first_name + " " + post.author.last_name}}</h3>
      </router-link>

      <button v-if="isCurrentUserPost" @click="editPost">Edit</button>
      <button v-if="isCurrentUserPost" @click="deletePost">Delete</button>

      <h5>{{post.text}}</h5>
      <p>{{timestamp}}</p>

      <span class="likes" @click="likeUnlikePost">
        <i v-if="likeButtonState" class="bi bi-heart-fill"></i>
        <i v-else class="bi bi-heart"></i>
        {{post.likes.length}}
      </span>

<!--      <hr />-->
<!--      <p>All post info</p>-->
<!--      <p>{{post}}</p>-->
    </div>

    <errorToast :error="this.error"/>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";
import {store} from "@/services/store";
import Toast from "bootstrap/js/dist/toast";
import errorToast from "@/views/components/ErrorToast.vue";

export default {
  components: {errorToast},
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
      this.error = "";
      let toast = new Toast(document.getElementById('error-toast'));
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
            this.error = error;
            toast.show();
          })
    },
    editPost(){
      this.$router.push(`/posts/${this.post.post_id}/edit`);
    },
    deletePost(){
      this.error = "";
      let toast = new Toast(document.getElementById('error-toast'));
      postService.deletePost(this.post.post_id)
          .then(() => {
            this.$router.push("/profile");
          })
          .catch((error) => {
            this.error = error;
            toast.show();
          })
    },
    likeUnlikePost(){
      this.error = "";
      let toast = new Toast(document.getElementById('error-toast'));
      if(!store.authenticated){
        this.error = "Sign in to like a post";
        toast.show();
        return;
      }
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
            .catch((error) => {
              this.error = error;
              toast.show();
            })
      }
    },
  },
};
</script>

<style scoped>
@import url('bootstrap-icons/font/bootstrap-icons.css');

</style>