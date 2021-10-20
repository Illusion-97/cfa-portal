<template>
  <!-- TEMPLATE TABLEAU -->
  <div>
    <section>
      <div class="container-fluid">

        <div class="row my-3" v-if="showSearchBar == true">
          <div class="col-md-12">
            <form action="" class="form form-inline float-left" @submit="onSubmit"
              @input="$emit('input',$event.target.value)">
              <input type="search" name="search" id="keyword" class="form-control" v-bind:value="key"
                placeholder="Rechercher.." />
              <button class="btn-key" type="submit">
                <font-awesome-icon :icon="['fas','search']" class="icon"></font-awesome-icon>
              </button>
            </form>
          </div>
        </div>
        <div class="row">
          <router-link :to="{ name: btnLink }" class="button ml-auto" v-if="showBtn == true" id="show-btn">
              {{ btnTxt }}
          </router-link>
        </div>

        <div class="row">
          <div class="col-md-12">
            <b-table id="my-table" striped :items="items" :fields="fields" :per-page="per_page"
              :current-page="current_page">

              <template #cell(admin_interventions)="data">
                <router-link :to="{
                    name: 'admin_intervention_detail',
                    params: { id: data.item.id },
                  }" style="color:black;">

                  <span>{{ data.item.formationDto.titre | capitalize}}</span>
                </router-link>
              </template>

              <template #cell(referent_interventions)="data">
                <router-link :to="{
                    name: 'referent_intervention_detail',
                    params: { id: data.item.id },
                  }" style="color:black;">

                  <span>{{ data.item.formationDto.titre | capitalize}}</span>
                </router-link>
              </template>

              <template #cell(formateur_interventions)="data">
                <router-link :to="{
                    name: 'formateur_intervention_detail',
                    params: { id: data.item.id },
                  }" style="color:black;">

                  <span>{{ data.item.formationDto.titre | capitalize}}</span>
                </router-link>
              </template>

              <template #cell(titre)="data">
                <router-link :to="{
                    name: 'admin_formation_detail',
                    params: { id: data.item.id },
                  }" style="color:black;">
                  {{ data.value | capitalize }}
                </router-link>
              </template>

              <!-- #Date slot -->
              <template #cell(dateDebut)="data">
                {{ data.value | formatDate }}
              </template>

              <template #cell(dateFin)="data">
                {{ data.value | formatDate }}
              </template>
              <!-- #end Date slot -->

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
              <!-- #Etudiant slot -->
              <template #cell(etudiant)="data">
                {{data.item | fullName}}
              </template>
              <template #cell(adresseDto)="data">
                {{data.value | fullAddresse}}
              </template>
              <template #cell(entrepriseDto)="data">
                {{data.value.raisonSociale}}
              </template>
              <template #cell(formateurReferentDto)="data">
                <span v-if="data.value == null ">Non précisé</span>
                <span v-else>{{data.value | fullName}}</span>
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
              <!-- #end Etudiant slot -->
              <!-- #Absence slot -->
              !-- <template #cell(etudiantDto)="data">
                {{data.value | fullName}}
              </template>
              <!-- #end Absence slot -->

              <!-- <template #cell(telecharger)>
                <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon text-success" />
              </template>

              <template #cell(supprimer)>
                <font-awesome-icon :icon="['fas', 'times']" class="icon text-danger" />
              </template>

              <template #cell(modifier)>
                <font-awesome-icon :icon="['fas', 'edit']" class="icon text-secondary" />
              </template>

              <template #cell(modifierItv)="data">
                <router-link :to="{ name: 'admin_intervention_update',
                    params: { id: data.item.id }, }">
                  <font-awesome-icon :icon="['fas', 'edit']" class="icon text-secondary" />
                </router-link>
              </template> -->

            </b-table>
          </div>
        </div>
        <paginate :page-count="page" :page-range="2" :margin-pages="2" :click-handler="clickHandler" :prev-text="'Prev'"
          :next-text="'Next'" :container-class="'pagination float-right'" :page-class="'page-item'" :page-link-class="'page-link'"
          :prev-class="'page-item'" :next-class="'page-item'" :prev-link-class="'page-link'"
          :next-link-class="'page-link'" :active-class="'active'" v-if="isPaginate" >
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
      pageCount: {
        // nombre de pages
        type: Number,
        default: 0,
      },
      clickHandler: {
        // methode quand la page est cliqué
        type: Function,
        required: false
      },
      keyword: { // saisie pour la recherche
        type: String,
        default: ""
      },
      onSubmit: { // methode pour soumettre la recherche
        type: Function,
        required: false,
        default: () => null
      },
      isPaginate: { // affiche ou non la pagination
        type: Boolean,
        default: true,
      },
      showSearchBar:{ // affiche ou non la barre de recherche
         type : Boolean,
         default : true,
         required : false
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
      page() {
        return this.pageCount;
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
/* 
  #show-btn {
    margin-bottom: 2em;
    float: right;
  } */

  #keyword {
    width: 300px;
    border-radius: 100px;
  }

  .btn-key {
    border: 0;
    background-color: inherit;
    border-radius: 100%;
    width: 2.5em;
    margin-left: -3em;
    color: brown;
  }

  .button {
    border: 1px solid black;
    border-radius: 3px;
    background-color: inherit;
    text-decoration: none;
    color: black;
    padding: 1.5px 10px;
    margin-bottom: 1em;
    float: right;
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