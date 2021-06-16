<template>
 
  <div class="submit-form">
     <BodyTitle title="Modifier un utilisateur" />
    <div v-if="!submitted">
      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input
          type="text"
          class="form-control"
          id="prenom"
          required
          v-model="user.prenom"
          name="prenom"
        />
      </div>
      <div class="form-group">
        <label for="nom">nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          required
          v-model="user.nom"
          name="nom"
        />
      </div>
      <div class="form-group">
        <label for="login">Login</label>
        <input
          type="text"
          class="form-control"
          id="login"
          required
          v-model="user.login"
          name="login"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Enregistrer</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Modifier</button>
    </div>
  </div>
</template>

<script>
import UtilisateurDataService from "../../../../_api/utilisateur.api";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  name: "EditUser",
  components: {
    BodyTitle,
  },
  data() {
    return {
      user: {
        id: null,
        login: "",
        password: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        login: this.user.login,
        password: this.user.password
      };

      UtilisateurDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>