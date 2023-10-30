<template>
    <div>
        <!-- MESSAGE D'ALERT -->
        <b-alert class="m-4 " :show="dismissCountDown" dismissible fade :variant="color" @dismissed="dismissCountDown = 0">
            {{ message }}
        </b-alert>

        <!-- BUTTON -->
        <b-button variant="warning" class="m-4" @click="showModalAddEtudiant">Ajouter un éléve</b-button>
        <b-button variant="success" class="m-4" @click="downloadOrder">Télécharger le tableau</b-button>

        <!-- COMPONENT ADDETUDIANTOORDER -->
        <AddEtudiantToOrder ref="modalAddEtudiantToOrder" @childEtudiantAdd="etudiantAdd" />

        <!-- TABLEAU -->
        <table class="table" v-if="items">
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id" class="mon-tr">
                    <td>{{ item.etudiant.utilisateurDto.fullName }}</td>
                    <td>{{ item.jour }}</td>
                    <td>{{ item.heure }}</td>
                    <td>{{ item.minAccueil }}</td>
                    <td>{{ item.minEntretien }}</td>
                    <td>{{ item.minQuestion }}</td>
                    <td>{{ item.minEntretienFinal }}</td>
                    <td>{{ item.minDeliberation }}</td>
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
    components: {
        AddEtudiantToOrder
    },
    data() {
        return {
            idPromotion: this.$route.params.id,
            showTab: true,
            dismissCountDown: null,
            message: "",
            color: "",
            page: 0,
            pageCount: 0,
            perPage: 9,
            items: [],
        }
    },
    created() {
        this.pageChange();
        this.getMaxOrder();
    },

    methods: {
        // RECUPERER L'ORDER LIST
        getOrder() {
            this.items = [];
            // récupération page de dates d'éxamens avec l'étudiant qui coorespond + ajouter les heure est stocker dans items
            soutenanceApi.getPageSoutenanceByPromotionId(this.idPromotion, this.page, this.perPage)
                .then((response) => {
                    response.forEach(element => (this.items.push(element)));
                }).catch();
        },
        // récupére le nombre de tous les order 
        async getMaxOrder() {
            await soutenanceApi.countSoutenanceByPromotionId(this.idPromotion).then((response) => (this.pageCount = response));
            this.pageCount = Math.ceil(this.pageCount / this.perPage);
        },
        // AJOUT ETUDIANT
        etudiantAdd() {
            this.color = "success";
            this.dismissCountDown = 6;
            this.message = "Etudiant ajouter à l'éxamen";
            this.page = 0;
            this.pageChange();
        },
        // CHANGE PAGE
        pageChange(pageNum) {
            if (pageNum) {
                this.page = pageNum - 1;
                this.getOrder();
                this.getMaxOrder();
            } else {
                this.page = 0;
                this.getOrder();
                this.getMaxOrder();
            }
        },
        // AFFICHER MODAL 
        showModalAddEtudiant() {
            this.$refs.modalAddEtudiantToOrder.openModal();
        },
        // TELECHARGER TABLEAU ORDER
        downloadOrder() {
            console.log(this.pageCount);

            // téléchargement du tableau de orderPassage
        }
    }
}
</script>
<style scoped></style>