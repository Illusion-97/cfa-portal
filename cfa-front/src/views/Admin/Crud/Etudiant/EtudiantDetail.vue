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

    <div class="float-right mr-2" style="font-size:20px">
      <a class="" href="#" id="navbardrop" data-toggle="dropdown">
        <font-awesome-icon
          :icon="['fas', 'sliders-h']"
          class="icon text-dark"
        />
      </a>
      <div class="dropdown-menu dropleft rounded-0">
        <!-- <span v-on:click="updateEtudiant()" class="icon-link dropdown-item">
          Modifier
        </span> -->
        <span v-on:click="deleteEtudiant()" class="icon-link dropdown-item">
          Supprimer
        </span>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2" align="center">
        <div class="identite">
          <p class="nom">{{ etudiant.prenom }} {{ etudiant.nom }} </p>
          <p class="email">{{ etudiant.login }}</p>
        </div>
      </div>

      <div class="col-md-10">
        <div class="row mb-5">
          <div class="offset-1 col-md-4">
            <b-card header="Formateur Référent">
              <div>
                <p>
                  {{ etudiant.formateurReferentDto.prenom }}
                  {{ etudiant.formateurReferentDto.nom }}
                </p>
                <p>{{ etudiant.formateurReferentDto.login }}</p>
              </div>
            </b-card>
          </div>
          <div class="offset-1 col-md-4">
            <b-card header="Manager">
              <div>
                <p>
                  {{ etudiant.managerDto.prenom }} {{ etudiant.managerDto.nom }}
                </p>
                <p>{{ etudiant.managerDto.login }}</p>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
    <div class="col-9">
      <div id="menu">
            <ul>
              <li class="menuAbout">
                <button class="btn-hover color-3 btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
                  Manipuler fiches
                </button>
                <div id="subAbout">
                          <ul>
                            <li class="li_first">
                              <button class="btn-hover color-1" v-on:click="createFichePoste(etudiant)">Ajouter une fiche de poste</button>
                            </li>
                            <li>
                                <button class="btn-hover color-1" v-on:click="createFicheEntreprise(etudiant)">Ajouter une fiche entreprise </button>
                            </li>
                            <li>
                              <button class="btn-hover color-9" v-on:click="detailFicheSalarie(etudiant)">Details fiche salarie</button>
                            </li>
                            <li>
                              <button class="btn-hover color-9" v-on:click="detailFichePoste(etudiant)">Details fiche poste</button>
                            </li>
                            <li class="li_last">
                              <button class="btn-hover color-9" v-on:click="detailFicheEntreprise(etudiant)">Details fiche entreprise</button>
                            </li>
                          </ul>
                          </div>
                      </li>
                  </ul>
            </div>
          </div>
  </div>
  
    <br>
    <br>
    <br>
    <br>

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
            class="mon-tr"
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
            v-for="groupe in etudiant.groupesDto"
            :key="groupe.id"
            @dblclick="clickGroupe(groupe)"
            class="mon-tr"
          >
            <td>{{ groupe.nom }}</td>
            <td v-for="etudiant in groupe.etudiantsDto" :key="etudiant.id">
              {{ etudiant.prenom }} {{ etudiant.nom }}
            </td>
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
              <button class="btn btn-primary font-weight-bold mon-plus" v-on:click="createNote(etudiant)">
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
              <!-- <span v-if="note.examenDto">{{note.examenDto.examenDto.enonce}}</span> -->
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
              <button class="btn btn-primary font-weight-bold mon-plus" v-on:click="createAbsence(etudiant)">
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
              <button class="btn btn-primary font-weight-bold mon-plus" v-on:click=createConge>
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
      .then((response) => (this.etudiant = response));

    noteApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.notes = response));

    absencesApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.absences = response));

    congeApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => (this.conges = response));
  },
  data() {
    return {
      etudiant: { formateurReferentDto: {}, managerDto: {}, groupesDto: {} },

      notes: [{devoirDto: {}, examenDto: {examenDto: {}}}],
      absences: [],
      conges: [],

      onglet: 0,
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
  },
  methods: {
     goBack() {
      this.$router.go(-1);
    },
    updateEtudiant(){
      let route = this.$route.path.split("/").splice(1);
      if (route[0] == "admin") this.$router.push({name: "admin_etudiant_update",});
      else if (route[0] == "referent") this.$router.push({name: "referent_etudiant_update"});
      else if (route[0] == "formateur") this.$router.push({name: "formateur_etudiant_update"});
      else if (route[0] == "cef") this.$router.push({name: "cef_etudiant_update"});
      
    },
    deleteEtudiant(){

    },
    detailFicheSalarie(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_salarie_detail",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_salarie_detail",
       
      });
      }
    },
    detailFicheEntreprise(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_entreprise_detail",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_entreprise_detail",
       
      });
      }
    },
    detailFichePoste(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_poste_detail",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_poste_detail",
       
      });
      }

    },
    editFicheSalarie(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_edit_fiche_salarie",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_edit_fiche_salarie",
       
        
      });
      }
    },
    editFichePoste(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_poste_update",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_poste_update",
       
        
      });
      }
    },
    editFicheEntreprise(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_entreprise_update",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_entreprise_update",
       
        
      });
      }
    },
    createFicheSalarie(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_salarie",
        params: {}
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_salarie",
       
        
      });
      }
    },
    createFichePoste(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_poste",
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_poste",
       
        
      });
      }
    },
    createFicheEntreprise(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_etudiant_fiche_entreprise",
      });
      }
      else {
        this.$router.push({
        name: "referent_etudiant_fiche_entreprise",
       
        
      });
      }
    },
    createNote(etudiant){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_note_create",
        params: { id : etudiant.id},
        
      });
      }
      else if(route[0]== 'referent') {
        this.$router.push({
        name: "referent_note_create",
         params: { id : etudiant.id},
      });
      }
    },
    createConge(){
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_conge_create",
      });
      }
      else {
        this.$router.push({
        name: "referent_conge_create",
       
        
      });
      }      
    },
    createAbsence(etudiant){
    let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
      this.$router.push({
        name: "admin_absence_create",
        params: {id : etudiant.id}
      });
      }
      else {
        this.$router.push({
        name: "referent_absence_create",
        params: {id : etudiant.id}
        
      });
      }
  },
    clickPromotion(promotion) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
        this.$router.push({
        name: "admin_promotion_detail",
        params: { id: promotion.id },
      });
      }
      else if(route[0]== 'referent'){
        this.$router.push({
        name: "referent_promotion_detail",
        params: { id: promotion.id },
      });
      }      
      else if(route[0]== 'formateur'){
        this.$router.push({
        name: "formateur_promotion_detail",
        params: { id: promotion.id },
      });
      }
      else if(route[0]== 'cef'){
        this.$router.push({
        name: "cef_promotion_detail",
        params: { id: promotion.id },
      });
      }
    },
    clickGroupe(groupe) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]== 'admin'){
        this.$router.push({
        name: "admin_groupe_detail",
        params: { id: groupe.id },
      });
      }
      else{
      this.$router.push({
        name: "referent_groupe_detail",
        params: { id: groupe.id },
      });
      }
    },
    clickNote(note) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_note_detail",
        params: { id: note.id },
      });
      }
       else{
      this.$router.push({
        name: "referent_note_detail",
        params: { id: note.id },
      });
      }      
    },
    clickAbsence(absence) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_absence_detail",
        params: { id: absence.id },
      });
      }
       else{
      this.$router.push({
        name: "referent_absence_detail",
        params: { id: absence.id },
      });
      }
    },
    clickConge(conge) {
      let route = this.$route.path.split("/").splice(1);
      if(route[0]=='admin'){
      this.$router.push({
        name: "admin_conge_detail",
        params: { id: conge.id },
      });
      }
      else{
      this.$router.push({
        name: "referent_conge_detail",
        params: { id: conge.id },
      });
      }
    },
    changementOnglet(onglet) {
      this.onglet = onglet;
    },
    deletePromotion(id) {
      console.log(id);
    },
    deleteGroupe(id) {
      console.log(id);
    },
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
<style scoped src="@/assets/styles/EtudiantDetail.css"/>