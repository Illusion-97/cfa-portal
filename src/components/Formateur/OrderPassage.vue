<template>
  <div>
    <!-- MESSAGE D'ALERT -->
    <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
      {{ message }}
    </b-alert>

    <!-- BUTTON -->
    <b-button variant="warning" class="m-4" @click="showModalAddEtudiant">Ajouter un éléve</b-button>
    <b-button v-if="items.length > 0" variant="success" class="m-4" @click="downloadOrder">Télécharger le
      tableau</b-button>

    <!-- COMPONENT ADDETUDIANTOORDER -->
    <AddEtudiantToOrder ref="modalAddEtudiantToOrder" @childEtudiantAdd="etudiantAdd" />

    <!-- TABLEAU -->
    <table class="table" v-if="items.length > 0">
      <thead class="">
      <tr>
        <th>Nom du candidat</th>
        <th>Jour convocation oral</th>
        <th>Heure convocation oral</th>
        <th>Accueil candidat</th>
        <th>Entretien technique</th>
        <th>Questionnement à partir de production</th>
        <th>Entretien final</th>
        <th>Délibération du jury</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id" class="mon-tr">
        <td>{{ item.etudiant.utilisateurDto.fullName }}</td>
        <td>{{ formatExamDate(item.examDate)}}</td>
        <td>{{ formatExamTime(item.examDate)}}</td>
        <td v-if="item.minAccueil">De {{ formatTime(item.minAccueil) }} à {{ formatTime(item.minEntretien) }}</td>
        <td v-else></td>
        <td v-if="item.minEntretien">De {{ formatTime(item.minEntretien) }} à {{ formatTime(item.minQuestion) }}</td>
        <td v-else></td>
        <td v-if="item.minQuestion">De {{ formatTime(item.minQuestion) }} à {{ formatTime(item.minEntretienFinal) }}</td>
        <td v-else></td>
        <td v-if="item.minEntretienFinal">De {{ formatTime(item.minEntretienFinal) }} à {{ formatTime(item.minDeliberation) }}</td>
        <td v-else></td>
        <td v-if="item.minDeliberation">{{ formatTime(item.minDeliberation) }}</td>
        <td v-else></td>
        <b-button variant="primary" class="m-4"
                  @click="showModalAddEtudiant(item.id)">Modifier</b-button>
      </tr>
      </tbody>
    </table>

    <div v-else>Pas d'étudiant l'iée a l'examen</div>

    <!-- PAGINATION -->
    <paginate class="customPagination" :page-count="pageCount" :page-range="1" :margin-pages="2"
              :click-handler="pageChange" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination float-right'"
              :page-class="'page-item'" :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
              :prev-link-class="'page-link'" :next-link-class="'page-link'" :active-class="'active'">
    </paginate>
  </div>
</template>
<script>
import AddEtudiantToOrder from "@/components/Modal/AddEtudiantToOrder.vue";
import { soutenanceApi } from "@/_api/soutenance.api.js";

export default {
  props: {
    promotion: []
  },
  components: {
    AddEtudiantToOrder
  },
  data() {
    return {
      idPromotion: this.$route.params.id,
      showTab: true,
      dismissCountDown: null,
      message: null,
      color: null,
      page: null,
      pageCount: 0,
      perPage: 5,
      items: [],
    }
  },
  created() {
    this.pageChange();
  },
  methods: {

    formatExamDate(date) {
      date = new Date(date);
      return (date.getDate()).toString().padStart(2, '0')
          + '/' + (date.getMonth() + 1).toString().padStart(2, '0')
          + '/' + (date.getFullYear()).toString().padStart(2, '0')
    },
    formatExamTime(date) {
      date = new Date(date);
      return (date.getHours()).toString().padStart(2, '0')
          + ':' + (date.getMinutes()).toString().padStart(2, '0')
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    },


    // RECUPERER L'ORDER LIST
    async getOrder() {
      this.items = [];
      // récupération page de dates d'éxamens avec l'étudiant qui coorespond
      await soutenanceApi.getPageSoutenanceByPromotionId(this.idPromotion, this.page, this.perPage)
          .then((response) => {
            // this.items.push(...response)
            response.forEach(element => (this.items.push(element)));
          });
      // trier la list soutenance
      this.items.sort((a, b) => {
        return a.etudiant.utilisateurDto.fullName.localeCompare(b.etudiant.utilisateurDto.fullName);
      });

      // récupére le nombre de tous les order
      await soutenanceApi.countSoutenanceByPromotionId(this.idPromotion).then((response) => (this.pageCount = response));
      this.pageCount = Math.ceil(this.pageCount / this.perPage);
    },
    // AJOUT ETUDIANT
    async etudiantAdd(data) {
      this.color = "success";
      this.dismissCountDown = 6;
      if (data)
        this.message = "Soutenance de l'étudiant " + data + " mise à jour.";
      else
        this.message = "Etudiant ajouter à l'éxamen.";
      this.page = 0;
      await this.pageChange();
    },
    // CHANGE PAGE
    pageChange(pageNum) {
      if (pageNum) {
        this.page = pageNum - 1;
        this.getOrder();
      } else {
        this.page = 0;
        this.getOrder();
      }
    },
    // AFFICHER MODAL
    showModalAddEtudiant(soutenanceId) {
      if(soutenanceId)
        this.$refs.modalAddEtudiantToOrder.openModal(soutenanceId);
      else
        this.$refs.modalAddEtudiantToOrder.openModal();
    },
    // TELECHARGER TABLEAU ORDER
    downloadOrder() {
      soutenanceApi.genererLstSoutenance(this.promotion.nom, this.idPromotion).then(response => {
        let bas64 = response;
        const linkSource = `data:application/pdf;base64,${bas64}`;
        const downloadLink = document.createElement("a");
        const fileName = "tableau_soutenance_"+ this.promotion.nom +".pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      });
    }
  }
}
</script>
<style scoped></style>
