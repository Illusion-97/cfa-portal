import Vue from "vue";
import VueRouter from "vue-router";

// import { authenticationApi } from '@/_api/authentication.api.js';
import { Role } from '@/_helpers/role.js';

//Global
import Home from "@/views/Home.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
// import secure from '@/components/secure.vue'
import AllInterventions from "../views/All/AllInterventions.vue";
import AjoutIntervention from "@/views/All/AjoutInterventions.vue";
import DetailIntervention from '@/views/All/DetailIntervention.vue'
import AllFormations from "../views/All/AllFormation.vue";
import AjoutFormation from '@/views/All/AjoutFormation.vue'

//Etudiant Administratif
import Profil from "@/views/Etudiant/EspaceAdministratif/Profil.vue";
import DepotFichier from "@/views/Etudiant/EspaceAdministratif/DepotFichier.vue";
import DemandeConge from "@/views/Etudiant/EspaceAdministratif/DemandeConge.vue";
import FicheSalarie from "@/views/Etudiant/EspaceAdministratif/FicheSalarie.vue"
import FichePoste from "@/views/Etudiant/EspaceAdministratif/FichePoste.vue"
import FicheEntreprise from "@/views/Etudiant/EspaceAdministratif/FicheEntreprise.vue"

//Etudiant Pedagogique
import Acceuil from "@/views/Etudiant/EspacePedagogique/Acceuil.vue";
import Absences from "@/views/Etudiant/EspacePedagogique/Absences.vue";
import Cursus from "@/views/Etudiant/EspacePedagogique/Cursus.vue";
import Devoirs from "@/views/Etudiant/EspacePedagogique/Devoirs.vue";
import DossierPro from "@/views/Etudiant/EspacePedagogique/DossierPro.vue";
import EvaluationFormation from "@/views/Etudiant/EspacePedagogique/EvaluationFormation.vue";
import Notes from "@/views/Etudiant/EspacePedagogique/Notes.vue";

//Formateur
// import Intervention from "@/views/Formateur/Interventions/Intervention.vue";
import Intervention from '@/views/Formateur/Interventions/Interventions.vue'

//Referent
import ReferentDashboard from "@/views/Referent/ReferentDashboard.vue";
import NotesR from "@/views/Referent/Notes.vue";
import AskDocumentAdministratif from "@/views/Referent/AskDocumentAdministratif.vue";
import GroupeProjet from "@/views/Referent/GroupeProjet.vue";
import Projets from "@/views/Referent/Projets.vue";
import Groupes from "@/views/Referent/Groupes.vue";
import CreateGroupe from "@/views/Referent/CreateGroupe.vue";
import CreateProjet from "@/views/Referent/CreateProjet.vue";
import ModifierGroupe from "@/views/Referent/ModifierGroupe.vue";
import ModifierProjet from "@/views/Referent/ModifierProjet.vue";
import AbsenceRetard from "@/views/Referent/AbsenceRetard.vue";
import CreateAbsenceRetard from "@/views/Referent/CreateAbsenceRetard.vue";
import EtudiantR from "@/views/Referent/EtudiantR.vue";
import CoursR from "@/views/Referent/CoursR.vue";
import CreateCoursR from "@/views/Referent/CreateCoursR.vue";
import DevoirsR from "@/views/Referent/DevoirsR.vue";
import CreateDevoirR from "@/views/Referent/CreateDevoirR.vue";
import ModifierDevoirR from "@/views/Referent/ModifierDevoirR.vue";
import ExamenR from "@/views/Referent/ExamenR.vue";
import CreateExamenR from "@/views/Referent/CreateExamenR.vue";
import ModifierExamenR from "@/views/Referent/ModifierExamenR.vue";
import NoteInfoR from "@/views/Referent/NoteInfoR.vue";
import CreateSupportCoursR from "@/views/Referent/CreateSupportCoursR.vue";

Vue.use(VueRouter);

