<template>
  <div>
    <h1>Home</h1>

    <em v-if="loading">Loading posts...</em>

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.post_id">
        <router-link :to="'/posts/' + post.post_id">
          {{post.text}}
        </router-link>
      </li>
    </ul>
    <p v-else>Nothing to see here...</p>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";

export default {
    data(){
      return {
        welcome_message: "Welcome to Chirrup",
        posts: [],
        error: "",
        loading: true,
      };
    },
  mounted() {
      postService.getFeed()
          .then(posts => {
            this.posts = posts;
            this.loading = false;
          });
  },
  methods: {
    },
    components: {
    }
  }
</script>


<style scoped>

</style>