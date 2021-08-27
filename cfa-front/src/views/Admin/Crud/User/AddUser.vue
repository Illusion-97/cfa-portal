<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_dashboard' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <BodyTitle :title="vue_title" />

    <b-form class="form mb-5" @submit="submit">
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Prénom :</label>
          <div class="col-5 pr-5">
            <b-form-input v-model="form.prenom" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Nom :</label>
          <div class="col-5 pr-5">
            <b-form-input v-model="form.nom" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Login :</label>
          <div class="col-5 pr-5">
            <b-form-input v-model="form.login" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Password :</label>
          <div class="col-5 pr-5">
            <b-form-input v-model="form.password" required></b-form-input>
          </div>
        </b-form-row>
      </b-form-group>

      <!-- Roles -->
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-1">Roles :</label>
          <div class="col-5">
            <div class="mon-group" v-if="rolesComputed">
              <div
                class="d-inline p-2 border border-dark rounded mr-1"
                v-for="(role, index) in rolesComputed"
                :key="role.id"
              >
                {{ role.intitule }}
                <span @click="removeFromlist(index)" class="croix-delete"
                  >x</span
                >
              </div>
            </div>
          </div>
          <a class="btn btn-primary col-1" @click="showModal()">Ajouter</a>
        </b-form-row>
      </b-form-group>

      <!-- Adresse -->
      <b-form-group>
        <div class="mb-4 row">
          <label class="col-1">Adresse :</label>
          <!-- <a class="btn btn-primary offset-5 col-1" @click="setAdresseVisibility()">{{btn_adresse}}</a> -->
        </div>

        <div :class="{ collapse: !isAdresseNew }">
          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-1">Numero</label>
              <div class="col-5 pr-5">
                <b-form-input v-model="form.adresseDto.numero"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-1">Rue</label>
              <div class="col-5 pr-5">
                <b-form-input v-model="form.adresseDto.rue"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-1">Ville</label>
              <div class="col-5 pr-5">
                <b-form-input v-model="form.adresseDto.ville"></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>

          <b-form-group>
            <b-form-row class="text-align-left">
              <label class="col-1">Code Postal</label>
              <div class="col-5 pr-5">
                <b-form-input
                  v-model="form.adresseDto.codePostal"
                  required
                ></b-form-input>
              </div>
            </b-form-row>
          </b-form-group>
        </div>

        <AdresseListComponent
          v-on:click-list="onClickChildAdresseList"
          :adresseProp="adresse_input"
          :class="{ collapse: isAdresseNew }"
        />
      </b-form-group>

      <EntrepriseListComponent
        v-on:click-list="onClickChildEntrepriseList"
        :entrepriseProp="entreprise_input"
      />

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    <RoleModal
      v-show="isModalVisible"
      @close="closeModal"
      :rolesProp="rolesComputed"
      v-on:close="onClickClose"
    />
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
import RoleModal from "@/components/Modal/RoleModal.vue";

export default {
  name: "AddUser",
  components: {
    BodyTitle,
    AdresseListComponent,
    EntrepriseListComponent,
    RoleModal,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Création d'un utilisateur",

      form: {
        id: null,
        prenom: "",
        nom: "",
        login: "",
        password: "",
        rolesDto: [],
        adresseDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        entrepriseDto: null,
      },

      entreprise: null,
      isModalVisible: false,

      isAdresseNew: true,
      btn_adresse: "Existante",
    };
  },
  computed: {
    rolesComputed() {
      return this.form.rolesDto;
    },
    adresse_input() {
      return this.adresse;
    },
    entreprise_input() {
      return this.entreprise;
    },
  },
  methods: {
    onClickChildAdresseList(adresse) {
      this.form.adresseDto = adresse;
    },
    onClickChildEntrepriseList(entreprise) {
      this.form.entrepriseDto = entreprise;
    },
    submit(e) {
      e.preventDefault();

      utilisateurApi
        .save(this.form)
        .then(() => this.$router.push({ name: "admin_dashboard" }))
        .catch((error) => {
          if(error.response.data == "Un utilisateur utilise déjà cette adresse mail") console.log("meme adresse")
        });
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onClickClose(roles) {
      this.form.rolesDto = roles;
    },
    removeFromlist(index) {
      this.form.rolesDto.splice(index, 1);
    },
    setAdresseVisibility() {
      this.isAdresseNew = !this.isAdresseNew;
      if (this.btn_adresse == "Existante") this.btn_adresse = "Nouvelle";
      else this.btn_adresse = "Existante";
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      console.log(this.$route.params.id);
      utilisateurApi.getById(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Modification d'un utilisateur";
        this.btn_form_text = "Modifier";
        this.adresse = response.adresseDto;
        this.entreprise = response.entrepriseDto;
        this.role = response.rolesDto;
      });
    }
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

#saisie {
  width: 70%;
  margin-right: 5%;
}

.mon-btn {
  width: 80%;
}

.croix-delete:hover {
  cursor: pointer;
}
</style>
