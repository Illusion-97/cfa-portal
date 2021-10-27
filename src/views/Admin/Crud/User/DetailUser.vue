<template>
  <div class="container-fluid">
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </a>

    <b-card no-body id="my-card">
        <b-card-header>
          <span class="">Details</span>
          <div class="float-right mr-2" style="font-size:20px">
          <a class="" href="#" id="navbardrop" data-toggle="dropdown">
            <font-awesome-icon
              :icon="['fas', 'sliders-h']"
              class="icon text-light"
            />
          </a>
          <div class="dropdown-menu dropleft rounded-0">
            <span v-on:click="updateUser()" class="icon-link dropdown-item">
              Modifier
            </span>
            <span v-on:click="deleteUser()" class="icon-link dropdown-item">
              Supprimer
            </span>
          </div>
        </div>
        </b-card-header>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Id :</span>
          <span class="col-md-4">{{ user.id }}</span>
          <span class="font-weight-bold col-md-2">Prénom : </span>
          <span class="col-md-4">{{ user.prenom }}</span>
        </b-card-text>

        <b-card-text class="identity row ml-5">
          <span class="font-weight-bold col-md-2">Nom :</span>
          <span class="col-md-4">{{ user.nom }}</span>
          <span class="font-weight-bold col-md-2">Login : </span>
          <span class="col-md-4">{{ user.login }}</span>
        </b-card-text>

         <b-card-text class="identity row ml-5">
        <span class="font-weight-bold col-md-2">Adresse :</span>
        <span class="col-md-4"
          >{{ adresseDto.numero }} {{ adresseDto.rue }}, {{ adresseDto.codePostal }}, {{ adresseDto.ville }} </span
        >
        <span class="font-weight-bold col-md-2">Entreprise :</span>
        <span class="col-md-4"
          >{{ entrepriseDto.raisonSociale }}</span
        >
      </b-card-text>


        <b-card-text class="identity row ml-5">
          <!-- <span class="font-weight-bold col-md-2">Mot de passe :</span>
          <span class="col-md-4">{{ user.password }} </span> -->
          <span class="font-weight-bold col-md-2">Rôle :</span>
          <span class="col-md-10"><p v-for="role in user.rolesDto" :key="role.id">{{ role.intitule }}</p> </span>
        </b-card-text>

       
    </b-card>

  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
  name: "UserDetail",
  components: {
  },
  data() {
    return {
      userId: this.$route.params.id,
      user: {},
      adresseDto: {},
      entrepriseDto: {},
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
     updateUser() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_user_update",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_user_update",
        });
      } else if (route[0] == "formateur") {
        this.$router.push({
          name: "formateur_user_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_user_update",
        });
      }
    },
    deleteUser() {
      utilisateurApi.deleteUtilisateur(this.$route.params.id).then(() => this.goBack());
    },
  },
  created() {
    utilisateurApi.getById(this.$route.params.id).then(response => {this.user = response; this.adresseDto = this.user.adresseDto;});
  },
};
</script>

<style scoped>
#my-card {
  width: 90%;
  padding-bottom: 1em;
  margin-bottom: 5em;
  margin-top: 5em;
}

#my-card > .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 25px;
}

.card-text {
  display: flex;
  justify-content: space-between;
}

.card-text > span {
  display: inline-block;
  width: 40em;
  padding-left: 3em;
}
</style>
