import Vue from 'vue'
import VueRouter from 'vue-router'
import Profil from '@/views/Etudiant/EspaceAdministratif/Profil.vue'
import DepotFichier from '@/views/Etudiant/EspaceAdministratif/DepotFichier.vue'
import DemandeConge from '@/views/Etudiant/EspaceAdministratif/DemandeConge.vue'
import Course from '@/views/Formateur/Cours/Cours.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
//import secure from '@/components/secure.vue'
import ReferentDashboard from '@/views/Referent/ReferentDashboard.vue'
import NotesR from '@/views/Referent/Notes.vue'
import AskDocumentAdministratif from '@/views/Referent/AskDocumentAdministratif.vue'
import GroupeProjet from '@/views/Referent/GroupeProjet.vue'
import Projets from '@/views/Referent/Projets.vue'
import Groupes from '@/views/Referent/Groupes.vue'
import CreateGroupe from '@/views/Referent/CreateGroupe.vue'
import CreateProjet from '@/views/Referent/CreateProjet.vue'
import ModifierGroupe from '@/views/Referent/ModifierGroupe.vue'
import ModifierProjet from '@/views/Referent/ModifierProjet.vue'
import AbsenceRetard from '@/views/Referent/AbsenceRetard.vue'
import CreateAbsenceRetard from '@/views/Referent/CreateAbsenceRetard.vue'
import Acceuil from '@/views/Etudiant/EspacePedagogique/Acceuil.vue'
import Absences from '@/views/Etudiant/EspacePedagogique/Absences.vue'
import Cursus from '@/views/Etudiant/EspacePedagogique/Cursus.vue'
import Devoirs from '@/views/Etudiant/EspacePedagogique/Devoirs.vue'
import DossierPro from '@/views/Etudiant/EspacePedagogique/DossierPro.vue'
import EvaluationFormation from '@/views/Etudiant/EspacePedagogique/EvaluationFormation.vue'
import Notes from '@/views/Etudiant/EspacePedagogique/Notes.vue'
import EtudiantR from '@/views/Referent/EtudiantR.vue'
import CoursR from '@/views/Referent/CoursR.vue'
import Home from "@/views/Home.vue"

Vue.use(VueRouter)

const routes = [

    { path:'/',name:"home",component:Home},
  { path: '/etudiant/espace-administratif/profil', name: 'Profil', component: Profil},
  { path: '/etudiant/espace-administratif/depot-fichier', name: 'DepotFichier', component: DepotFichier},
  { path: '/etudiant/espace-administratif/demande-conge', name: 'DemandeConge', component: DemandeConge},
  { path: '/formateur/cours', name: 'DashboardCours', component: Course },
  { path : '/login/LoginPage' , name:'login', component: LoginPage},
   // { path: '/secure', name: 'secure', component: secure},
  { path: '/referent/referentDashboard', name: 'ReferentDashboard', component: ReferentDashboard},
  { path: '/referent/notes', name: 'NotesR', component: NotesR},
  { path: '/referent/administratif', name: 'AskDocumentAdministratif', component: AskDocumentAdministratif},
  { path: '/referent/groupeProjet', name: 'GroupeProjet', component: GroupeProjet},
  { path: '/referent/Projets', name: 'Projets', component: Projets},
  { path: '/referent/Groupes', name: 'Groupes', component: Groupes},
  { path: '/referent/CreationGroupe', name: 'CreateGroupe', component: CreateGroupe},
  { path: '/referent/CreationProjet', name: 'CreateProjet', component: CreateProjet},
  { path: '/referent/ModifierGroupe', name: 'ModifierGroupe', component: ModifierGroupe},
  { path: '/referent/ModifierProjet', name: 'ModifierProjet', component: ModifierProjet},
  { path: '/referent/absence-retard', name: 'AbsenceRetard', component: AbsenceRetard},
  { path: '/referent/CreationAbsenceRetard', name: 'CreateAbsenceRetard', component: CreateAbsenceRetard},
  { path: '/etudiant/espace-pedagogique/acceuil', name: 'Acceuil ', component: Acceuil },
  { path: '/etudiant/espace-pedagogique/absences', name: 'Absences ', component: Absences },
  { path: '/etudiant/espace-pedagogique/cursus', name: 'Cursus ', component: Cursus },
  { path: '/etudiant/espace-pedagogique/devoirs', name: 'Devoirs ', component: Devoirs },
  { path: '/etudiant/espace-pedagogique/dossierPro', name: 'DossierPro ', component: DossierPro },
  { path: '/etudiant/espace-pedagogique/evaluationFormation', name: 'EvaluationFormation ', component: EvaluationFormation },
  { path: '/etudiant/espace-pedagogique/notes', name: 'Notes ', component: Notes },
  { path: '/referent/etudiants', name: 'EtudiantR', component: EtudiantR},
  { path: '/referent/cours', name: 'CoursR', component: CoursR},

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
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