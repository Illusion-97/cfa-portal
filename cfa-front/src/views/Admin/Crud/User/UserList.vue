<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by login"
          v-model="login"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchLogin"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(users, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.login }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User</h4>
        <div>
          <label><strong>Login:</strong></label> {{ currentUser.login }}
        </div>
        <div>
          <label><strong>Password:</strong></label> {{ currentUser.password }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentUser.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning" :href="'/users/' + currentUser.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { utilisateurApi } from "../../../../_api/utilisateur.api";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      login: "",
    };
  },
  methods: {
    retrieveUsers() {
      utilisateurApi
        .getAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },

    removeAllUsers() {
      UtilisateurDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchLogin() {
      UtilisateurDataService.findByLogin(this.login)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
