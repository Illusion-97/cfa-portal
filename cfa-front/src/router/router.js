import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/store.js';

// import { authenticationApi } from '@/_api/authentication.api.js';
import { Role } from '@/_helpers/role.js';

//Global
import Home from "@/views/Home.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
// import secure from '@/components/secure.vue'
// Global -> Intervention
import AllInterventions from "@/views/All/Intervention/AllInterventions.vue";
import AjoutIntervention from "@/views/All/Intervention/AjoutInterventions.vue";
import DetailIntervention from '@/views/All/Intervention/DetailIntervention.vue'
// Global -> Formation
import AllFormations from "@/views/All/Formation/AllFormation.vue";
import AjoutFormation from '@/views/All/Formation/AjoutFormation.vue'
import DetailFormation from "@/views/All/Formation/DetailFormation.vue";

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
import EtudiantRDetail from "@/views/Referent/EtudiantRDetail.vue";

//  ### Admin ###

//Utilisateur
import AdminDashboard from "@/views/Admin/AdminDashboard.vue";
import AddUser from "@/views/Admin/Crud/User/AddUser.vue";
import DetailUser from "@/views/Admin/Crud/User/DetailUser.vue"
//Promotion
import PromotionList from "@/views/Admin/Crud/Promotion/PromotionList.vue";
import PromotionCreate from "@/views/Admin/Crud/Promotion/PromotionCreate.vue";
import PromotionDetail from "@/views/Admin/Crud/Promotion/PromotionDetail.vue";
//Conge
import CongeList from "@/views/Admin/Crud/Conge/CongeList.vue";
import CongeCreate from "@/views/Admin/Crud/Conge/CongeCreate.vue";
import CongeDetail from "@/views/Admin/Crud/Conge/CongeDetail.vue";
//Examen
import ExamenList from "@/views/Admin/Crud/Examen/ExamenList.vue";
import ExamenCreate from "@/views/Admin/Crud/Examen/ExamenCreate.vue";
import ExamenDetail from "@/views/Admin/Crud/Examen/ExamenDetail.vue";
//Devoir
import DevoirList from "@/views/Admin/Crud/Devoir/DevoirList.vue";
import DevoirCreate from "@/views/Admin/Crud/Devoir/DevoirCreate.vue";
import DevoirDetail from "@/views/Admin/Crud/Devoir/DevoirDetail.vue";
//Note
import NoteList from "@/views/Admin/Crud/Note/NoteList.vue";
import NoteCreate from "@/views/Admin/Crud/Note/NoteCreate.vue";
import NoteDetail from "@/views/Admin/Crud/Note/NoteDetail.vue";
//PassageExamen
import PassageExamenList from "@/views/Admin/Crud/PassageExamen/PassageExamenList.vue";
import PassageExamenCreate from "@/views/Admin/Crud/PassageExamen/PassageExamenCreate.vue";
import PassageExamenDetail from "@/views/Admin/Crud/PassageExamen/PassageExamenDetail.vue";
//Projet
import ProjetList from "@/views/Admin/Crud/Projet/ProjetList.vue";
import ProjetCreate from "@/views/Admin/Crud/Projet/ProjetCreate.vue";
import ProjetDetail from "@/views/Admin/Crud/Projet/ProjetDetail.vue";
//Groupe
import GroupeList from "@/views/Admin/Crud/Groupe/GroupeList.vue";
import GroupeCreate from "@/views/Admin/Crud/Groupe/GroupeCreate.vue";
import GroupeDetail from "@/views/Admin/Crud/Groupe/GroupeDetail.vue";
//Etudiant
import EtudiantList from "@/views/Admin/Crud/Etudiant/EtudiantList.vue";
import EtudiantCreate from "@/views/Admin/Crud/Etudiant/EtudiantCreate.vue";
import EtudiantDetail from "@/views/Admin/Crud/Etudiant/EtudiantDetail.vue";
import EtudiantFicheSalarie from "@/views/Admin/Crud/Etudiant/EtudiantFicheSalarie.vue";
import EtudiantFichePoste from "@/views/Admin/Crud/Etudiant/EtudiantFichePoste.vue";
import EtudiantFicheEntreprise from "@/views/Admin/Crud/Etudiant/EtudiantFicheEntreprise.vue";
//Absence
import AbsenceCreate from "@/views/Admin/Crud/Absence/AbsenceCreate.vue";
import AbsenceDetail from "@/views/Admin/Crud/Absence/AbsenceDetail.vue";
//Adresse
import AdresseList from "@/views/Admin/Crud/Adresse/AdresseList.vue";
import AddAdresse from "@/views/Admin/Crud/Adresse/AdresseCreate.vue";
import AdresseDetail from "@/views/Admin/Crud/Adresse/AdresseDetail.vue";
//Entreprise
import EntrepriseList from "@/views/Admin/Crud/Entreprise/EntrepriseList.vue";
import AddEntreprise from "@/views/Admin/Crud/Entreprise/EntrepriseCreate.vue";
import EntrepriseDetail from "@/views/Admin/Crud/Entreprise/EntrepriseDetail.vue";
//Cursus
import CursusList from "@/views/Admin/Crud/Cursus/CursusList.vue";
import AddCursus from "@/views/Admin/Crud/Cursus/CursusCreate.vue";
import CursusDetail from "@/views/Admin/Crud/Cursus/CursusDetail.vue";


