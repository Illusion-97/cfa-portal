import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "@/views/Login/LoginPage.vue";
//import secure from '@/components/secure.vue'
// import Formateur
import Course from "@/views/Formateur/Cours/Cours.vue";
import AjoutCours from "@/views/Formateur/Cours/AjoutCours.vue";
// import Referent
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
import Home from "@/views/Home.vue";
import DevoirsR from "@/views/Referent/DevoirsR.vue";
import CreateDevoirR from "@/views/Referent/CreateDevoirR.vue";
import ModifierDevoirR from "@/views/Referent/ModifierDevoirR.vue";
import ExamenR from "@/views/Referent/ExamenR.vue";
import CreateExamenR from "@/views/Referent/CreateExamenR.vue";
import ModifierExamenR from "@/views/Referent/ModifierExamenR.vue";
import NoteInfoR from "@/views/Referent/NoteInfoR.vue";
import CreateSupportCoursR from "@/views/Referent/CreateSupportCoursR.vue";
// import Etudiant
import Acceuil from "@/views/Etudiant/EspacePedagogique/Acceuil.vue";
import Profil from "@/views/Etudiant/EspaceAdministratif/Profil.vue";
import DepotFichier from "@/views/Etudiant/EspaceAdministratif/DepotFichier.vue";
import DemandeConge from "@/views/Etudiant/EspaceAdministratif/DemandeConge.vue";
import Absences from "@/views/Etudiant/EspacePedagogique/Absences.vue";
import Cursus from "@/views/Etudiant/EspacePedagogique/Cursus.vue";
import Devoirs from "@/views/Etudiant/EspacePedagogique/Devoirs.vue";
import DossierPro from "@/views/Etudiant/EspacePedagogique/DossierPro.vue";
import EvaluationFormation from "@/views/Etudiant/EspacePedagogique/EvaluationFormation.vue";
import Notes from "@/views/Etudiant/EspacePedagogique/Notes.vue";

Vue.use(VueRouter);

const routes = [{ path: "/", name: "home", component: Home, },

{ path: "/login/LoginPage", name: "login", component: LoginPage, },
{ path: "/formateur/cours", name: "formateur_cours", component: Course, },
{ path: "/formateur/ajouter-cours", name: "formateur_ajouter-cours", component: AjoutCours, },
// { path: '/secure', name: 'secure', component: secure},
{ path: "/referent/dashboard", name: "referent_dashboard", component: ReferentDashboard, },
{ path: "/referent/notes", name: "referent_notes", component: NotesR, },
{ path: "/referent/administratif", name: "referent_document-administratif", component: AskDocumentAdministratif, },
{ path: "/referent/groupe-projet", name: "referent_groupe-projet", component: GroupeProjet, },
{ path: "/referent/projets", name: "referent_projets", component: Projets, },
{ path: "/referent/groupes", name: "referent-groupes", component: Groupes, },
{ path: "/referent/creation-groupe", name: "referent_create-groupe", component: CreateGroupe, },
{ path: "/referent/creation-projet", name: "referent_create-projet", component: CreateProjet, },
{ path: "/referent/modifier-groupe", name: "referent_modifier-groupe", component: ModifierGroupe, },
{ path: "/referent/modifier-projet", name: "referent_modifier-projet", component: ModifierProjet, },
{ path: "/referent/absence-retard", name: "referent_absence-retard", component: AbsenceRetard, },
{ path: "/referent/creation-absence-retard", name: "referent_create-absence-retard", component: CreateAbsenceRetard, },
{ path: "/referent/etudiants", name: "referent_etudiant", component: EtudiantR, },
{ path: "/referent/cours", name: "referent_cours", component: CoursR, },
{ path: "/referent/creation-cours", name: "referent_creation-cours", component: CreateCoursR, },
{ path: "/referent/devoirs", name: "referent_devoirs", component: DevoirsR, },
{ path: "/referent/creation-devoir", name: "referent_creation-devoirs", component: CreateDevoirR, },
{ path: "/referent/modifier-devoir", name: "referent_modifier-devoirs", component: ModifierDevoirR, },
{ path: "/referent/examens", name: "referent_exam", component: ExamenR, },
{ path: "/referent/creation-examen", name: "referent_creation-exam", component: CreateExamenR, },
{ path: "/referent/modifier-examen", name: "referent_modifier-exam", component: ModifierExamenR, },
{ path: "/referent/creation-note-info", name: "referent_notes", component: NoteInfoR, },
{ path: "/referent/creation-support-de-cours", name: "referent_creation-support", component: CreateSupportCoursR, },

{ path: "/etudiant/espace-administratif/profil", name: "etudiant_profil", component: Profil, },
{ path: "/etudiant/espace-administratif/depot-fichier", name: "etudiant_depot-fichier", component: DepotFichier, },
{ path: "/etudiant/espace-administratif/demande-conge", name: "etudiant_demande-conge", component: DemandeConge, },
{ path: "/etudiant/espace-pedagogique/accueil", name: "etudiant_espace-peda_accueil", component: Acceuil, },
{ path: "/etudiant/espace-pedagogique/absences", name: "etudiant_espace-peda_absences", component: Absences, },
{ path: "/etudiant/espace-pedagogique/cursus", name: "etudiant_espace-peda_cursus", component: Cursus, },
{ path: "/etudiant/espace-pedagogique/devoirs", name: "etudiant_espace-peda_devoirs", component: Devoirs, },
{ path: "/etudiant/espace-pedagogique/dossier-professionel", name: "etudiant_espace-peda_dossier-pro ", component: DossierPro, },
{ path: "/etudiant/espace-pedagogique/evaluation-formation", name: "etudiant_espace-peda_evaluation-formation ", component: EvaluationFormation, },
{ path: "/etudiant/espace-pedagogique/notes", name: "etudiant_espace-peda_notes", component: Notes, },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
/*export default new VueRouter({
  routes: [
      {
          path: '/',
          redirect: {
              name: "login"
          }
      },
      {
          path: "/Login/LoginPage",
          name: "login",
          component: LoginPage
      },
      {
          path: "/secure",
          name: "secure",
          component: Secure
      }
  ]
})*/