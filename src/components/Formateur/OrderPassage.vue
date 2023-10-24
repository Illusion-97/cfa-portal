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
        <b-table v-if="showTab" :items="items" :fields="fields" />

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
import { OrderPassageFields } from "@/assets/js/fieldsEtudiant.js";
// import { etudiantApi } from "@/_api/etudiant.api";

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
            perPage: 7,
            items: [
                { id: 1, fullName: "toto1", jour: "jour1" },
                { id: 2, fullName: "toto2", jour: "jour2" },
                { id: 3, fullName: "toto3", jour: "jour3" },
            ],
            fields: OrderPassageFields,
        }
    },
    created() {
        this.pageChange();
        this.getMaxOrder();
        this.pageCount = Math.ceil(this.items.length / this.perPage);
    },
    methods: {
        // RECUPERER L'ORDER LIST
        getOrder() {
            // récupération page de dates d'éxamens avec l'étudiant qui coorespond + ajouter les heure est stocker dans items

        },
        getMaxOrder() {
            // récupére tous les order (ex: countOrder)

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
            }else {
                this.page = 0;
                this.getOrder();
            }
        },
        // AFFICHER MODAL 
        showModalAddEtudiant() {
            this.$refs.modalAddEtudiantToOrder.openModal();
        },
        // TELECHARGER TABLEAU ORDER
        downloadOrder() {
            // téléchargement du tableau de orderPassage
        }
    }
}
</script>
<style scoped></style>