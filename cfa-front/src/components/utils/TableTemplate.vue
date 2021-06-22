<template>
  <!-- TEMPLATE TABLEAU -->
  <div>
    <section>
      <div class="container">

        <div class="row my-3">
          <div class="col-md-12">
            <form action="" class="form form-inline float-right" @submit="onSubmit"
              @input="$emit('input',$event.target.value)">
              <input type="text" name="search" id="" class="form-control mr-2" v-bind:value="key"
                placeholder="Rechercher.." />
              <input type="submit" value="Rechercher" class="btn btn-info" />
            </form>
          </div>
        </div>

        <div class="row d-flex justify-content-between">
          <div v-if="showBtn == true" id="show-btn" class="col-md-12">
            <router-link :to="{ name: btnLink }" class="button">
              {{ btnTxt }}
            </router-link>
          </div>
          <div v-if="rows != 0" :class="display">
            <b-form inline class="">
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
                <router-link :to="{
                    name: 'intervention-detail',
                    params: { id: data.item.id },
                  }" style="color:black;">
              
                  <span>{{ data.item.formationDto.titre | capitalize}}</span>
                </router-link>
              </template>

              <template #cell(titre)="data">
                <router-link :to="{
                    name: 'formation-detail',
                    params: { id: data.item.id },
                  }" style="color:black;">
                  {{ data.value | capitalize }}
                </router-link>
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
                {{ data.value }}
              </template>

              <template #cell(name_dl)="data">
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon text-success"
                  @click="download_file(data.value)" />
              </template>

              <template #cell(name_delete)="data">
                <font-awesome-icon :icon="['fas', 'times']" class="icon text-danger" @click="delete_file(data.value)" />
              </template>

              <template #cell(adresseDto)="data">
                {{data.value | fullAddresse}}
              </template>
              <template #cell(entrepriseDto)="data">
                {{data.value.raisonSociale}}
              </template>
              <template #cell(formateurReferentDto)="data">
                {{data.value | fullName}}
              </template>
              <template #cell(managerDto)="data">
                {{data.value | fullName}}
              </template>
              <template #cell(promotionsDto)="data">
                <ul v-for="promo in data.value" :key="promo.id">
                  <span>{{promo.nom}}</span>
                </ul>
              </template>
              <template #cell(groupesDto)="data"> 
                <ul v-for="grp in data.value" :key="grp.id">
                  <span>{{grp.nom}}</span>
                </ul>
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
                <router-link :to="{ name: 'modifier-intervention',
                    params: { id: data.item.id }, }">
                  <font-awesome-icon :icon="['fas', 'edit']" class="icon text-secondary" />
                </router-link>
              </template>

            </b-table>
          </div>
        </div>
        <paginate :page-count="rows" :page-range="2" :margin-pages="2" :click-handler="clickHandler" :prev-text="'Prev'"
          :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'"
          :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
          :next-link-class="'page-link'" :active-class="'active'">
        </paginate>
      </div>
    </section>
  </div>
</template>
<script>
  // == Pour importer les entetes du tableau:
  // import {nom_variable} from "fields.js" <= les en-tetes du tableau devront se situé dans le fichier fields.js
</script>

<script>
  export default {
    name: "TableTemplate",
    model: {
      prop: "keyword",
      event: "input",
    },
    props: {
      items: {
        // valeur des champs du tableau
        type: [Array, Function],
        required: true,
        default: () => [],
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
        default: 1,
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
      length: {
        // longueur total de la liste
        type: Number,
        default: 0,
      },
      clickHandler: {
        // methode quand la page est cliqué
        type: Function,
        required: true
      },
      keyword: { // saisie pour la recherche
        type: String,
        default: ""
      },
      onSubmit: { // methode pour soumettre la recherche
        type: Function,
        required: false,
        default: () => null
      }
    },
    data() {
      return {
        per_page: this.perPage, // nb d'items par pages
        current_page: this.currentPage, // page courante
      };
    },
    computed: {
      rows() {
        return this.length;
      },
      display() {
        if (this.length <= 10) return "d-none";
      },
      key: {
        get() {
          return this.keyword;
        },
        set(keyword) {
          this.keyword = keyword;
          // this.$emit('emitChange',this.keyword)
        }
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