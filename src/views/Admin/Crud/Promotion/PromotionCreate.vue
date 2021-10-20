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

    <BodyTitle :title="vue_title" class="mb-5"/>    

    <b-form class="form mb-5 " @submit="submit">
      <b-form-row class="text-align-left">
        <!-- Nom -->
        <label class="col-2">Nom de la promotion</label>
        <div class="col-3">
          <b-form-input v-model="form.nom" required></b-form-input>
        </div>

        <!-- Cursus -->
        <label class="offset-1 col-2">Cursus</label>
        <div class="col-3">
          <b-form-input v-model="form.cursusDto.titre" disabled="disabled" required></b-form-input>
        </div>
        <a class="btn btn-primary col-1" @click="showCursusModal">Cursus</a>
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Centre -->
        <label class="col-2">Centre</label>
        <div class="col-3">
          <select
            class="form-control"
            aria-label="Default select example"
            v-model="form.centreFormationDto"
            required
          >
            <option
              v-for="centre in centres"
              :key="centre.id"
              :value="centre"
              >{{ centre.adresseDto.ville }}</option
            >
          </select>
        </div>

        <!-- Referent -->
        <label class="offset-1 col-2">Referent</label>
        <div class="col-3">
          <b-form-input v-model="referent" disabled="disabled" required></b-form-input>
        </div>
        <a
          class="btn btn-primary col-1"
          @click="showUtilisateurModal('formateur')"
          >Référent</a
        >
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Dates Debut -->
        <label class="col-2">Date de début</label>
        <div class="col-3">
          <b-form-datepicker
            locale="fr"
            v-model="form.dateDebut"
            :required="true"
          ></b-form-datepicker>
        </div>

        <!-- CEF -->
        <label class="offset-1 col-2">CEF</label>
        <div class="col-3">
          <b-form-input v-model="cef" disabled="disabled" required></b-form-input>
        </div>
        <a class="btn btn-primary col-1" @click="showUtilisateurModal('cef')"
          >CEF</a
        >
      </b-form-row>

      <b-form-row class="text-align-left">
        <!-- Dates Fin -->
        <label class="col-2">Date de fin</label>
        <div class="col-3">
          <b-form-datepicker
            locale="fr"
            v-model="form.dateFin"
            :required="true"
          ></b-form-datepicker>
        </div>
      </b-form-row>

      <!-- Etudiants -->
      <b-form-group>
        <b-form-row class="text-align-left">
          <label class="col-2">Etudiants</label>
          <div class="col-9">
            <div class="mon-group" v-if="form.etudiantsDto">
              <!-- <label class="form-label">Les étudiants du groupe</label>  -->
              <div
                class="d-inline p-2 border border-dark rounded mr-1"
                v-for="(etudiant, index) in form.etudiantsDto"
                :key="etudiant.id"
              >
                {{ etudiant.prenom }} {{ etudiant.nom }}
                <span @click="removeFromlist(index)" class="croix-delete"
                  >x</span
                >
              </div>
            </div>
          </div>
          <a class="btn btn-primary col-1" @click="showEtudiantModal()"
            >Etudiants</a
          >
        </b-form-row>
      </b-form-group>

      <!-- Interventions   -->
      <b-form-row class="text-align-left">
        <label class="col-2">Interventions :</label>
        <!-- <div class="col-5">test</div> -->
        <a class="btn btn-primary offset-9 col-1" @click="showInterventionModal"
          >Interventions</a
        >
      </b-form-row>

      <table class="table col-12">
          <thead class="">
            <tr>
              <th>Titre</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Formateur</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="intervention in form.interventionsDto"
              :key="intervention.id"
            >
              <td>{{ intervention.formationDto.titre }}</td>
              <td>{{ intervention.dateDebut }}</td>
              <td>{{ intervention.dateFin }}</td>
              <td><div v-for="formateur in intervention.formateursDto" :key="formateur.id">{{ formateur.prenom }} {{formateur.nom}}</div></td>
            </tr>
          </tbody>
        </table>

      <div class="offset-10 col-3 pr-5 pl-0">
        <button type="submit" class="btn btn-primary mon-btn">
          {{ btn_form_text }}
        </button>
      </div>
    </b-form>

    <CursusModal
      v-show="isCursusModalVisible"
      @close="closeCursusModal"
      v-on:close="onClickCursusClose"
      :cursusProp="form.cursusDto"
    />

    <UtilisateurModal
      v-show="isUtilisateurModalVisible"
      @close="closeUtilisateurModal"
      v-on:close="onClickUtilisateurClose"
      :roleProp="UtilisateurModal_role"
      :utilisateursProp="UtilisateurModale_utilisateur"
    />

    <EtudiantModal
      v-show="isEtudiantModalVisible"
      @close="closeEtudiantModal"
      :etudiantsProp="etudiantsComputed"
      v-on:close="onClickEtudiantClose"
      :allEtudiant="true"
    />

    <InterventionModal
      v-show="isInterventionModalVisible"
      @close="closeInterventionModal"
      :etudiantsProp="etudiantsComputed"
      v-on:close="onClickInterventionClose"
      :allEtudiant="true"
    />
  </div>
