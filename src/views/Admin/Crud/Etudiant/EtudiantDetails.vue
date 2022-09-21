<template>
  <div>
    Afficher promo etudiant <br/>
    Ses notes <br/>
    Ses absences <br/>
    Ses dossiers <br/>
  </div>
</template>

<script>
import { etudiantApi } from "@/_api/etudiant.api.js";
import { noteApi } from "@/_api/note.api.js";
import { absenceApi } from "@/_api/absence.api.js";
import { congeApi } from "@/_api/conge.api.js";

import "@/assets/styles/CrudDetail.css";

export default {
  name: "EtudiantDetail",
  components: {},
  data() {
  return {
    etudiant: [],
    notes: [],
    absences: [],
  };
},
created() {
  // this.getEtudiant();
  this.getEtudiantAbsences();
},
methods: {
  getEtudiant(){
    etudiantApi
      .getById(this.$route.params.id)
      .then((response) =>(this.etudiant = response))

      // .then(() => noteApi
      //   .getAllByIdEtudiant(this.$route.params.id)
      //   .then((response) => {this.notes = response
      //   console.log("notes")
      //   console.log(this.notes)}))
      // .then(() => absenceApi
      //   .getAllByIdEtudiant(this.$route.params.id)
      //   .then((response) => {this.absences = response
      //   console.log("absences")
      //   console.log(this.absences)}))
        //on veut requpeter pour récupé les notes via l'id
        //ses absences
  },
  getEtudiantAbsences(){
    absenceApi
      .getAllByIdEtudiant(this.$route.params.id)
      .then((response) => {this.absences = response
      console.log(this.absences)})
    // absenceApi
    //   .getAllByIdEtudiant(this.$route.params.id)
    //   .then((response) => {this.absences = response
    //   console.log(this.absences)})
  },
  // goBack() {
  //   this.$router.go(-1);
  // },
    // createCerfa(){
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") 
    //     this.$router.push({
    //       name: "admin_etudiant_cerfa",
    //       params: {id : this.$route.params.id},
    //     });
      
    // },
    // detailFicheSalarie() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_salarie_detail",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_salarie_detail",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_salarie_detail",
    //     });
    //   }
    // },
    // detailFicheEntreprise() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_entreprise_detail",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_entreprise_detail",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_entreprise_detail",
    //     });
    //   }
    // },
    // detailFichePoste() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_poste_detail",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_poste_detail",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_poste_detail",
    //     });
    //   }
    // },
    // editFicheSalarie() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_edit_fiche_salarie",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_edit_fiche_salarie",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_edit_fiche_salarie",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_etudiant_edit_fiche_salarie",
            
    //       });
    //       }
    //       */
    // },
    // editFichePoste() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_poste_update",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_poste_update",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_poste_update",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_etudiant_edit_fiche_poste",
            
    //       });
    //       }
    //       else {
    //         this.$router.push({
    //         name: "cef_etudiant_edit_fiche_poste",
    //       });
    //       }*/
    // },
    // editFicheEntreprise() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_entreprise_update",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_entreprise_update",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_entreprise_update",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_etudiant_edit_fiche_entreprise",
            
    //       });
    //       }
    //       else {
    //         this.$router.push({
    //         name: "cef_etudiant_edit_fiche_entreprise",
    //       });
    //       }*/
    // },
    // createFicheSalarie() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_salarie",
    //       params: {},
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_salarie",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_salarie",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_conge_create",
            
    //       });
    //       }
    //       else {
    //         this.$router.push({
    //         name: "cef_conge_create",
    //       });
    //       }*/
    // },
    // createFichePoste() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_poste",
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_poste",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_poste",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_conge_create",
            
    //       });
    //       }
    //       else {
    //         this.$router.push({
    //         name: "cef_conge_create",
    //       });
    //       }*/
    // },
    // createFicheEntreprise() {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_etudiant_fiche_entreprise",
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_etudiant_fiche_entreprise",
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_etudiant_fiche_entreprise",
    //     });
    //   }
    //   /*else {
    //         this.$router.push({
    //         name: "formateur_conge_create",
            
    //       });
    //       }
    //       else {
    //         this.$router.push({
    //         name: "cef_conge_create",
    //       });
    //       }*/
    // },

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
    // clickPromotion() {
    //   /*let route = this.$route.path.split("/").splice(1);
    //       if(route[0]== 'admin'){
    //         this.$router.push({
    //         name: "admin_promotion_detail",
    //         params: { id: promotion.id },
    //       });
    //       }
    //       else{
    //         this.$router.push({
    //         name: "referent-promotion-detail",
    //         params: { id: promotion.id },
    //       });
    //       }
          
    //       else if{
    //         this.$router.push({
    //         name: "formateur-promotion-detail",
    //         params: { id: promotion.id },
    //       });
    //       }
    //       else if{
    //         this.$router.push({
    //         name: "cef-promotion-detail",
    //         params: { id: promotion.id },
    //       });
    //       }*/
    // },
    // clickGroupe(groupe) {
    //   let route = this.$route.path.split("/").splice(1);
    //   if (route[0] == "admin") {
    //     this.$router.push({
    //       name: "admin_groupe_detail",
    //       params: {
    //         id: groupe.id,
    //       },
    //     });
    //   } else if (route[0] == "referent") {
    //     this.$router.push({
    //       name: "referent_groupe_detail",
    //       params: {
    //         id: groupe.id,
    //       },
    //     });
    //   } else if (route[0] == "cef") {
    //     this.$router.push({
    //       name: "cef_groupe_detail",
    //       params: {
    //         id: groupe.id,
    //       },
    //     });
    //   }
    //   /*
    //       else if{
    //         this.$router.push({
    //         name: "formateur-groupe-detail",
    //         params: { id: groupe.id },
    //       });
    //       }
    //       else if{
    //         this.$router.push({
    //         name: "cef-groupe-detail",
    //         params: { id: groupe.id },
    //       });
    //       }*/
    // },
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
      absenceApi
        .deleteAbsence(id)
        .then(() =>
          absenceApi
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