Vue.use(VueRouter);

const routes = [

  { path: '*', redirect: '/' },

  //Global

  { path: "/", name: "home", component: Home, },
  { path: "/login", name: "login", component: LoginPage },
  // { path: '/secure', name: 'secure', component: secure},
  // Global -> Intervention
  { path: "/admin/intervention", name: "all-intervention", component: AllInterventions },
  { path: "/admin/ajouter-intervention", component: AjoutIntervention, name: "ajouter-intervention"},
  { path: "/admin/detail-intervention/:id", component: DetailIntervention, name: "intervention-detail" },
  { path: "/admin/modifier-intervention/:id", name: "modifier-intervention", component: AjoutIntervention },


  // Global -> Formation
  { path: "/admin/formation", name: "all-formations", component: AllFormations },
  { path: "/admin/ajouter-formation", name: "ajouter-formation", component: AjoutFormation },
  { path: "/admin/detail-formation/:id", component: DetailFormation, name: "formation-detail" },
  { path: "/admin/modifier-formation/:id", component: AjoutFormation, name: "modifier-formation" },
  //  ### Etudiant Administratif ###
  { path: "/etudiant/espace-administratif/profil", name: "etudiant_profil", component: Profil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/documents-administratifs", name: "etudiant_documents_administratifs", component: DepotFichier, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/demande-conge", name: "etudiant_conge", component: DemandeConge, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-salarie", name: "fiche-salarie", component: FicheSalarie, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-poste", name: "fiche-poste", component: FichePoste, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-entreprise", name: "fiche-entreprise", component: FicheEntreprise, meta: { authorize: [Role.Etudiant] } },

  //  ### Etudiant Pedagogique  ###
  { path: "/etudiant/espace-pedagogique/accueil", name: "etudiant_espace-peda_accueil", component: Acceuil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/absences", name: "etudiant_espace-peda_absences", component: Absences, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus", name: "etudiant_espace-peda_cursus", component: Cursus, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/devoirs", name: "etudiant_espace-peda_devoirs", component: Devoirs, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossierPro", name: "etudiant_espace-peda_dossier-pro", component: DossierPro, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/evaluation-formation", name: "etudiant_espace-peda_evaluation-formation", component: EvaluationFormation, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes", name: "etudiant_espace-peda_notes", component: Notes, meta: { authorize: [Role.Etudiant] } },

  //  ### Formateur ###
  { path: "/formateur/intervention", name: "formateur_intervention", component: Intervention },

  //  ### Admin ###
  //Utilisateur
  { path: "/admin/dashboard", name: "admin_dashboard", component: AdminDashboard },
  { path: "/admin/addUser", name: "admin_addUser", component: AddUser },
  { path: "/admin/user-update/:id", name: "admin_user_update", component: AddUser },
  //{ path: "/admin/userList", name:"admin_userList", component: UserList},
  { path: "/admin/user-detail/:id", name: "admin_user_detail", component: DetailUser },
  //Promotion
  { path: "/admin/promotion-list", name: "admin_promotion_list", component: PromotionList },
  { path: "/admin/promotion-create", name: "admin_promotion_create", component: PromotionCreate },
  { path: "/admin/promotion-update/:id", name: "admin_promotion_update", component: PromotionCreate },
  { path: "/admin/promotion-detail/:id", name: "admin_promotion_detail", component: PromotionDetail },
  //Adresse
  { path: "/admin/adresse-list", name: "admin_adresse_list", component: AdresseList },
  { path: "/admin/addAdresse", name: "admin_addAdresse", component: AddAdresse },
  { path: "/admin/adresse-detail/:id", name: "admin_adresse_detail", component: AdresseDetail },
  { path: "/admin/adresse-update/:id", name: "admin_adresse_update", component: AddAdresse },
  //Conge
  { path: "/admin/conge-list", name:"admin_conge_list", component: CongeList},
  { path: "/admin/conge-create/:id", name:"admin_conge_create", component: CongeCreate},
  { path: "/admin/conge-update/:id", name:"admin_conge_update", component: CongeCreate},
  { path: "/admin/conge-detail/:id", name:"admin_conge_detail", component: CongeDetail},
  //Examen
  { path: "/admin/examen-list", name: "admin_examen_list", component: ExamenList },
  { path: "/admin/examen-create", name: "admin_examen_create", component: ExamenCreate },
  { path: "/admin/examen-update/:id", name: "admin_examen_update", component: ExamenCreate },
  { path: "/admin/examen-detail/:id", name: "admin_examen_detail", component: ExamenDetail },
  //Devoir
  { path: "/admin/devoir-list", name: "admin_devoir_list", component: DevoirList },
  { path: "/admin/devoir-create", name: "admin_devoir_create", component: DevoirCreate },
  { path: "/admin/devoir-update/:id", name: "admin_devoir_update", component: DevoirCreate },
  { path: "/admin/devoir-detail/:id", name: "admin_devoir_detail", component: DevoirDetail },
  //Entreprise
  { path: "/admin/entreprise-list", name:"admin_entreprise_list", component: EntrepriseList},
  { path: "/admin/addEntreprise", name:"admin_addEntreprise", component: AddEntreprise},
  { path: "/admin/entreprise-detail/:id", name:"admin_entreprise_detail", component: EntrepriseDetail},
  { path: "/admin/entreprise-update/:id", name:"admin_entreprise_update", component: AddEntreprise},
  //Cursus
  { path: "/admin/cursus-list", name:"admin_cursus_list", component: CursusList},
  { path: "/admin/addCursus", name:"admin_addCursus", component: AddCursus},
  { path: "/admin/cursus-detail/:id", name:"admin_cursus_detail", component: CursusDetail},
  { path: "/admin/cursus-update/:id", name:"admin_cursus_update", component: AddCursus},
  //Note
  { path: "/admin/note-list", name:"admin_note_list", component: NoteList},
  { path: "/admin/note-create/:id", name:"admin_note_create", component: NoteCreate},
  { path: "/admin/note-update/:id", name:"admin_note_update", component: NoteCreate},
  { path: "/admin/note-detail/:id", name:"admin_note_detail", component: NoteDetail},
  //PassageExamen
  { path: "/admin/passage-examen-list", name:"admin_passage-examen_list", component: PassageExamenList},
  { path: "/admin/passage-examen-create", name:"admin_passage-examen_create", component: PassageExamenCreate},
  { path: "/admin/passage-examen-update/:id", name:"admin_passage-examen_update", component: PassageExamenCreate},
  { path: "/admin/passage-examen-detail/:id", name:"admin_passage-examen_detail", component: PassageExamenDetail},
  //Projet
  { path: "/admin/projet-list", name:"admin_projet_list", component: ProjetList},
  { path: "/admin/projet-create", name:"admin_projet_create", component: ProjetCreate},
  { path: "/admin/projet-update/:id", name:"admin_projet_update", component: ProjetCreate},
  { path: "/admin/projet-detail/:id", name:"admin_projet_detail", component: ProjetDetail},
  //Groupe
  { path: "/admin/groupe-list", name:"admin_groupe_list", component: GroupeList},
  { path: "/admin/groupe-create", name:"admin_groupe_create", component: GroupeCreate},
  { path: "/admin/groupe-update/:id", name:"admin_groupe_update", component: GroupeCreate},
  { path: "/admin/groupe-detail/:id", name:"admin_groupe_detail", component: GroupeDetail},
   //Etudiant
   { path: "/admin/etudiant-list", name:"admin_etudiant_list", component: EtudiantList},
   { path: "/admin/etudiant-create", name:"admin_etudiant_create", component: EtudiantCreate},
   { path: "/admin/etudiant-update/:id", name:"admin_etudiant_update", component: EtudiantCreate},
   { path: "/admin/etudiant-detail/:id", name:"admin_etudiant_detail", component: EtudiantDetail},
   { path: "/admin/etudiant-fiche-salarie", name:"admin_etudiant_fiche_salarie", component: EtudiantFicheSalarie},
   { path: "/admin/etudiant-fiche-poste", name:"admin_etudiant_fiche_poste", component: EtudiantFichePoste},
   { path: "/admin/etudiant-fiche-entreprise", name:"admin_etudiant_fiche_entreprise", component: EtudiantFicheEntreprise},
   //Absence
   { path: "/admin/absence-create/:id", name:"admin_absence_create", component: AbsenceCreate},
   { path: "/admin/absence-update/:id", name:"admin_absence_update", component: AbsenceCreate},
   { path: "/admin/absence-detail/:id", name:"admin_absence_detail", component: AbsenceDetail},


  //  ### Referent ###
  { path: "/referent/dashboard", name: "referent_dashboard", component: ReferentDashboard},
  { path: "/referent/notes", name: "referent_notes", component: NotesR},
  { path: "/referent/administratif", name: "referent_document-administratif", component: AskDocumentAdministratif},
  { path: "/referent/groupe-projet", name: "referent_groupe-projet", component: GroupeProjet},
  { path: "/referent/projets", name: "referent_projets", component: Projets},
  { path: "/referent/groupes", name: "referent-groupes", component: Groupes},
  { path: "/referent/creation-groupe", name: "referent_create-groupe", component: CreateGroupe},
  { path: "/referent/creation-projet", name: "referent_create-projet", component: CreateProjet},
  { path: "/referent/modifier-groupe", name: "referent_modifier-groupe", component: ModifierGroupe},
  { path: "/referent/modifier-projet", name: "referent_modifier-projet", component: ModifierProjet},
  { path: "/referent/absence-retard", name: "referent_absence-retard", component: AbsenceRetard},
  { path: "/referent/creation-absence-retard", name: "referent_create-absence-retard", component: CreateAbsenceRetard},
  { path: "/referent/cours", name: "referent_cours", component: CoursR},
  { path: "/referent/creation-cours", name: "CreateCoursR", component: CreateCoursR},
  { path: "/referent/devoirs", name: "DevoirsR", component: DevoirsR},
  { path: "/referent/creation-devoir", name: "CreateDevoirR", component: CreateDevoirR},
  { path: "/referent/modifier-devoir", name: "ModifierDevoirR", component: ModifierDevoirR},
  { path: "/referent/examens", name: "ExamenR", component: ExamenR},
  { path: "/referent/creation-examen", name: "CreateExamenR", component: CreateExamenR},
  { path: "/referent/modifier-examen", name: "ModifierExamenR", component: ModifierExamenR},
  { path: "/referent/creation-note-info", name: "NoteInfoR", component: NoteInfoR},
  { path: "/referent/creation-support-de-cours", name: "CreateSupportCoursR", component: CreateSupportCoursR},
  //etudiant
  { path: "/referent/etudiants", name: "referent_etudiant", component: EtudiantR},
  { path: "/referent/etudiant-detail:id", name: "referent_etudiant_detail", component: EtudiantRDetail},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = store.getters.getUtilisateur;

  if (to.path !== "/login") {
    const isUserLoggedIn = store.getters.isUserLoggedIn;
    //Si pas loggin, on redirect sur /login
    if (!isUserLoggedIn)
      return next({ path: '/login' });
    //return next({ path: '/login', query: { returnUrl: to.path } });

    //Si la page nécessite une autorisation
    if (authorize) {

      let redirect = true;
      //Si la page nécessite un Role particulié
      if (authorize.length) {
        //on regarde si l'utilisateur a une role autorisé
        for (let i = 0; i < currentUser.rolesDto.length; i++) {
          if (authorize.includes(currentUser.rolesDto[i].intitule)) {
            redirect = false;
          }
        }
      }
      //l'utilisateur n'a pas de role autorisé => redirect vers /home
      if (redirect)
        return next({ path: '/' });

    }

  }


  next();

})

export default router;