</template>

<script>
import { promotionApi } from "@/_api/promotion.api.js";
import { centreFormationApi } from "@/_api/centreFormation.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
import CursusModal from "@/components/Modal/CursusModal.vue";
import UtilisateurModal from "@/components/Modal/UtilisateurModal.vue";
import EtudiantModal from "@/components/Modal/EtudiantModal.vue";
import InterventionModal from "@/components/Modal/InterventionModal.vue";

export default {
  name: "PromotionCreate",
  components: {
    BodyTitle,
    CursusModal,
    UtilisateurModal,
    EtudiantModal,
    InterventionModal,
  },
  data() {
    return {
      vue_title: "Création d'une promotion",
      btn_form_text: "Ajouter",

      centres: [],

      //form promotion
      form: {
        id: null,
        dateDebut: "",
        dateFin: "",
        nom: "",
        cursusDto: {},
        referentPedagogiqueDto: { prenom: "", nom: "" },
        cefDto: { prenom: "", nom: "" },
        centreFormationDto: {},
        etudiantsDto: [],
        interventionsDto: [{formateursDto: [],formationDto: {}}],
      },

      //CursusModal
      isCursusModalVisible: false,
      //UtilisateurModal
      isUtilisateurModalVisible: false,
      UtilisateurModal_role: null,
      UtilisateurModale_utilisateur: null,
      //EtudiantModal
      isEtudiantModalVisible: false,
      //InterventionModal
      isInterventionModalVisible: false,
    };
  },
  computed: {
    referent() {
      return `${this.form.referentPedagogiqueDto.prenom} ${this.form.referentPedagogiqueDto.nom}`;
    },
    cef() {
      return `${this.form.cefDto.prenom} ${this.form.cefDto.nom}`;
    },
    etudiantsComputed() {
      return this.form.etudiantsDto;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit(e) {
      let route = this.$route.path.split("/").splice(1);
      e.preventDefault();

      promotionApi
        .save(this.form)
        .then(() => 
        
            { 
                if (route[0]== 'admin'){
                this.$router.push({ name: "admin_promotion_list", 
                
                });
              }
              else if (route[0] == 'referent'){
              this.$router.push({
              name: "referent_promotions",
              });
            }
            else if (route[0] == 'cef'){
              this.$router.push({
              name: "cef_promotions",
              });
            }
        
        });
    },
    removeFromlist(index) {
      this.etudiants.splice(index, 1);
    },

    //Cursus Modal
    showCursusModal() {
      this.isCursusModalVisible = true;
    },
    closeCursusModal() {
      this.isCursusModalVisible = false;
    },
    onClickCursusClose(cursus) {
      // console.log("cursus = ", cursus);
      this.form.cursusDto = cursus;
    },

    //Utilisateur Modal
    showUtilisateurModal(role) {
      switch (role) {
        case "formateur":
          //Un referent est formateur avant de le désigner comme referent
          this.UtilisateurModal_role = "FORMATEUR";
          this.UtilisateurModale_utilisateur = this.form.referentPedagogiqueDto;
          break;
        case "cef":
          this.UtilisateurModal_role = "CEF";
          this.UtilisateurModale_utilisateur = this.form.cefDto;
          break;
        default:
          this.UtilisateurModal_role = "FORMATEUR";
          break;
      }
      this.isUtilisateurModalVisible = true;
    },
    closeUtilisateurModal() {
      this.isUtilisateurModalVisible = false;
    },
    onClickUtilisateurClose(utilisateur) {
      switch (this.UtilisateurModal_role) {
        case "FORMATEUR":
          this.form.referentPedagogiqueDto = utilisateur;
          break;
        case "CEF":
          this.form.cefDto = utilisateur;
          break;
      }
    },
    //Etudiant Modal
    showEtudiantModal() {
      this.isEtudiantModalVisible = true;
    },
    closeEtudiantModal() {
      this.isEtudiantModalVisible = false;
    },
    onClickEtudiantClose(etudiants) {
      this.form.etudiantsDto = etudiants;
    },
    //Intervention Modal
    showInterventionModal() {
      this.isInterventionModalVisible = true;
    },
    closeInterventionModal() {
      this.isInterventionModalVisible = false;
    },
    onClickInterventionClose(interventions) {
      this.form.interventionsDto = interventions;
    },
  },
  created() {
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      promotionApi.getPromotionByid(this.$route.params.id).then((response) => {
        this.form = response;
        this.vue_title = "Modification d'une promotion";
        this.btn_form_text = "Modifier";
      });
    }

    centreFormationApi
      .getAllCentreFormations()
      .then((response) => (this.centres = response));
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

.form-row {
  margin-bottom: 1em;
}
</style>
