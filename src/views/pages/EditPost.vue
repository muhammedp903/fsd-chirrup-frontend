<template>
  <div>
    <h1>{{ titleText }}</h1>
    <br/>
    <form @submit.prevent="handleSubmit">
      <textarea class="form-control" name="text" id="text" v-model="post.text"></textarea>
      <br/>
      <span>
        <button class="btn btn-outline-primary" id="postButton">Post</button>
        &nbsp
        <button class="btn btn-outline-secondary" id="draftButton">Save Draft</button>
        &nbsp
        <button class="btn btn-outline-danger" id="deleteDraftButton" v-show="draft">Delete Draft</button>
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
    };
  },
  created() {
    if(this.$route.path !== "/posts/new"){
      // the user is editing an existing post or draft
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
    handleSubmit(event) {
      let submitter = event.submitter.id;

      if(submitter === "postButton"){
        this.createPost();
      } else if(submitter === "draftButton"){
        this.saveDraft();
      } else if(submitter === "deleteDraftButton"){
        this.deleteDraft();
        this.$router.push("/profile");
      }
    },

    deleteDraft(){
      let drafts = JSON.parse(localStorage.getItem("drafts"));
      drafts.drafts.splice(this.$route.params.id, 1); // remove the current draft from the local drafts list
      localStorage.setItem("drafts", JSON.stringify(drafts));
    },

    createPost(){
      const text = this.post.text;

      if (!text) {
        return;
      }

      if(this.editing && !this.draft){
        postService.editPost(this.post.post_id, text)
            .then(() => {
              this.$router.push("/posts/" + this.post.post_id);
            })
            .catch(error => {
              this.$root.error = error;
              this.$root.toast.show();
            });

      } else {
        postService.newPost(text)
            .then(() => {
              if(this.draft){
                this.deleteDraft();
              }
              this.$router.push("/profile");
            })
            .catch(error => {
              this.$root.error = error;
              this.$root.toast.show();
            });
      }
    },

    saveDraft(){
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
        if(this.draft){
          drafts[this.$route.params.id] = currentDraft; // replace the old draft with the current one
        } else{
          drafts.drafts.push(currentDraft); // add the new draft to the existing drafts list
        }
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