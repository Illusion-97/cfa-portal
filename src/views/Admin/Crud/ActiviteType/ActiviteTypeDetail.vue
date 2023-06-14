<template>
  <div class="container-fluid">
    <b-alert :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0" class="m-2">
      {{ message }}
    </b-alert>
    <button @click="colspanClick()" class="btn btn-outline-info mt-4 mb-4">
      <span v-if="!visible ">
        <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-down']" /> Ajouter activité type
      </span>
      <span v-else>
        <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'chevron-up']" />Fermer
      </span>

    </button>

    <b-collapse id="collapse-1" :visible=visible class="mt-2 mb-4">
      <b-card>
        <b-card-body class="d-flex justify-content-center">
          <v-app class="w-50">
            <form>
              <v-textarea rows="2" v-model="at.libelle" :error-messages="nameErrors" label="Libelle" required
                @input="$v.at.libelle.$touch()" @blur="$v.at.libelle.$touch()"></v-textarea>
              <v-text-field v-model="at.numeroFiche" :error-messages="numFicheErr" label="Numéro fiche" required
                type="number" @input="$v.at.numeroFiche.$touch()" @blur="$v.at.numeroFiche.$touch()"></v-text-field>
              <v-btn class="mr-4" :color="modifier?'warning' :'success'" @click="submit">
            
                <span v-if="!modifier ">
                  <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'plus']" /> 
                </span>
                <span v-else>
                  <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'pen']" />
                </span>
                {{modifier?'Modifier' :'Ajouter'}}
              </v-btn>
              <v-btn color="secondary" @click="clear">
                <font-awesome-icon class="mr-1 mt-1" :icon="['fas', 'broom']" /> 
                Vider
              </v-btn>
            </form>
          </v-app>
        </b-card-body>
      </b-card>
    </b-collapse>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(action)="row">
        <v-app>
          <div class="d-flex align-items-center justify-content-between">

            <v-btn class="m-0  widthBtn" color="error" @click="supprimer(row.item)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'trash']" />

              Supprimer
            </v-btn>
            <v-btn class="m-0 widthBtn" color="warning" dark @click="update(row.item)">
              <font-awesome-icon class="mr-1" :icon="['fas', 'pen']" /> Modifier
            </v-btn>
          </div>
          <v-btn class="mt-2" color="info" dark @click="showModal(row.item)">
            <font-awesome-icon class="mr-1" :icon="['fas', 'eye']" />
            Voir les compétences associées
          </v-btn>
        </v-app>
        <CompetenceProModal v-show="isModalVisible" @close="closeModal" :cps="competence" v-on:close="onClickClose" />
      </template>
    </b-table>
    <a
      @click="goBack()"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Précédent
    </a>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { activiteTypeApi } from '@/_api/activiteType.api.js'
import { fieldsActiviteType } from "@/assets/js/fields.js";
import ActiviteType from "../../../../models/ActiviteType"
import CompetenceProModal from "@/components/Modal/CompetenceProfessionnelleModal.vue";
import { competenceProfessionnelleApi } from "@/_api/competenceProfessionnelle.api.js";

export default {
  name: "activiteTypeDetail",
  mixins: [validationMixin],
  validations: {
    at: {
      libelle: { required },
      numeroFiche: { required }
    },

  },
  components: {
    CompetenceProModal,
  },
  data() {
    return {

      competence: [],
      libelle: "",
      numeroFiche: "",
      message: "",
      color: "success",
      visible: false,
      items: [
      ],
      at: new ActiviteType(0, 0, '', '', this.$route.params.id),
      fields: fieldsActiviteType,
      dismissCountDown: 0,
      modifier: false,
      isModalVisible: false,
      form :{
         cpsDto:[],
      },
     
    };
  },
  computed: {
    nameErrors() {
      const errors = []

      if (!this.$v.at.libelle.$dirty) return errors
      !this.$v.at.libelle.required && errors.push('Libelle is required.')
      return errors
    },
    numFicheErr() {
      const errors = []
      if (!this.$v.at.numeroFiche.$dirty) return errors
      !this.$v.at.numeroFiche.required && errors.push('Numéro Fiche is required.')
      return errors
    },
    cpsComputed(){
      return this.form.cpsDto;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      activiteTypeApi.getActiviteTypesByCursus(this.$route.params.id).then(response => {
        this.items = response;
      })
    },
    gotoCompetenceProActiviteType(items){
      this.$router.push({
        name: "admin_competence_pro",
        params: { id: items.id },
        
      });
    },
    update(at) {
      this.modifier = true;
      this.visible = true;
      this.at = at;
    },
    submit() {
      this.$v.$touch()
      if (this.modifier) {
        activiteTypeApi.update(this.at).then(response => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = "l'activité type " + response.libelle + " a été modifier avec success"
          this.visible = false;
          this.getList()
        }).catch(err => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
        })
      }
      else {
        console.log("else" + this.at);
        activiteTypeApi.save(this.at).then(response => {
          this.color = "success";
          this.dismissCountDown = 6;
          this.message = "l'activité type " + response.libelle + " a été ajouté avec success"
          this.visible = false;
          this.getList()
        }).catch(err => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
        })
      }

    },
    clear() {
      this.$v.$reset()
      this.at = new ActiviteType(0, 0, '', '', this.$route.params.id);
    },
    colspanClick() {
      this.visible = !this.visible
      if (this.visible == false) {
        this.clear()
        this.modifier = false;
      }
    },
    supprimer(item) {
      const h = this.$createElement;
      const titleVNode = h("div", {
        domProps: {
          innerHTML: "<h4 style='color: red'>Suppresion Activité Type</h4>",
        },
      });
      const messageVNode = h("div", { class: ["foobar"] }, [
        h("h5", { class: [] }, [
          "Voulez-vous supprimer l'activité type : ",
        ]),
        h("h5", { class: [] }, [
          item.libelle
        ])
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          centered: true,
          size: "md",
        })
        .then((value) => {
          if (value) {
            activiteTypeApi.deleteAt(item.id).then((response) => {
              if (response === "suppression effectuée") {
                this.color = "success";
                this.dismissCountDown = 6;
                this.message = "l'activité type " + item.libelle + " a été supprimé avec success"
                this.visible = false;
                this.getList()
              }
              else {
                this.color = "danger";
                this.dismissCountDown = 8;
                this.message = response;
              }
            });
          }
        })
        .catch((err) => {
          this.color = "danger";
          this.dismissCountDown = 8;
          this.message = err;
        });
    },
      async showModal(item) {
        this.isModalVisible = true;
        this.competence = await competenceProfessionnelleApi.getAllByIdActiviteType(item.id);

      },
      closeModal() {
        this.isModalVisible = false;
      },
      goBack() {
        this.$router.go(-1);
      },
      onClickClose(cps) {
        this.form.cpsDto = cps;
      },
      removeFromlist(index) {
        this.form.cpsDto.splice(index, 1);
      },
      clickCp(){
        this.isModalVisible = true;
      }
  },
};
</script>
<style>
.v-application--wrap {
  min-height: fit-content !important;
}
</style>
<style scoped src="@/assets/styles/CrudDetail.css">

</style>
<style scoped>
.widthBtn {
  width: 49%;
}
</style>
