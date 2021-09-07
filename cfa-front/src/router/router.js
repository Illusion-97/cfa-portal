import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/store.js';

// import { authenticationApi } from '@/_api/authentication.api.js';
import { Role } from '@/_helpers/role.js';


//#######################
//#       READ ME       #
//#######################

// Les imports et les routes sont rangés dans l'ordre :
//  - GLOBAL
//  - ETUDIANT
//  - FORMATEUR
//  - REFERENT
//  - ADMIN


//          #######################
//          #       IMPORTS       #
//          #######################


//#######################
//#       GLOBAL        #
//#######################
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


//#######################
//#       ETUDIANT      #
//#######################

//Etudiant Administratif
import Profil from "@/views/Etudiant/EspaceAdministratif/Profil.vue";
import DepotFichier from "@/views/Etudiant/EspaceAdministratif/DepotFichier.vue";
import DemandeConge from "@/views/Etudiant/EspaceAdministratif/DemandeConge.vue";
import FicheSalarie from "@/views/Etudiant/EspaceAdministratif/FicheSalarie.vue"
import FichePoste from "@/views/Etudiant/EspaceAdministratif/FichePoste.vue"
import FicheEntreprise from "@/views/Etudiant/EspaceAdministratif/FicheEntreprise.vue"
//Etudiant Pedagogique
// import Acceuil from "@/views/Etudiant/EspacePedagogique/Acceuil.vue";
import CursusDetails from "@/views/Etudiant/EspacePedagogique/CursusDetails.vue";
import Cursus from "@/views/Etudiant/EspacePedagogique/Cursus.vue";
import Absences from "@/views/Etudiant/EspacePedagogique/Absences.vue";
import Devoirs from "@/views/Etudiant/EspacePedagogique/Devoirs.vue";
import DossierProfessionel from "@/views/Etudiant/EspacePedagogique/DossierProfessionel.vue";
import DossierProjet from "@/views/Etudiant/EspacePedagogique/DossierProjet.vue";
import Notes from "@/views/Etudiant/EspacePedagogique/Notes.vue";
import NotesDetails from "@/views/Etudiant/EspacePedagogique/NotesDetails.vue";

//#######################
//#       FORMATEUR     #
//#######################
import Intervention from '@/views/Formateur/Interventions/Interventions.vue'

//#######################
//#       REFERENT      #
//#######################
//Divers
import ReferentDashboard from "@/views/Referent/ReferentDashboard.vue";
import NotesR from "@/views/Referent/Notes.vue";
import AskDocumentAdministratif from "@/views/Referent/AskDocumentAdministratif.vue";
import NoteInfoR from "@/views/Referent/NoteInfoR.vue";
import CreateSupportCoursR from "@/views/Referent/CreateSupportCoursR.vue";
//???
import GroupeProjet from "@/views/Referent/GroupeProjet.vue";
//Projet
import Projets from "@/views/Referent/Projets.vue";
import CreateProjet from "@/views/Referent/CreateProjet.vue";
import ModifierProjet from "@/views/Referent/ModifierProjet.vue";
//Groupe
import Groupes from "@/views/Referent/Groupes.vue";
import CreateGroupe from "@/views/Referent/CreateGroupe.vue";
import ModifierGroupe from "@/views/Referent/ModifierGroupe.vue";
//Absence
import AbsenceRetard from "@/views/Referent/AbsenceRetard.vue";
import CreateAbsenceRetard from "@/views/Referent/CreateAbsenceRetard.vue";
//Etudiant
import EtudiantR from "@/views/Referent/EtudiantR.vue";
// import EtudiantRDetail from "@/views/Referent/EtudiantRDetail.vue";
//Intervention
import CoursR from "@/views/Referent/CoursR.vue";
import CreateCoursR from "@/views/Referent/CreateCoursR.vue";
//devoir
import DevoirsR from "@/views/Referent/DevoirsR.vue";
//import CreateDevoirR from "@/views/Referent/CreateDevoirR.vue";
//import ModifierDevoirR from "@/views/Referent/ModifierDevoirR.vue";
//Examen
import ExamenR from "@/views/Referent/ExamenR.vue";
//import CreateExamenR from "@/views/Referent/CreateExamenR.vue";
//import ModifierExamenR from "@/views/Referent/ModifierExamenR.vue";


//#######################
//#       ADMIN         #
//#######################

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





//          #######################
//          #       ROUTES        #
//          #######################


Vue.use(VueRouter);