const routes = [

  { path: '*', redirect: '/' },

  //Global
  { path: "/", name: "home", component: Home, },
  { path: "/login/LoginPage", name: "login", component: LoginPage },
  // { path: '/secure', name: 'secure', component: secure},
  { path: "/intervention", name: "all-intervention", component: AllInterventions },
  { path: "/ajouter-intervention", name: "ajouter-intervention", component: AjoutIntervention, meta: { authorize: [Role.Admin] } },
  { path: "/formation", name: "all-formations", component: AllFormations, meta: { authorize: [Role.Admin] } },
  { path: "/ajouter-formation", name: "ajouter-formation", component: AjoutFormation, meta: { authorize: [Role.Admin] } },
  
  //Etudiant Administratif
  { path: "/etudiant/espace-administratif/profil", name: "etudiant_profil", component: Profil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/documents-administratifs", name: "etudiant_documents_administratifs", component: DepotFichier, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/demande-conge", name: "etudiant_conge", component: DemandeConge, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-salarie", name: "fiche-salarie", component: FicheSalarie, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-poste", name: "fiche-poste", component: FichePoste, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-entreprise", name: "fiche-entreprise", component: FicheEntreprise, meta: { authorize: [Role.Etudiant] } },

  //Etudiant Pedagogique
  { path: "/etudiant/espace-pedagogique/accueil", name: "etudiant_espace-peda_accueil", component: Acceuil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/absences", name: "etudiant_espace-peda_absences", component: Absences, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus", name: "etudiant_espace-peda_cursus", component: Cursus, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/devoirs", name: "etudiant_espace-peda_devoirs", component: Devoirs, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossierPro", name: "etudiant_espace-peda_dossier-pro", component: DossierPro, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/evaluation-formation", name: "etudiant_espace-peda_evaluation-formation", component: EvaluationFormation, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes", name: "etudiant_espace-peda_notes", component: Notes, meta: { authorize: [Role.Etudiant] } },

  //Formateur
  { path: "/formateur/intervention", name: "formateur_intervention", component: Intervention, meta: { authorize: [Role.Formateur] } },
  { path: "/detail-intervention/:id", component: DetailIntervention, name: "intervention-detail" },

  //Referent
  { path: "/referent/dashboard", name: "referent_dashboard", component: ReferentDashboard, meta: { authorize: [Role.Referent] } },
  { path: "/referent/notes", name: "referent_notes", component: NotesR, meta: { authorize: [Role.Etudiant] } },
  { path: "/referent/administratif", name: "referent_document-administratif", component: AskDocumentAdministratif, meta: { authorize: [Role.Referent] } },
  { path: "/referent/groupe-projet", name: "referent_groupe-projet", component: GroupeProjet, meta: { authorize: [Role.Referent] } },
  { path: "/referent/projets", name: "referent_projets", component: Projets, meta: { authorize: [Role.Referent] } },
  { path: "/referent/groupes", name: "referent-groupes", component: Groupes, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-groupe", name: "referent_create-groupe", component: CreateGroupe, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-projet", name: "referent_create-projet", component: CreateProjet, meta: { authorize: [Role.Referent] } },
  { path: "/referent/modifier-groupe", name: "referent_modifier-groupe", component: ModifierGroupe, meta: { authorize: [Role.Referent] } },
  { path: "/referent/modifier-projet", name: "referent_modifier-projet", component: ModifierProjet, meta: { authorize: [Role.Referent] } },
  { path: "/referent/absence-retard", name: "referent_absence-retard", component: AbsenceRetard, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-absence-retard", name: "referent_create-absence-retard", component: CreateAbsenceRetard, meta: { authorize: [Role.Referent] } },
  { path: "/referent/etudiants", name: "referent_etudiant", component: EtudiantR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/cours", name: "referent_cours", component: CoursR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-cours", name: "CreateCoursR", component: CreateCoursR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/devoirs", name: "DevoirsR", component: DevoirsR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-devoir", name: "CreateDevoirR", component: CreateDevoirR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/modifier-devoir", name: "ModifierDevoirR", component: ModifierDevoirR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/examens", name: "ExamenR", component: ExamenR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-examen", name: "CreateExamenR", component: CreateExamenR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/modifier-examen", name: "ModifierExamenR", component: ModifierExamenR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-note-info", name: "NoteInfoR", component: NoteInfoR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/creation-support-de-cours", name: "CreateSupportCoursR", component: CreateSupportCoursR, meta: { authorize: [Role.Referent] } },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
/*
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationApi.currentUserValue;

  if (authorize) {
      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      let redirect = true;
      if(authorize.length){
        for(let i=0; i<currentUser.role.length; i++){
          if(authorize.includes(currentUser.role[i])){
            redirect = false;
          }         
        }        
      }        
          
      if(redirect)
        return next({ path: '/' });

      // // check if route is restricted by role
      // if (authorize.length && !authorize.includes(currentUser.role)) {
      //     // role not authorised so redirect to home page
      //     return next({ path: '/' });
      // }
  }

  next();
})
*/
export default router;