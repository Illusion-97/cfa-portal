<template>
  <div id="adminDashboard">
    <UserListComponent :isAction="true"/>
  </div>
</template>

<script>

import UserListComponent from "@/components/List/UserListComponent.vue";
export default {
  name: "AdminDashboard",
  components: {
    UserListComponent,
  },
};
</script>
<style scoped>
</style>

