<template>
    <div class="navHeader">
        <div class="pHeader nav-grid h-100 align-items-center">
          <!-- Button Role -->
          <div >
            <p></p>
          </div>

          <!-- Title  -->
          <div >
                <div class="title-header">
                    <div v-if="this.$route.path.split('/').splice(1)[0] == 'admin'">
                        {{ path }} - Espace admin
                    </div>
                    <div v-if="this.$route.path.split('/').splice(1)[0] == 'cef'">
                        {{ title }} - Espace CEF
                    </div>
                    <div v-if="this.$route.path.split('/').splice(1)[0] == 'formateur'">
                        {{ path }} - Espace Formateur
                    </div>
                    <div v-if="this.$route.path.split('/').splice(1)[0] == 'tuteur'">
                        {{ path }} - Espace Tuteur
                    </div>
                </div>
            </div>

          <!-- Button Deconnexion -->
          <div  class="grid-btn">
            <div v-if="roles.length > 1" style="text-align: right">
              <button  type="button" @click="goToRole" class="role-btn btn-light">
                <font-awesome-icon :icon="['fas', 'user']" /> Roles</button>
            </div>
            <div>
              <button type="button" @click="logout" class="logout-btn btn-light">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icon" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {authenticationApi} from "@/_api/authentication.api.js";
import {utilisateurService} from "@/_services/utilisateur.service.js";
import {centreFormationApi} from "@/_api/centreFormation.api.js";
import {promotionApi} from '@/_api/promotion.api.js';
import {etudiantApi} from '@/_api/etudiant.api.js';

export default {
    name: 'HeaderFormateur',
    data() {
        return {
            ville: "",
            roles: this.$store.getters.getUtilisateur.rolesDto,
            headerDisplay: "",
            logOut: "" + window.location.origin + "/#/login",
            title: "Bienvenue sur le portail CFA",
        }
    },
    computed: {
        path() {
            return this.changeDisplay();
        },
        getUtilisateur() {
            return this.$store.getters.getUtilisateur;
        },
        isAdmin() {
            return utilisateurService.isAdmin();
        },
        isCEF() {
            return utilisateurService.isCEF();
        },
        isReferent() {
            return utilisateurService.isReferent();
        },
        isFormateur() {
            return utilisateurService.isFormateur();
        },
        isEtudiant() {
            return utilisateurService.isEtudiant();
        },
        isTuteur() {
            return utilisateurService.isTuteur();
        },

    },
    methods: {
        goToRole() {
            this.$router.push({ name: "multiRole" });
        },
        logout() {
            authenticationApi
                .logout()
                .then(() => this.$router.push(
                    { name: "login" }
                ))
        },
        changeDisplay() {
            if (this.$route.path.split("/").splice(2)[0] == 'centresFormation') {
                if (this.$route.path.split("/").splice(2)[0] == 'centresFormation'
                    && this.$route.path.split("/").splice(3)[0] == 'details') {
                    centreFormationApi
                        .getById(this.$route.params.id)
                        .then((response) => {
                            this.headerDisplay = response.nom
                        });
                    return "Centre de " + this.headerDisplay
                }
                return "Centres de formation";



            } else if (this.$route.path.split("/").splice(2)[0] == 'promotion' &&
                this.$route.path.split("/").splice(3)[0] == 'details') {
                promotionApi
                    .getPromotionByid(this.$route.params.id)
                    .then((response) => { this.headerDisplay = response.nom, this.ville = response.centreFormationDto.nom });
                let titlePromotion =  this.headerDisplay.split("-")

              if (titlePromotion.includes("titre") && titlePromotion.includes("professionnel")) {
                // Supprimer les mots du tableau
                const indexTitre = titlePromotion.indexOf("professionnel");
                const indexProfessionnel = titlePromotion.indexOf("titre");
                titlePromotion.splice(indexTitre, 1);
                titlePromotion.splice(indexProfessionnel, 1);
              }
                let titre = "";
                titlePromotion.map(item => {
                  if (item.length > 2){
                  titre += item.charAt(0).toUpperCase();
                  }
                });
                return titre + " - " + this.ville
            } else if (this.$route.path.split("/").splice(2)[0] == 'etudiants' &&
                this.$route.path.split("/").splice(3)[0] == 'details') {
                etudiantApi
                    .getById(this.$route.params.id)
                    .then((response) => {
                        this.headerDisplay = response.utilisateurDto.prenom + " " + response.utilisateurDto.nom
                    })
                return this.headerDisplay
            } else if (this.$route.path.split("/").splice(2)[0] == 'interventions') {
                if (this.$route.path.split("/").splice(3)[0] == 'detail') {
                    //reqreturn "lala";
                }
                return "Interventions"
            } else {
                return this.$route.path.split("/").splice(2)[0].substring(0, 1).toUpperCase() +
                    this.$route.path.split("/").splice(2)[0].substring(1)
            }
        },
    },
}
</script>
<style scoped>
.navHeader {
    background-color: #00072d;
    overflow: hidden;
    color: white;
    Height: 6rem;
}
.nav-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-btn{
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  align-items: center;
  grid-column-gap: 20px;
}
.pHeader {
    font-size: 30px;
    font-family: Roboto;
    font-weight: 600;
    height: 50%;
    right: 0%;
}

.logout-btn{
  font-size: 20px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  min-width: 180px;
}

.role-btn{
  font-size: 20px !important;
  font-weight: 500;
  border: 5px;
  border-radius: 4px;
  min-width: 110px;
}


.title-header{
  text-align: center;
}
</style>
