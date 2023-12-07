<template>
  <div>
    <h1>{{ titleText }}</h1>
    <form @submit.prevent="handleSubmit">
      <textarea name="text" id="text" v-model="post.text"></textarea>
      <button>Post</button>
      <div v-if="error">{{error}}</div>
    </form>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";

export default {
  computed: {
    titleText(){
      if(this.editing) return "Edit Post";
      return "New Post";
    }
  },
  data() {
    return {
      post: {},
      editing: false,
      submitted: false,
      error: "",
    };
  },
  created() {
    if(this.$route.path !== "/posts/new"){
      // the path will be /posts/:id/edit - the user is editing an existing post
      this.editing = true;
      postService.getSinglePost(this.$route.params.id)
          .then((post) => {
            this.post = post;
          })
          .catch(error => this.error = error);
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.error = "";
      const text = this.post.text;

      if (!text) {
        return;
      }

      if(this.editing){
        postService.editPost(this.post.post_id, text)
            .then(() => {
              this.$router.push("/posts/" + this.post.post_id);
            })
            .catch(error => {
              this.error = error;
              this.submitted = false;
            });

      } else {
        postService.newPost(text)
            .then(() => {
              this.$router.push("/profile");
            })
            .catch(error => {
              this.error = error;
              this.submitted = false;
            });
      }
    }
  }
};

</script>

<style scoped>

</style>