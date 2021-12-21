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

    <div class="row">
      <div class="col-md-2" align="center">
        <div class="identite">
          <p class="nom">{{ etudiant.utilisateurDto.prenom }} {{ etudiant.utilisateurDto.nom }}</p>
          <p class="email">{{ etudiant.utilisateurDto.login }}</p>
        </div>
      </div>

      <div class="col-md-10">
        <div class="row mb-5">
          <div class="offset-1 col-md-3">
            <b-card header="Formateur Référent">
              <div>
                <p>
                  {{ maitreApprentissage.utilisateurDto.prenom }}
                  {{ maitreApprentissage.utilisateurDto.nom }}
                </p>
                <p>{{ maitreApprentissage.utilisateurDto.login }}</p>
              </div>
            </b-card>
          </div>
          <div class="offset-1 col-md-3">
            <b-card header="Manager">
              <div>
                <p>
                  {{ etudiant.managerDto.utilisateurDto.prenom }} {{ etudiant.managerDto.utilisateurDto.nom }}
                </p>
                <p>{{ etudiant.managerDto.utilisateurDto.login }}</p>
              </div>
            </b-card>
          </div>
          <div class="offset-1 col-md-3">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Fiches
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button
                    class="dropdown-item"
                    v-on:click="createFicheSalarie(etudiant)">Créer fiche salarié</button>
                <button
                    class="dropdown-item"
                    v-on:click="createFichePoste(etudiant)">Créer fiche poste</button>
                <button
                    class="dropdown-item"
                    v-on:click="createFicheEntreprise(etudiant)">Créer fiche entreprise</button>
                <div class="dropdown-divider"></div>    
                <button
                    class="dropdown-item"
                    v-on:click="detailFicheSalarie(etudiant)">Détail fiche salarié</button>
                <button
                    class="dropdown-item"
                    v-on:click="detailFichePoste(etudiant)">Détail fiche poste</button>
                <button
                    class="dropdown-item"
                    v-on:click="detailFicheEntreprise(etudiant)">Détail fiche entreprise</button>
              </div>
            </div>
            <br>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Cerfa
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button
                    class="dropdown-item"
                    v-on:click="createCerfa(etudiant)">Créer cerfa</button>
                    <div class="dropdown-divider"></div> 
                    <button
                    class="dropdown-item"
                    v-on:click="detailCerfa(etudiant)">Détail cerfa</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mon-container-tuile">
      <span
        :class="{
          ma_tuile: true,
          activ: isPromotion,
        }"
        @click="changementOnglet(1)"
      >
        Promotions
      </span>
      <span
        :class="{
          ma_tuile: true,
          activ: isGroupe,
        }"
        @click="changementOnglet(2)"
      >
        Groupes
      </span>
      <span
        :class="{
          ma_tuile: true,
          activ: isNote,
        }"
        @click="changementOnglet(3)"
      >
        Notes
      </span>
      <span
        :class="{
          ma_tuile: true,
          activ: isAbsence,
        }"
        @click="changementOnglet(4)"
      >
        Absences
      </span>
      <span
        :class="{
          ma_tuile: true,
          activ: isConge,
        }"
        @click="changementOnglet(5)"
      >
        Congés
      </span>
    </div>

    <!-- Promotions -->
    <div :class="{ ma_fenetre: true, collapse: !isPromotion }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Promotion</th>
            <th>Date de debut</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="promotion in etudiant.promotionsDto"
            :key="promotion.id"
            @dblclick="clickPromotion(promotion)"
            class="mon-tr2"
          >
            <td>{{ promotion.nom }}</td>
            <td>{{ promotion.dateDebut }}</td>
            <td>{{ promotion.dateFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Groupes -->
    <div :class="{ ma_fenetre: true, collapse: !isGroupe }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Nom</th>
            <th>Etudiants</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="groupe in groupeComputed"
            :key="groupe.id"
            @dblclick="clickGroupe(groupe)"
            class="mon-tr"
          >
            <td>{{ groupe.nom }}</td>
            <!-- ATTENTION ici bug console => prenom -->
            <!-- <div v-if="groupe.length"> -->
              <td v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">
                {{ etudiant.utilisateurDto.prenom }} {{ etudiant.utilisateurDto.nom }}
              </td>
            <!-- </div> -->
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Notes -->
    <div :class="{ ma_fenetre: true, collapse: !isNote }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Examen/Devoir</th>
            <th>Note</th>
            <th>Observations</th>
            <th>
              <button
                class="btn btn-primary font-weight-bold mon-plus"
                v-on:click="createNote(etudiant)"
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="note in notesComputed"
            :key="note.id"
            @dblclick="clickNote(note)"
            class="mon-tr"
          >
            <td>
              <span v-if="note.devoirDto">{{ note.devoirDto.enonce }}</span>
              <span v-if="note.examenDto">{{
                note.examenDto.examenDto.enonce
              }}</span>
            </td>
            <td>{{ note.noteObtenu }}</td>
            <td>{{ note.observations }}</td>
            <td>
              <span class="close ma-croix" @click="deleteNote(note.id)">x</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Absences -->
    <div :class="{ ma_fenetre: true, collapse: !isAbsence }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Raison</th>
            <th>
              <button
                class="btn btn-primary font-weight-bold mon-plus"
                v-on:click="createAbsence(etudiant)"
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="absence in absencesComputed"
            :key="absence.id"
            @dblclick="clickAbsence(absence)"
            class="mon-tr"
          >
            <td>{{ absence.dateDebut }}</td>
            <td>{{ absence.dateFin }}</td>
            <td>{{ absence.justificatif }}</td>
            <td>
              <span class="close ma-croix" @click="deleteAbsence(absence.id)"
                >x</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Congés -->
    <div :class="{ ma_fenetre: true, collapse: !isConge }">
      <table class="table">
        <thead class="">
          <tr>
            <th>Date de debut</th>
            <th>Date de fin</th>
            <th>Motif</th>
            <th>Type</th>
            <th>Status</th>
            <th>
              <button
                class="btn btn-primary font-weight-bold mon-plus"
                v-on:click="createConge"
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="conge in congesComputed"
            :key="conge.id"
            @dblclick="clickConge(conge)"
            class="mon-tr"
          >
            <td>{{ conge.dateDebut }}</td>
            <td>{{ conge.dateFin }}</td>
            <td>{{ conge.motif }}</td>
            <td>{{ conge.type }}</td>
            <td>{{ conge.status }}</td>
            <td>
              <span class="close ma-croix" @click="deleteConge(conge.id)"
                >x</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { noteApi } from "@/_api/note.api.js";
import { absencesApi } from "@/_api/absence.api.js";
import { congeApi } from "@/_api/conge.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "EtudiantDetail",
  components: {},
  created() {
    etudiantApi
      .getById(this.$route.params.id)
      .then((response) => (this.etudiant = response))
      .then(() =>
        congeApi
          .getAllByIdEtudiant(this.etudiant.utilisateurDto.id)
          .then((response) => (this.conges = response))
      )

    etudiantApi
      .getGroupes(this.$route.params.id)
      .then((response) => (this.groupe = response));

    noteApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.notes = response));

    absencesApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.absences = response));

    etudiantApi
    .getFormateurReferent(this.$route.params.id)
    .then(response => this.maitreApprentissage = response);
  },
  data() {
    return {
      etudiant: {        
        managerDto: {utilisateurDto :{prenom: "", nom : "", login: ""}},
        groupesDto: {},
        utilisateurDto: {prenom: "", nom:"", login: ""},
      },
      notes: {
        devoirDto: {},
        examenDto: {},
      },
      absences: [],
      conges: [],
      groupe: [{etudiantsDto: {utilisateurDto: {prenom: "", nom: ""}}}],

      maitreApprentissage: {utilisateurDto : {prenom: "", nom:"", login: ""}},

      onglet: 1,
    };
  },
  computed: {
    notesComputed() {
      return this.notes;
    },
    absencesComputed() {
      return this.absences;
    },
    congesComputed() {
      return this.conges;
    },

    isPromotion() {
      if (this.onglet == 1) return true;
      else return false;
    },
    isGroupe() {
      if (this.onglet == 2) return true;
      else return false;
    },
    isNote() {
      if (this.onglet == 3) return true;
      else return false;
    },
    isAbsence() {
      if (this.onglet == 4) return true;
      else return false;
    },
    isConge() {
      if (this.onglet == 5) return true;
      else return false;
    },
    groupeComputed(){
      return this.groupe;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    createCerfa(){
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") 
        this.$router.push({
          name: "admin_etudiant_cerfa",
          params: {id : this.$route.params.id},
        });
      
    },
    detailFicheSalarie() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_salarie_detail",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_salarie_detail",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_salarie_detail",
        });
      }
    },
    detailFicheEntreprise() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_entreprise_detail",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_entreprise_detail",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_entreprise_detail",
        });
      }
    },
    detailFichePoste() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_poste_detail",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_poste_detail",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_poste_detail",
        });
      }
    },
    editFicheSalarie() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_edit_fiche_salarie",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_edit_fiche_salarie",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_edit_fiche_salarie",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_etudiant_edit_fiche_salarie",
            
          });
          }
          */
    },
    editFichePoste() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_poste_update",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_poste_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_poste_update",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_etudiant_edit_fiche_poste",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_etudiant_edit_fiche_poste",
          });
          }*/
    },
    editFicheEntreprise() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_entreprise_update",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_entreprise_update",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_entreprise_update",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_etudiant_edit_fiche_entreprise",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_etudiant_edit_fiche_entreprise",
          });
          }*/
    },
    createFicheSalarie() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_salarie",
          params: {},
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_salarie",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_salarie",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_conge_create",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_conge_create",
          });
          }*/
    },
    createFichePoste() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_poste",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_poste",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_poste",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_conge_create",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_conge_create",
          });
          }*/
    },
    createFicheEntreprise() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_etudiant_fiche_entreprise",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_etudiant_fiche_entreprise",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_etudiant_fiche_entreprise",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_conge_create",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_conge_create",
          });
          }*/
    },
    createNote(etudiant) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_note_create",
          params: {
            id: etudiant.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_note_create",
          params: {
            id: etudiant.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_note_create",
          params: {
            id: etudiant.id,
          },
        });
      }
    },
    createConge() {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_conge_create",
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_conge_create",
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_conge_create",
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_conge_create",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_conge_create",
          });
          }*/
    },
    createAbsence(etudiant) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_absence_create",
          params: {
            id: etudiant.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_absence_create",
          params: {
            id: etudiant.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_absence_create",
          params: {
            id: etudiant.id,
          },
        });
      }
      /*else {
            this.$router.push({
            name: "formateur_absence_create",
            
          });
          }
          else {
            this.$router.push({
            name: "cef_absence_create",
          });
          }*/
    },
    clickPromotion() {
      /*let route = this.$route.path.split("/").splice(1);
          if(route[0]== 'admin'){
            this.$router.push({
            name: "admin_promotion_detail",
            params: { id: promotion.id },
          });
          }
          else{
            this.$router.push({
            name: "referent-promotion-detail",
            params: { id: promotion.id },
          });
          }
          
          else if{
            this.$router.push({
            name: "formateur-promotion-detail",
            params: { id: promotion.id },
          });
          }
          else if{
            this.$router.push({
            name: "cef-promotion-detail",
            params: { id: promotion.id },
          });
          }*/
    },
    clickGroupe(groupe) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_groupe_detail",
          params: {
            id: groupe.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_groupe_detail",
          params: {
            id: groupe.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_groupe_detail",
          params: {
            id: groupe.id,
          },
        });
      }
      /*
          else if{
            this.$router.push({
            name: "formateur-groupe-detail",
            params: { id: groupe.id },
          });
          }
          else if{
            this.$router.push({
            name: "cef-groupe-detail",
            params: { id: groupe.id },
          });
          }*/
    },
    clickNote(note) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_note_detail",
          params: {
            id: note.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_note_detail",
          params: {
            id: note.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_note_detail",
          params: {
            id: note.id,
          },
        });
      }
      /*
          else if{
            this.$router.push({
            name: "formateur-note-detail",
            params: { id: note.id },
          });
          }
          else if{
            this.$router.push({
            name: "cef-note-detail",
            params: { id: note.id },
          });
          }*/
    },
    clickAbsence(absence) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_absence_detail",
          params: {
            id: absence.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_absence_detail",
          params: {
            id: absence.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_absence_detail",
          params: {
            id: absence.id,
          },
        });
      }
      /*
          else if{
            this.$router.push({
            name: "formateur-absence-detail",
            params: { id: absence.id },
          });
          }
          else if{
            this.$router.push({
            name: "cef-absence-detail",
            params: { id: absence.id },
          });
          }*/
    },
    clickConge(conge) {
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") {
        this.$router.push({
          name: "admin_conge_detail",
          params: {
            id: conge.id,
          },
        });
      } else if (route[0] == "referent") {
        this.$router.push({
          name: "referent_conge_detail",
          params: {
            id: conge.id,
          },
        });
      } else if (route[0] == "cef") {
        this.$router.push({
          name: "cef_conge_detail",
          params: {
            id: conge.id,
          },
        });
      }
      /*
          else if{
            this.$router.push({
            name: "formateur-conge-detail",
            params: { id: conge.id },
          });
          }
          else if{
            this.$router.push({
            name: "cef-conge-detail",
            params: { id: conge.id },
          });
          }*/
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    // deletePromotion(id) {
    //   console.log(id);
    // },
    // deleteGroupe(id) {
    //   console.log(id);
    // },
    deleteNote(id) {
      noteApi
        .deleteNote(id)
        .then(() =>
          noteApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.notes = response))
        );
    },
    deleteAbsence(id) {
      absencesApi
        .deleteAbsence(id)
        .then(() =>
          absencesApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.absences = response))
        );
    },
    deleteConge(id) {
      congeApi
        .deleteConge(id)
        .then(() =>
          congeApi
            .getAllByIdEtudiant(this.$route.params.id)
            .then((response) => (this.conges = response))
        );
    },
  },
};
</script>
<style src="@/assets/styles/Onglet.css"></style>
<!--
<style scoped src="@/assets/styles/EtudiantDetail.css" /> 
-->

<style scoped>
.identite {
    margin-top: 4em;
    margin-bottom: 7em;
  }
  
  .identite > .nom {
    font-size: 1.5em;
  }
  
  .identite > .email {
    font-size: 1.2em;
  }
</style>