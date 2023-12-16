<template>
  <router-link class="card mb-3" :to="'/posts/' + post.post_id">
    <div>
      <div class="card-body">
        <h5 class="card-title">{{post.text}}</h5>
      </div>
      <div class="card-footer bg-transparent">
        <router-link :to="'/users/' + post.author.user_id" id="author" >
          {{"@" + post.author.username }}
        </router-link>

        <span class="likes" @click="likeUnlikePost">
          <i v-if="likeButtonState" class="bi bi-heart-fill"></i>
          <i v-else class="bi bi-heart"></i>
          {{post.likes.length}}
        </span>
      </div>
    </div>
  </router-link>

</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
@import url('bootstrap-icons/font/bootstrap-icons.css');

.card{
  text-decoration: none;
}
@media (max-width: 768px) {
  .card-title{
    font-size: 1em;
  }
}
.card:hover{
  border-color: #808080;
  background-color: #f0f0f0;
}
#author:hover{
  font-weight: bold;
}
</style>