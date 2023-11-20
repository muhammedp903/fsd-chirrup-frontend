<template>
  <div>
    <em v-if="post.loading">Loading post...</em>

    <div v-else>
<!--      <p>Author: {{post.author.first_name + " " + post.author.last_name}}</p>-->
      <router-link :to="'/users/' + post.author.user_id">
        {{post.author.first_name + " " + post.author.last_name}}
      </router-link>
      <p>Text: {{post.text}}</p>
      <p>Date: {{post.timestamp}}</p>
      <p>Likes: {{post.likes.length}}</p>

      <hr />
      <p>All post info</p>
      <p>{{post}}</p>
    </div>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";

export default {
  data(){
    return {
      post: {},
      error: "",
    };
  },
  created() {
    this.post.loading = true;

    postService.getSinglePost(this.$route.params.id)
        .then((post) => {
          this.post = post;
        })
        .catch(error => this.error = error);
  },
};
</script>

<style scoped>

</style>