<template>
  <div class="card mb-2">
    <div class="card-body">
      <router-link :to="'/users/' + user.user_id">
        <h5 class="card-title">{{user.first_name + " " + user.last_name}}</h5>
      </router-link>

      <h6 class="card-subtitle mb-2 text-muted">{{"@" + user.username }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>