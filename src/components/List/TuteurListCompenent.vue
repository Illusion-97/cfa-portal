<template>
  <div id="adminDashboard" class="container-fluid">
      
    <!-- BARRE DE RECHERCHE -->
    <div class="d-flex flex-row align-items-start">
      <h2 class="p-2">Liste des étudiants</h2>
      <form class="form-inline p-2" @submit="submit">
        <input
          id="saisie"
          name="saisie"
          type="text"
          class="form-control"
          placeholder="Rechercher"
          v-model="saisie"
        />
        <button class="btn-submit" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" class="icon" />
        </button>
      </form>
    </div>

    <!-- TABLEAU -->
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(etudiantFields)="row">
        {{ row.item.nom }}
        {{ row.item.prenom }}
        {{ row.item.email }}
        {{ row.item.telephone }}
      </template>

      <template #cell(action)>
        <div class="div-btn-right">

          <!-- BOUTON AFFICHER -->
          <b-button id="tableau" size="sm" class="mr-2">
            <i class="bi bi-eye"></i>
            AFFICHER
          </b-button>
        </div>
      </template>
    </b-table>

    <paginate
      :page-count="pageCount"
      :page-range="1"
      :margin-pages="2"
      :click-handler="pageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination float-right'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    >
    </paginate>
  </div>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { etudiantFields } from "@/assets/js/fieldsTuteur.js";
export default {
  name: "UserListComponent",
  props: {
    isAction: {
      type: Boolean,
      default: false,
    },
    utilisateurProp: {
      default: null,
    },
  },
  watch: {
    utilisateurProp() {
      if (this.utilisateurProp != null)
        this.utilisateur_input = `${this.utilisateurProp.prenom}`;
    },
  },

  data() {
    return {
      perPage: 7,
      pageCount: 0,
      saisie: "",
      users: [],
      selected_role: "",

      //   AFFICHAGE DONNEE EN DURE
      items: [
        // {
        //   nom: "totonom",
        //   prenom: "toto",
        //   email: "totomail",
        //   telephone: "totophone",
        // },
        // {
        //   nom: "titinom",
        //   prenom: "titi",
        //   email: "titimail",
        //   telephone: "titiphone",
        // },
      ],
      fields: etudiantFields,
    };
  },
  computed: {
    nbPageComputed() {
      return this.pageCount;
    },
  },
  created() {
    this.refreshList();
  },

  methods: {
    assigneTableItems(users) {
      this.items = [];
      users.forEach((e) => {
        let item = {
          nom: e.nom,
          prenom: e.prenom,
          login: e.login,
          rolesDto: e.rolesDto,
          civilite: e.civilite,
          telephone: e.telephone,
          adresse:
            e.adresseDto != null
              ? e.adresseDto.libelle +
                " " +
                e.adresseDto.codePostal +
                " " +
                e.adresseDto.ville
              : "Pas d'adresse",
          dateDeNaissance: e.dateDeNaissance,
        };
        this.items.push(item);
      });
    },

    submit(e) {
      e.preventDefault();
      this.refreshList();
      this.saisie = "";
    },
    pageChange(pageNum) {
      utilisateurApi
        .getByRoleByPage(
          this.selected_role,
          pageNum - 1,
          this.perPage,
          this.saisie
        )
        .then((response) => this.assigneTableItems(response));
    },
    refreshList() {
      console.log(this.selected_role);
      utilisateurApi
        .getByRoleByPage(this.selected_role, 0, this.perPage, this.saisie)
        .then((response) => {
          this.assigneTableItems(response), console.log(response);
        });

      utilisateurApi
        .getCountByRole(this.selected_role, this.saisie)
        .then(
          (response) => (this.pageCount = Math.ceil(response / this.perPage))
        );
    },
  },
};
</script>
<style scoped src="@/assets/styles/CrudListComponent.css"></style>
<style scoped lang="css">
</style>