<template>
<!-- POUR CE COMPONENT FAUDRA COPIER/COLLER LE CONTENU DE CETTE PAGE ET AJOUTER VOS TRUCS. C'EST UN PEU DE LA MERDE POUR L'INTANT MAIS ON VERRA POUR PLUS TARDS. J'AI MIS DES COMMENTAIRES POUR SAVOIR COMMENT MANIP AVC VOS TRUCS -->
  <div>
    <BodyTitle title="nom_de_la_page" />
    <section>
      <div class="container">
        <div class="row">

          <div class="my-3 ml-auto">
            <label for="pageSelect" class="mr-sm-2">Affichage :</label>
            <b-form-select id="pageSelect" v-model="perPage" :options="itemLength" class="border-0 opts" size="sm">
            </b-form-select>
          </div>

          <div class="offset-md-1 col-md-10 offset-md-1">
            <b-table id="my-table" striped fixed small :items="items" :fields="fields" :per-page="perPage"
              :current-page="currentPage">
              <!-- Modifier une colonne precise (optionnel si tu veux rien modifier) -->
              <!-- <template #cell(item_column)="data">
                  {{ data.value }}
              </template> -->
            </b-table>
          </div>

          <b-pagination class="pages ml-auto border-0" v-model="currentPage" :total-rows="rows" :per-page="perPage"
            aria-controls="my-table" size="sm">
          </b-pagination>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import BodyTitle from "./BodyTitle.vue";
  // Pour importer un fichier d'un tableau de donnée en .json
  // import nom_variable from 'fichier.json' <= jeu de donnée / TODO: a degager lorsqu'on aura une BDD
  // Pour importer les données du champs
  // import {nom_variable} from "fields.js" <= les champs du tableau devront se situé dans le fichier fields.js
  // Pour importer les otions d'affichage du tableau
  // import {nom_variable} from 'itemLength.js  <= les opt devront se situé dans le fichier itemLength.js
  export default {
    name: "TemplateTable",
    components: {
      BodyTitle
    },
    data() {
      return {
        items: "", //tableau de donnée
        fields: "", // champs
        itemLength: "", // options d'affichage longueur du tableau
        perPage: null, // nb ligne par page
        currentPage: 1, // page courante. Le laisser à 1
      };
    },
    methods: {},
    computed: {
      rows() {
        return this.items.length;
      },
    },
  };
</script>
<style scoped>
  .opts,
  label {
    color: black;
  }

  .icon:hover {
    cursor: pointer;
  }
</style>