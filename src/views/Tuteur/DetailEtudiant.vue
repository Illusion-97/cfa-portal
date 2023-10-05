  <template>
  <div id="main-cr-prj" style="margin-top: 1em">
    <!-- Button retour -->
    <b-alert :show="dismissCountDownSuccess" dismissible fade variant="success" @dismiss-count-down="countDownChanged">
      L'E-Mail a été correctement envoyé
    </b-alert>
    <b-alert :show="dismissCountDownFail" dismissible fade variant="danger" @dismiss-count-down="countDownChanged2">
      Veuillez renseigner tous les champs
    </b-alert>
    <div class="card-retour" style="margin-top: 1em; display: flex;
     flex-direction: row; margin-right: 0">
      <v-btn color="back-color" class="back" @click="goBack()">
        <v-icon>
          mdi-arrow-left
        </v-icon>
        Précédent
      </v-btn>
      <v-btn color="back-color" @click="clicked = !clicked;">
        <v-icon icon="mdi-domain" size="large" color="white">mdi-email</v-icon>
      </v-btn>
    </div>
    <br>
    <div :hidden="clicked" style="animation: ease-in 0.5s; z-index: 9999">
      <mail-component :fail="showFail" :success="showSuccess" style="transition: ease-in 0.5s" :from="$store.getters.getUtilisateur.login" :to="login"></mail-component>
    </div>
    <div class="grid-1" v-if="this.$store.getters.getUtilisateur.tuteurDto">

      <!-- Nom des categorie du tableau -->
      <nav id="selection-toggle" style="background-color: #08092d;">
        <div class="toggle-btn" role="group">
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt1'" @click="active = 1" variant="plain">Infos etudiant</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt2'" @click="active = 2" variant="plain">Contrôle continue</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt3'" @click="active = 3" variant="plain">Planning</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt4'" @click="active = 4" variant="plain">Dossiers projets</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt5'" @click="active = 5" variant="plain">Dossiers professionnels</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt6'" @click="active = 6" variant="plain">Congé</v-btn>
          <v-btn style="background-color: #08092d; color: white; height: 50px" class="btn-detail" block v-b-toggle="'bt7'" @click="active = 7" variant="plain">Absences</v-btn>
        </div>
      </nav>

      <v-card class="detail-etudiant">
        <!--Tableau Infos Etudiant-->
        <v-card v-show="active === 1" name="Info">
          <v-card-text>
            <v-card-title style="font-size: 1.10rem; 
              font-weight: 400; color: #000000;">
              <span class="bold-label">Nom :</span> <span>{{ infos.nom }}</span>
            </v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Prenom :</span> <span>{{ infos.prenom }}</span>
            </v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Date de naissance : </span>{{ infos.dateDeNaissance? infos.dateDeNaissance : "Date de naissance non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Adresse : </span>{{ infos.adresseDto? infos.adresseDto.libelle + " " + infos.adresseDto.ville + " " + infos.adresseDto.codePostal : "Adresse non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Télephone :</span> {{ infos.telephone? infos.telephone : "Numéro de téléphone non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Télephone fixe : </span> {{ infos.telephoneFixe? infos.telephoneFixe : "Numéro de téléphone fixe non renseigné." }}</v-card-title>
            <v-card-title style="font-size: 1.10rem; 
            font-weight: 400; color: #000000;">
            <span class="bold-label">Adresse mail :</span>{{ infos.login }}</v-card-title>
          </v-card-text>
        </v-card>


        <!-- NE FONCTIONNE PAS CAR DOUBLE TABLEAU  -->
        <!-- Tableau Controle Continu -->
        <v-card v-show="active === 2" name="controle continu">
          <v-data-table :headers="notesFields" :items="notes" :page.sync="pageNotes" :items-per-page="itemsPerPage"
            hide-default-footer class="custom-font-size" v-if="notes.length">
          </v-data-table>
          <v-card-title v-else>Pas de controle continu.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageNotes" :length="Math.ceil(notes.length / itemsPerPage)" color="#08092d" square
              v-if="notes.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Planning -->
        <v-card v-show="active === 3" name="planning">
          <v-data-table :headers="planningFields" :items="promos" :page.sync="pagePromos" :items-per-page="itemsPerPage"
            class="elevation-2 title-size" hide-default-footer v-if="promos.length">
          </v-data-table>
          <v-card-title v-else>Pas de planning.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pagePromos" :length="Math.ceil(promos.length / itemsPerPage)" color="#08092d" square
              v-if="promos.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Dossier Projet -->
        <v-card v-show="active === 4" name="dossier projet">
          <v-data-table :headers="dossProjFields" :items="dossProjs" :page.sync="pageDossProjet"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProjs.length">
            <template v-slot:[`item.action`]="{ item }">
              <v-icon size="xxl" class="me-2" @click="consulterDprojet(item.id)">mdi-eye</v-icon> 
         <v-icon size="xxl" class="me-2" @click="telechargerDprojet(item.id, item.nom)">mdi-download</v-icon>
          </template>
      </v-data-table>
          <v-card-title v-else>Pas de dossier projet.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProjet" :length="Math.ceil(dossProjs.length / itemsPerPage)" square
              color="#08092d" v-if="dossProjs.length"></v-pagination>
          </div>
        </v-card>
        <!-- Tableau Dossier Professionnel -->
        <v-card v-show="active === 5" name="dossier professionnel">
          <v-data-table :headers="dossProfFields" :items="dossProfs" :page.sync="pageDossProfessionnel"
            :items-per-page="itemsPerPage" class="elevation-1" hide-default-footer v-if="dossProfs.length">
            <template v-slot:[`item.action`]="{ item }">
              <v-icon size="xxl" class="me-2" @click="consulterDprof(item.id)">mdi-eye</v-icon> 
         <v-icon size="xxl" class="me-2" @click="telechargerDprof(item.id, item.fileImport)">mdi-download</v-icon>
          </template>
            </v-data-table>
          <v-card-title v-else>Pas de dossier professionnel.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageDossProfessionnel" :length="Math.ceil(dossProfs.length / itemsPerPage)" square
              color="#08092d" v-if="dossProfs.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Congé -->
        <v-card v-show="active === 6" name="congé">
          <v-data-table :headers="congeFields" :items="conges" :page.sync="pageConge" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="conges.length">
          </v-data-table>
          <v-card-title v-else>Pas de congé.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageConge" :length="Math.ceil(conges.length / itemsPerPage)" color="#08092d" square
              v-if="conges.length"></v-pagination>
          </div>
        </v-card>

        <!-- Tableau Absences -->
        <v-card v-show="active === 7" name="absences">
          <v-data-table :headers="absenceFields" :items="absences" :page.sync="pageAbsence" :items-per-page="itemsPerPage"
            class="elevation-1" hide-default-footer v-if="absences.length">
          </v-data-table>
          <v-card-title v-else>Pas d'absence.</v-card-title>
          <div class="text-center pt-2">
            <v-pagination v-model="pageAbsence" :length="Math.ceil(absences.length / itemsPerPage)" color="#08092d" square
              v-if="absences.length"></v-pagination>
          </div>
        </v-card>
      </v-card>
    </div>
    <div v-else>Aucun détails de l'étudiant</div>
  </div>
  </template>

  <script>
  import { dossierProjetApi } from "@/_api/dossierProjet.api.js";
  import { congeApi } from "@/_api/conge.api.js";
  import { absenceApi } from "@/_api/absence.api.js";
  import { etudiantApi } from "@/_api/etudiant.api.js";
  import { dossierProfessionnelApi } from "@/_api/dossierProfessionnel.api.js";
  import { noteApi } from "@/_api/note.api.js";
  import { promotionApi } from "@/_api/promotion.api.js";
  import { notesFields, dossProfFields, absenceFields, congeFields, planningFields, dossProjFields } from "@/assets/js/fieldsDetailEtudiant.js";
  import MailComponent from "@/components/utils/MailComponent.vue";

  export default {
    components: {MailComponent},
  data: () => {
    return {
      clicked:true,
      dismissSecs: 5,
      dismissCountDownSuccess: 0,
      dismissCountDownFail: 0,
      active: 1,
      pageNotes: 1,
      pagePromos: 1,
      pageDossProjet: 1,
      pageDossProfessionnel: 1,
      pageConge: 1,
      pageAbsence: 1,
      itemsPerPage: 8,
      etudiantId: 0,
      login:"",
      infos: [],
      notes: [],
      promos: [],
      dossProjs: [],
      dossProfs: [],
      conges: [],
      absences: [],
      notesFields,
      planningFields,
      dossProjFields,
      dossProfFields,
      congeFields,
      absenceFields,
    };
  },
  methods: {

    goBack() {
      this.$router.go(-1);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDownSuccess = dismissCountDown;
    },
    countDownChanged2(dismissCountDown) {
      this.dismissCountDownFail = dismissCountDown;
    },
    showSuccess() {
      this.dismissCountDownSuccess = this.dismissSecs
    },
    showFail() {
      this.dismissCountDownFail = this.dismissSecs
    },
    async getInfoEtudiant() {
      try {
        const response = await etudiantApi.getById(this.etudiantId);
        this.login = response.utilisateurDto.login
        this.infos = response.utilisateurDto;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'étudiant :", error);
      }
    },

    getnoteEtudiant() {
      noteApi
        .getAllNoteByIdEtudiant(this.etudiantId)
        .then((response) => (this.notes = response));
    },

    async getplanningEtudiant() {
      let tab = [];
      await promotionApi
        .getCursusByIdEtudiant(this.etudiantId)
        .then((response) => ((response.forEach(element => {
          tab.push(element.planningsEtudiantDto)
        }))));
        this.promos = tab.reduce((acc, currentValue) => acc.concat(currentValue), []);
    },

    getdossProjEtudiant() {
      dossierProjetApi
        .getByIdEtudiant(this.etudiantId)
        .then(
          (response) => ((this.dossProjs = response))
        );
    },

    getdossProfEtudiant() {
      dossierProfessionnelApi
        .getByIdEtudiant(this.etudiantId)
        .then((response) => (this.dossProfs = response));
    },

    getCongeEtudiant() {
      congeApi
        .getAllByIdEtudiant(this.etudiantId)
        .then((response) => (this.conges = response));
    },

    getabsenceEtudiant() {
      absenceApi
        .getAllByIdEtudiant(this.etudiantId)
        .then((response) => (this.absences = response));
    },
    telechargerDprojet(id, nomDossierProjet) {
      dossierProjetApi
      .genererDossier(id)
      .then(response => {
        let bas64 = response;
        const linkSource = `data:application/pdf;base64,${bas64}`;
        const downloadLink = document.createElement("a");
        const fileName = "dossier-projet-" + nomDossierProjet + ".pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch(error => {
        console.error("Erreur lors de la génération du dossier projet :", error);
      });
    },

    telechargerDprof(dossierId)
    {
      dossierProfessionnelApi.generateDossier(dossierId).then(response => {
        console.response("dossier telecharger :", response);
      })
      .catch(error => {
        console.error("Erreur lors de la génération du dossier :", error);
      });
    },

    consulterDprojet() {
      
    },

    consulterDprof(dossierId){
      if (dossierId) {
      if (this.dossProfs.fileImport) {
        fetch(this.dossProfs.fileImport)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const newPage = window.open('', '_blank');
          newPage.document.write(`<html><body><iframe src="${url}" width="100%" height="100%"></iframe></body></html>`);
          newPage.document.close();
        })
        .catch((error) => console.log(error));
    } else {
      dossierProfessionnelApi.voirDossierPro(dossierId)
        .then(() => {
          const fileName = `dossierEtudiant${dossierId}-cursus-1.pdf`;
          this.pdfUrl = `http://localhost:8080/${fileName}`;
        })
        .catch((error) => console.log(error));
    }
  }
     else {
      console.error("Undefined");
    }
    },

},

    created() {
    this.etudiantId = this.$route.params.id;
    this.getInfoEtudiant();
    this.getnoteEtudiant();
    this.getplanningEtudiant();
    this.getdossProjEtudiant();
    this.getdossProfEtudiant();
    this.getCongeEtudiant();
    this.getabsenceEtudiant();

  },

  };
  </script>

  <style >

  #main-cr-prj {
  margin: 0% 3% 0% 3%;
  display: grid;
  grid-template-rows: 50px 1fr;
  }
  .grid-1{

  }
  .toggle-btn{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  }
  .btn-detail{
  color: white;
  background-color: #08092d;
  }
  .btn-retour{
  width: 70px;
  float: right;
  }
  .card-retour{
  height: 20px;
  text-align: right;
  }

  .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-size: 17px !important;
  }

  .bold-label {
  font-weight: bold;
  margin-right: 0.3em;
  }

  </style>
