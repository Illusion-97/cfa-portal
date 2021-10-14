<template>
  <div id="adminDashboard">
   
    <BodyTitle title="Liste des utilisateurs" />
    <UserListComponent :isAction="true"/>

  </div>
</template>

<script>
import BodyTitle from "@/components/utils/BodyTitle.vue";
import UserListComponent from "@/components/List/UserListComponent2.vue";
export default {
  name: "AdminDashboard",
  components: {
    BodyTitle,
    UserListComponent,
  },
};
</script>
<style scoped>
</style>

