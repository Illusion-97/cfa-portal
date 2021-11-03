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

    <!-- <b-card no-body id="my-card">
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
          <span class="font-weight-bold col-md-2">Rôle :</span>
          <span class="col-md-10"><p v-for="role in user.rolesDto" :key="role.id">{{ role.intitule }}</p> </span>
        </b-card-text>

       
    </b-card> -->
    <div class="card mb-3 custom-card">
      <div class="row no-gutters">
        <div class="col-md-4 text-center identity">
          <span class="h1">{{ user.nom | uppercase }}</span>
          <span class="h2">{{ user.prenom | capitalize }}</span>
        </div>
        <div class="col-md-8">
          <div class="float-right dropleft">
            <span
              class=""
              id="navbardrop"
              data-toggle="dropdown"
              style="cursor:pointer;"
            >
              <b-icon icon="gear" />
            </span>
            <div class="dropdown-menu p-0 rounded-0">
              <span @click="updateUser()" class="icon-link dropdown-item">
                Modifier
              </span>
              <span class="dropdown-item" @click="deleteUser()">Supprimer</span>
            </div>
          </div>
          <div class="card-body user-info">
            <p>
              <span class="font-weight-bold mr-2">&#64;</span>: {{ user.login }}
            </p>
            <p>
              <span class="mr-2"> <b-icon icon="geo-alt-fill" /> </span>:
              {{ adresseDto | fullAddresse }}
            </p>
            <p>
              <span class="mr-2"> <b-icon icon="telephone-fill"/></span>:
              {{ user.telephone }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
export default {
  name: "UserDetail",
  components: {},
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
      utilisateurApi
        .deleteUtilisateur(this.$route.params.id)
        .then(() => this.goBack());
    },
  },
  created() {
    utilisateurApi.getById(this.$route.params.id).then((response) => {
      this.user = response;
      this.adresseDto = this.user.adresseDto;
    });
  },
};
</script>

<style scoped>
/* #my-card {
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
} */

.a {
  outline: none;
  text-decoration: none;
}

#dawan-logo {
  width: 15em;
  float: left;
}

#iconde-rewrite {
  width: 2em;
}

.mon-container {
  margin-bottom: 5em;
}

.custom-card {
  width: 80%;
  margin: 0 auto;
  padding: 1em;
  border-radius: 0;
}

.identity {
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-right: 1px solid rgb(95, 95, 95);
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.indentity {
  display: inline;
}

.link {
  width: 1em;
  color: black;
  text-decoration: none;
  display: block;
}

.dropdown-item {
  cursor: pointer;
}
</style>
