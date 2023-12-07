<template>
  <div>
    <h1>Home</h1>

    <button @click="newPost">New Post</button>

    <em v-if="loading">Loading posts...</em>

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.post_id">
        <router-link :to="'/posts/' + post.post_id">
          {{post.text}}
        </router-link>
      </li>
    </ul>
    <p v-else>Nothing to see here...</p>

    <hr/>

    <Search/>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";
import Search from "@/views/components/Search.vue";

export default {
  data(){
    return {
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
    newPost() {
      this.$router.push("/posts/new");
    },
  },
  components: {
    Search
    }
  }
</script>


<style scoped>

</style>