<template>
  <div>
    <h1>{{ titleText }}</h1>
    <br/>
    <form @submit.prevent="handleSubmit">
      <textarea class="form-control" name="text" id="text" v-model="post.text"></textarea>
      <br/>
      <span>
        <button class="btn btn-outline-primary">Post</button>
        &nbsp
        <button class="btn btn-outline-secondary" v-show="!editing" @click="saveDraft">Save Draft</button>
      </span>
    </form>
  </div>
</template>

<script>
import {postService} from "@/services/posts.service";

export default {
  computed: {
    titleText(){
      if(this.draft) return "Edit Draft";
      if(this.editing) return "Edit Post";
      return "New Post";
    }
  },
  data() {
    return {
      post: {},
      editing: false,
      draft: false,
      submitted: false,
    };
  },
  created() {
    if(this.$route.path !== "/posts/new"){
      // the path will be /posts/:id/edit - the user is editing an existing post or draft
      this.editing = true;

      if(!this.$route.path.includes("draft")){
        // the path will be /posts/:id/edit - the user is editing an existing post
        postService.getSinglePost(this.$route.params.id)
            .then((post) => {
              this.post = post;
            })
            .catch((error) => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      } else {
        // the path will be /posts/draft/:id/edit - the user is editing a draft
        this.draft = true
        this.post = JSON.parse(localStorage.getItem("drafts")).drafts[this.$route.params.id];
      }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
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
              this.$root.error = error;
              this.$root.toast.show();
              this.submitted = false;
            });

      } else {
        postService.newPost(text)
            .then(() => {
              this.$router.push("/profile");
            })
            .catch(error => {
              this.$root.error = error;
              this.$root.toast.show();
              this.submitted = false;
            });
      }
    },
    saveDraft(){
      this.submitted = true;
      const text = this.post.text;

      if (!text) {
        return;
      }

      let currentDraft = {
        draft: true,
        text: text,
        timestamp: Date.now(),
      };

      let drafts = JSON.parse(localStorage.getItem("drafts"));
      if(drafts){
        drafts.drafts.push(currentDraft); // add the new draft to the existing drafts list
      } else {
        drafts = {drafts: [currentDraft]}; // create a new drafts object with a list of drafts and add the new one
      }
      localStorage.setItem("drafts", JSON.stringify(drafts));

      this.$router.push("/profile");
    }
  }
};

</script>

<style scoped>

</style>