const routes = [

  { path: '*', redirect: '/home' },

  //#######################
  //#       GLOBAL        #
  //#######################

  { path: "/home", name: "home", component: Home, },
  { path: "/login", name: "login", component: LoginPage },
  // { path: '/secure', name: 'secure', component: secure},


  //#######################
  //#       ETUDIANT      #
  //#######################

  //Administratif 
  { path: "/etudiant/espace-administratif", name: "etudiant_administratif", redirect: {name: 'etudiant_profil'}, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/profil", name: "etudiant_profil", component: Profil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/documents-administratifs", name: "etudiant_documents_administratifs", component: DepotFichier, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/demande-conge", name: "etudiant_conge", component: DemandeConge, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-salarie", name: "fiche-salarie", component: FicheSalarie, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-poste", name: "fiche-poste", component: FichePoste, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-entreprise", name: "fiche-entreprise", component: FicheEntreprise, meta: { authorize: [Role.Etudiant] } },
  //Etudiant Pedagogique
  { path: "/etudiant/espace-pedagogique", name: "etudiant_espace-peda_accueil", redirect: { name: 'etudiant_espace-peda_cursus' }, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus", name: "etudiant_espace-peda_cursus", component: Cursus, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/absences", name: "etudiant_espace-peda_absences", component: Absences, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/devoirs", name: "etudiant_espace-peda_devoirs", component: Devoirs, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossier-professionnel", name: "etudiant_espace-peda_dossier-pro", component: DossierProfessionel, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossier-projet", name: "etudiant_espace-peda_dossier-projet", component: DossierProjet, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes", name: "etudiant_espace-peda_notes", component: Notes, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes/details/:id", name: "etudiant_espace-peda_notesdetails", component: NotesDetails, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus/detail/:id", name: "etudiant_espace-peda_cursusdetails", component: CursusDetails , meta: { authorize: [Role.Etudiant] } },

  //#######################
  //#       FORMATEUR     #
  //#######################

  { path: "/formateur/interventions", name: "formateur_intervention", component: Intervention },
  { path: "/formateur/interventions/detail/:id", name: "formateur-intervention-detail", component: DetailIntervention},

  
  //#######################
  //#       REFERENT      #
  //#######################

  { path: "/referent/", name: "referent_dashboard", redirect: {name: 'referent_promotions'}},
  //Divers  
  { path: "/referent/promotions", name: "referent_promotions", component: ReferentDashboard},
  { path: "/referent/notes", name: "referent_notes", component: NotesR},
  { path: "/referent/administratif", name: "referent_document-administratif", component: AskDocumentAdministratif},
  { path: "/referent/note-info/create", name: "NoteInfoR", component: NoteInfoR},
  { path: "/referent/support-de-cours/create", name: "CreateSupportCoursR", component: CreateSupportCoursR},
  //Groupe/Projet
  { path: "/referent/groupe-projet", name: "referent_groupe-projet", component: GroupeProjet},
  //Projet
  { path: "/referent/projets", name: "referent_projets", component: Projets},
  { path: "/referent/projets/update", name: "referent_modifier-projet", component: ModifierProjet},
  { path: "/referent/projets/create", name: "referent_create-projet", component: CreateProjet},
  //Groupe
  { path: "/referent/groupes", name: "referent-groupes", component: Groupes},
  { path: "/referent/groupes/create", name: "referent_create-groupe", component: CreateGroupe},
  { path: "/referent/groupes/update", name: "referent_modifier-groupe", component: ModifierGroupe},
  //Absence
  { path: "/referent/absence-retard", name: "referent_absence-retard", component: AbsenceRetard},
  { path: "/referent/absence-retard/create", name: "referent_create-absence-retard", component: CreateAbsenceRetard},
  //Intervention
  { path: "/referent/interventions", name: "referent_cours", component: CoursR},
  { path: "/referent/interventions/:id", name: "referent-intervention-detail", component: DetailIntervention},
  { path: "/referent/interventions/create", name: "CreateCoursR", component: CreateCoursR},
  //Devoir
  { path: "/referent/devoirs", name: "DevoirsR", component: DevoirsR},
  //{ path: "/referent/devoirs/create", name: "CreateDevoirR", component: CreateDevoirR},
  //{ path: "/referent/devoirs/update", name: "ModifierDevoirR", component: ModifierDevoirR},

  { path: "/referent/devoirs/create", name: "referent_devoir_create", component: DevoirCreate },
  { path: "/referent/devoirs/update/:id", name: "referent_devoir_update", component: DevoirCreate },
  { path: "/referent/devoirs/detail/:id", name: "referent_devoir_detail", component: DevoirDetail },
  //Examen
  { path: "/referent/examens", name: "ExamenR", component: ExamenR},
  //{ path: "/referent/examens/create", name: "CreateExamenR", component: CreateExamenR},
  //{ path: "/referent/examens/update", name: "ModifierExamenR", component: ModifierExamenR},  
  
  { path: "/referent/examens/create", name: "referent_examen_create", component: ExamenCreate },
  { path: "/referent/examens/update/:id", name: "referent_examen_update", component: ExamenCreate },
  { path: "/referent/examens/detail/:id", name: "referent_examen_detail", component: ExamenDetail },
  //Etudiant
  { path: "/referent/etudiants", name: "referent_etudiant", component: EtudiantR},
  { path: "/referent/etudiants/detail/:id", name: "referent_etudiant_detail", component: EtudiantDetail},
  //Promo
  { path: "/referent/promotions/detail/:id", name: "referent-promotion-detail", component: PromotionDetail },
  { path: "/referent/promotions/update/:id", name: "referent_promotion_update", component: PromotionCreate },
  { path: "/referent/promotions/create", name: "referent_promotion_create", component: PromotionCreate },
  //Groupe
  { path: "/referent/groupes/detail/:id", name:"referent_groupe_detail", component: GroupeDetail},
  //Note
  { path: "/referent/notes/detail/:id", name:"referent_note_detail", component: NoteDetail},
  { path: "/referent/notes/update/:id", name:"referent_note_update", component: NoteCreate},
  { path: "/referent/notes/create/:id", name:"referent_note_create", component: NoteCreate},
  //Absence
  { path: "/referent/absences/detail/:id", name:"referent_absence_detail", component: AbsenceDetail},
  { path: "/referent/absences/create/:id", name:"referent_absence_create", component: AbsenceCreate},
   { path: "/referent/absences/update/:id", name:"referent_absence_update", component: AbsenceCreate},
  //Conge
  { path: "/referent/conges/detail/:id", name:"referent_conge_detail", component: CongeDetail},
  { path: "/referent/conges/create/:id", name:"referent_conge_create", component: CongeCreate},
  { path: "/referent/conges/update/:id", name:"referent_conge_update", component: CongeCreate},
  //Etudiant
  { path: "/referent/etudiants/detail/:id", name:"referent_etudiant_detail", component: EtudiantDetail},

  //#######################
  //#       ADMIN         #
  //#######################
  
  { path: "/admin/", name: "admin_dashboard", redirect: {name: 'admin_utilisateur'} },
  //Utilisateur
  { path: "/admin/utilisateurs", name: "admin_utilisateur", component: AdminDashboard },
  { path: "/admin/utilisateurs/create", name: "admin_addUser", component: AddUser },
  { path: "/admin/utilisateurs/update/:id", name: "admin_user_update", component: AddUser },
  { path: "/admin/utilisateurs/detail/:id", name: "admin_user_detail", component: DetailUser },
   // Intervention
   { path: "/admin/interventions", name: "all-intervention", component: AllInterventions },
   { path: "/admin/interventions/create", component: AjoutIntervention, name: "ajouter-intervention"},
   { path: "/admin/interventions/update/:id", name: "modifier-intervention", component: AjoutIntervention }, 
   { path: "/admin/interventions/detail/:id", component: DetailIntervention, name: "intervention-detail" },
   // Formation
   { path: "/admin/formations", name: "all-formations", component: AllFormations },
   { path: "/admin/formations/create", name: "ajouter-formation", component: AjoutFormation },
   { path: "/admin/formations/update/:id", component: AjoutFormation, name: "modifier-formation" },
   { path: "/admin/formations/detail/:id", component: DetailFormation, name: "formation-detail" },
  //Promotion
  { path: "/admin/promotions", name: "admin_promotion_list", component: PromotionList },
  { path: "/admin/promotions/create", name: "admin_promotion_create", component: PromotionCreate },
  { path: "/admin/promotions/update/:id", name: "admin_promotion_update", component: PromotionCreate },
  { path: "/admin/promotions/detail/:id", name: "admin_promotion_detail", component: PromotionDetail },
  //Adresse
  { path: "/admin/adresses", name: "admin_adresse_list", component: AdresseList },
  { path: "/admin/adresses/create", name: "admin_addAdresse", component: AddAdresse },
  { path: "/admin/adresses/update/:id", name: "admin_adresse_update", component: AddAdresse },
  { path: "/admin/adresses/detail/:id", name: "admin_adresse_detail", component: AdresseDetail },
  //Conge
  { path: "/admin/conges", name:"admin_conge_list", component: CongeList},
  { path: "/admin/conges/create/:id", name:"admin_conge_create", component: CongeCreate},
  { path: "/admin/conges/update/:id", name:"admin_conge_update", component: CongeCreate},
  { path: "/admin/conges/detail/:id", name:"admin_conge_detail", component: CongeDetail},
  //Examen
  { path: "/admin/examens", name: "admin_examen_list", component: ExamenList },
  { path: "/admin/examens/create", name: "admin_examen_create", component: ExamenCreate },
  { path: "/admin/examens/update/:id", name: "admin_examen_update", component: ExamenCreate },
  { path: "/admin/examens/detail/:id", name: "admin_examen_detail", component: ExamenDetail },
  //Devoir
  { path: "/admin/devoirs", name: "admin_devoir_list", component: DevoirList },
  { path: "/admin/devoirs/create", name: "admin_devoir_create", component: DevoirCreate },
  { path: "/admin/devoirs/update/:id", name: "admin_devoir_update", component: DevoirCreate },
  { path: "/admin/devoirs/detail/:id", name: "admin_devoir_detail", component: DevoirDetail },
  //Entreprise
  { path: "/admin/entreprises", name:"admin_entreprise_list", component: EntrepriseList},
  { path: "/admin/entreprises/create", name:"admin_addEntreprise", component: AddEntreprise},
  { path: "/admin/entreprises/update/:id", name:"admin_entreprise_update", component: AddEntreprise},  
  { path: "/admin/entreprises/detail/:id", name:"admin_entreprise_detail", component: EntrepriseDetail},
  //Cursus
  { path: "/admin/cursus", name:"admin_cursus_list", component: CursusList},
  { path: "/admin/cursus/create", name:"admin_addCursus", component: AddCursus},
  { path: "/admin/cursus/update/:id", name:"admin_cursus_update", component: AddCursus},
  { path: "/admin/cursus/detail/:id", name:"admin_cursus_detail", component: CursusDetail},
  //Note
  { path: "/admin/notes", name:"admin_note_list", component: NoteList},
  { path: "/admin/notes/create/:id", name:"admin_note_create", component: NoteCreate},
  { path: "/admin/notes/update/:id", name:"admin_note_update", component: NoteCreate},
  { path: "/admin/notes/detail/:id", name:"admin_note_detail", component: NoteDetail},
  //PassageExamen
  { path: "/admin/passage-examen", name:"admin_passage-examen_list", component: PassageExamenList},
  { path: "/admin/passage-examen/create", name:"admin_passage-examen_create", component: PassageExamenCreate},
  { path: "/admin/passage-examen/update/:id", name:"admin_passage-examen_update", component: PassageExamenCreate},
  { path: "/admin/passage-examen/detail/:id", name:"admin_passage-examen_detail", component: PassageExamenDetail},
  //Projet
  { path: "/admin/projets", name:"admin_projet_list", component: ProjetList},
  { path: "/admin/projets/create", name:"admin_projet_create", component: ProjetCreate},
  { path: "/admin/projets/update/:id", name:"admin_projet_update", component: ProjetCreate},
  { path: "/admin/projets/detail/:id", name:"admin_projet_detail", component: ProjetDetail},
  //Groupe
  { path: "/admin/groupes", name:"admin_groupe_list", component: GroupeList},
  { path: "/admin/groupes/create", name:"admin_groupe_create", component: GroupeCreate},
  { path: "/admin/groupes/update/:id", name:"admin_groupe_update", component: GroupeCreate},
  { path: "/admin/groupes/detail/:id", name:"admin_groupe_detail", component: GroupeDetail},
   //Etudiant
   { path: "/admin/etudiants", name:"admin_etudiant_list", component: EtudiantList},
   { path: "/admin/etudiants/create", name:"admin_etudiant_create", component: EtudiantCreate},
   { path: "/admin/etudiants/update/:id", name:"admin_etudiant_update", component: EtudiantCreate},
   { path: "/admin/etudiants/detail/:id", name:"admin_etudiant_detail", component: EtudiantDetail},
   { path: "/admin/etudiants/fiche-salarie", name:"admin_etudiant_fiche_salarie", component: EtudiantFicheSalarie},
   { path: "/admin/etudiants/fiche-poste", name:"admin_etudiant_fiche_poste", component: EtudiantFichePoste},
   { path: "/admin/etudiants/fiche-entreprise", name:"admin_etudiant_fiche_entreprise", component: EtudiantFicheEntreprise},
   //Absence
   { path: "/admin/absences/create/:id", name:"admin_absence_create", component: AbsenceCreate},
   { path: "/admin/absences/update/:id", name:"admin_absence_update", component: AbsenceCreate},
   { path: "/admin/absences/detail/:id", name:"admin_absence_detail", component: AbsenceDetail},

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