<template>
  <!-- TEMPLATE TABLEAU -->
  <div>
    <section>
      <div class="container">
        <div class="row d-fle">
          <div class="" v-if="showBtn == true" id="show-btn">
            <!-- <a :href="btnLink" class="button">{{ btnTxt }}</a> -->
            <router-link :to="{name:btnLink}" class="button">{{btnTxt}}</router-link>
          </div>
          <div class="my-3" v-if="rows != 0" :class="display">
            <b-form inline class="d-flex justify-content-end">
              <label for="pageSelect" class="mr-sm-2">Affichage :</label>
              <b-form-select id="pageSelect" v-model="per_page" class="border-0 opts" size="sm">
                <b-form-select-option :value="Math.floor(rows * 0.25)">
                  {{ (rows * 0.25) | formatNumber }} sur
                  {{ rows }}
                </b-form-select-option>
                <b-form-select-option :value="Math.floor(rows * 0.5)">
                  {{ (rows * 0.5) | formatNumber }} sur
                  {{ rows }}
                </b-form-select-option>
                <b-form-select-option :value="Math.floor(rows * 0.75)">
                  {{ (rows * 0.75) | formatNumber }} sur
                  {{ rows }}
                </b-form-select-option>
                <b-form-select-option :value="rows">
                  Tout afficher
                </b-form-select-option>
              </b-form-select>
            </b-form>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <b-table id="my-table" striped small :items="items" :fields="fields" :per-page="per_page"
              :current-page="current_page">

              <template #cell(formationDto)="data">
                <router-link :to="{name:'intervention-detail',params:{id:data.item.id}}" style="color:black;">
                  <span v-if="data.item.formationDto.titre === null">Aucune formation</span>
                  <span v-else>{{ data.item.formationDto.titre | capitalize }}</span>
                </router-link>
              </template>

              <template #cell(titre)="data">
                <router-link :to="{name:'formation-detail',params:{id:data.item.id}}" style="color:black;">
                  {{ data.value | capitalize }}
                </router-link>
              </template>

              <template #cell(eleve)="data">
                {{ data.value.nom | uppercase }}
                {{ data.value.prenom | capitalize }}
              </template>

              <template #cell(dateDebut)="data">
                {{ data.value | formatDate }}
              </template>

              <template #cell(dateFin)="data">
                {{ data.value | formatDate }}
              </template>

              <template #cell(status)="data">
                <span v-if="data.value == 'CONFIRME'" class="text-success">
                  Confirmé
                </span>
                <span v-else-if="data.value == 'REFUSE'" class="text-danger">
                  Refusé
                </span>
                <span v-else-if="data.value == 'EN_ATTENTE'" class="text-warning">
                  En attente
                </span>
              </template>

              <template #cell(file_name)>
                {{data.value}}
              </template>

              <template #cell(name_dl)="data">
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon text-success"
                  @click="download_file(data.value)" />
              </template>

              <template #cell(name_delete)="data">
                <font-awesome-icon :icon="['fas', 'times']" class="icon text-danger" @click="delete_file(data.value)" />
              </template>


              <template #cell(telecharger)>
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon text-success" />
              </template>

              <template #cell(supprimer)>
                <font-awesome-icon :icon="['fas', 'times']" class="icon text-danger" />
              </template>

              <template #cell(modifier)>
                <font-awesome-icon :icon="['fas', 'edit']" class="icon text-secondary" />
              </template>

              <template #cell(modifierItv)="data">
                <router-link :to="{name:'modifier-intervention',params:{id:data.item.id}}">
                  <font-awesome-icon :icon="['fas', 'edit']" class="icon text-secondary" />
                </router-link>
              </template>
            </b-table>
          </div>
        </div>

        <b-pagination class="pages ml-auto border-0" v-model="current_page" :total-rows="rows" :per-page="per_page"
          aria-controls="my-table" size="sm">
        </b-pagination>
      </div>
    </section>
  </div>
</template>
<script>
  // == Pour importer les entetes du tableau:
  // import {nom_variable} from "fields.js" <= les en-tetes du tableau devront se situé dans le fichier fields.js
</script>

<script>
  import { Role } from '../../_helpers/role.js'
  export default {
    name: "TableTemplate",
    props: {
      items: {
        // valeur des champs du tableau
        type: [Array, Function],
        required: true,
        default: () => []
      },
      perPage: {
        // nb de ligne par page
        type: Number,
        required: true,
        default: 10,
      },
      currentPage: {
        type: Number,
        required: false,
        default: 1
      },
      fields: {
        // en tete
        type: [Array, Object],
        required: true,
      },
      btnTxt: {
        // contenu du bouton
        type: String,
      },
      btnLink: {
        // chemin de redirection vers une autre page
        type: String,
      },
      showBtn: {
        // affiche ou non le bouton
        type: Boolean,
        default: false,
      },
      length : {
        type : Number,
        default : 0
      }
    },
    data() {
      return {
        per_page: this.perPage, // nb d'items par pages
        current_page: this.currentPage, // page courante
        role: Role,
      };
    },
    computed: {
      rows() {
        return this.length;
      },
      display() {
        if (this.length <= 10)
          return 'd-none'
      }
    },

  };
</script>
<style scoped>
  #my-table {
    text-align: center;
  }

  #show-btn {
    margin-bottom: 2em;
  }

  .button {
    border: 1px solid black;
    border-radius: 3px;
    background-color: inherit;
    text-decoration: none;
    color: black;
    padding: 1.5px 10px;
    margin-bottom: 1em;
  }

  .opts,
  label {
    color: black;
  }

  .icon:hover {
    cursor: pointer;
  }

  .page-item>.page-link {
    color: black;
  }
</style>