<template>
  <div>
    <h1>Home</h1>

    <br/>

    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-if="posts.length">
      <PostCard v-for="post in posts" :key="post.post_id" :post="post"/>
    </div>

    <p v-else>Nothing to see here...</p>

    <hr/>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";
import PostCard from "@/views/components/PostCard.vue";
import UserCard from "@/views/components/UserCard.vue";

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
    UserCard,
    PostCard
  }
}
</script>


<style scoped>

</style>