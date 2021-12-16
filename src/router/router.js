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
//  - CEF


//          #######################
//          #       IMPORTS       #
//          #######################


//#######################
//#       GLOBAL        #
//#######################
import Home from "@/views/Home.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
import Forgot from "@/views/Login/Forgot.vue";
import NotFound from "@/views/NotFound.vue";

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
import ProfilUpdate from "@/views/Etudiant/EspaceAdministratif/ProfilUpdate.vue";
import DepotFichier from "@/views/Etudiant/EspaceAdministratif/DepotFichier.vue";
import DemandeConge from "@/views/Etudiant/EspaceAdministratif/DemandeConge.vue";
import FicheSalarie from "@/views/Etudiant/EspaceAdministratif/FicheSalarie.vue";
import FichePoste from "@/views/Etudiant/EspaceAdministratif/FichePoste.vue";
import FicheEntreprise from "@/views/Etudiant/EspaceAdministratif/FicheEntreprise.vue";
import Cerfa from "@/views/Etudiant/EspaceAdministratif/cerfa/cerfa.vue"
//Etudiant Pedagogique
// import Acceuil from "@/views/Etudiant/EspacePedagogique/Acceuil.vue";
import CursusDetails from "@/views/Etudiant/EspacePedagogique/CursusDetails.vue";
import Cursus from "@/views/Etudiant/EspacePedagogique/Cursus.vue";
import Absences from "@/views/Etudiant/EspacePedagogique/Absences.vue";
import Devoirs from "@/views/Etudiant/EspacePedagogique/Devoirs.vue";
import DossierProfessionel from "@/views/Etudiant/EspacePedagogique/DossierProfessionnel.vue";
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
import EtudiantDetail from "@/views/Admin/Crud/Etudiant/EtudiantDetail.vue";
import EtudiantFicheSalarie from "@/views/Admin/Crud/Etudiant/EtudiantFicheSalarie.vue";
import EtudiantFicheSalarieDetail from "@/views/Admin/Crud/Etudiant/EtudiantFicheSalarieDetail.vue";
import EtudiantFichePoste from "@/views/Admin/Crud/Etudiant/EtudiantFichePoste.vue";
import EtudiantFichePosteDetail from "@/views/Admin/Crud/Etudiant/EtudiantFichePosteDetail.vue";
import EtudiantFicheEntreprise from "@/views/Admin/Crud/Etudiant/EtudiantFicheEntreprise.vue";
import EtudiantFicheEntrepriseDetail from "@/views/Admin/Crud/Etudiant/EtudiantFicheEntrepriseDetail.vue";
import CerfaAdmin from "@/views/Admin/Crud/Etudiant/EtudiantCerfa.vue"
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
import AddEntrepriseAdresse from "@/views/Admin/Crud/Entreprise/EntrepriseAddAdresse.vue";
//Cursus
import CursusList from "@/views/Admin/Crud/Cursus/CursusList.vue";
import AddCursus from "@/views/Admin/Crud/Cursus/CursusCreate.vue";
import CursusDetail from "@/views/Admin/Crud/Cursus/CursusDetail.vue";
//CentreFormation
import CentreFormationList from "@/views/Admin/Crud/CentreDeFormation/CentreFormationList.vue";
import AddCentreFormation from "@/views/Admin/Crud/CentreDeFormation/CentreFormationCreate.vue";
import CentreFormationDetail from "@/views/Admin/Crud/CentreDeFormation/CentreFormationDetail.vue";


//#######################
//#       CEF           #
//#######################
//CentreFormation
import CentreFormation from "@/views/Cef/Crud/CentreFormation/CefCentreFormation.vue";
//Promo
import CefPromo from "@/views/Cef/Crud/Promo/CefPromo.vue";
//Intervention
import CefIntervention from "@/views/Cef/Crud/Intervention/CefIntervention.vue";
import CefCreateCours from "@/views/Cef/Crud/Intervention/CefCreateIntervention.vue";
//Etudiant
import CefEtudiant from "@/views/Cef/Crud/Etudiant/CefEtudiant.vue";
//Examen
import CefExamen from "@/views/Cef/Crud/Examen/CefExamen.vue";
//Devoir
import CefDevoir from "@/views/Cef/Crud/Devoir/CefDevoir.vue";





//          #######################
//          #       ROUTES        #
//          #######################


Vue.use(VueRouter);

const routes = [


  //#######################
  //#       GLOBAL        #
  //#######################

  { path: "/", redirect: { name: "home" }, },
  { path: "/home", name: "home", component: Home, },
  { path: "/login", name: "login", component: LoginPage, },
  { path: "/forgot-password", name: "forgot", component: Forgot, },
  { path: '*', component: NotFound },
  // { path: '/secure', name: 'secure', component: secure},


  //#######################
  //#       ETUDIANT      #
  //#######################

  //Administratif 
  { path: "/etudiant/espace-administratif", name: "etudiant_administratif", redirect: { name: 'etudiant_profil' }, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/profil", name: "etudiant_profil", component: Profil, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/profil/update/:id", name: "etudiant_profil_update", component: ProfilUpdate, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/documents-administratifs", name: "etudiant_documents_administratifs", component: DepotFichier, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/demande-conge", name: "etudiant_conge", component: DemandeConge, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-salarie", name: "fiche-salarie", component: FicheSalarie, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-poste", name: "fiche-poste", component: FichePoste, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/fiche-entreprise", name: "fiche-entreprise", component: FicheEntreprise, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-administratif/cerfa", name: "etudiant_cerfa", component: Cerfa, meta: { authorize: [Role.Etudiant] } },

  //Etudiant Pedagogique
  { path: "/etudiant/espace-pedagogique", name: "etudiant_espace-peda_accueil", redirect: { name: 'etudiant_espace-peda_cursus' }, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus", name: "etudiant_espace-peda_cursus", component: Cursus, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/absences", name: "etudiant_espace-peda_absences", component: Absences, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/devoirs", name: "etudiant_espace-peda_devoirs", component: Devoirs, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossier-professionnel", name: "etudiant_espace-peda_dossier-pro", component: DossierProfessionel, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/dossier-projet", name: "etudiant_espace-peda_dossier-projet", component: DossierProjet, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes", name: "etudiant_espace-peda_notes", component: Notes, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/notes/details/:id", name: "etudiant_espace-peda_notesdetails", component: NotesDetails, meta: { authorize: [Role.Etudiant] } },
  { path: "/etudiant/espace-pedagogique/cursus/detail/:id", name: "etudiant_espace-peda_cursusdetails", component: CursusDetails, meta: { authorize: [Role.Etudiant] } },

  //#######################
  //#       FORMATEUR     #
  //#######################

  { path: "/formateur", name: "formateur", redirect: { name: 'formateur_intervention' }, meta: { authorize: [Role.Formateur] } },
  //Intervention
  { path: "/formateur/interventions", name: "formateur_intervention", component: Intervention, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/interventions/detail/:id", name: "formateur_intervention_detail", component: DetailIntervention, meta: { authorize: [Role.Formateur] } },
  //Etudiant
  { path: "/formateur/etudiants/detail/:id", name: "formateur_etudiant_detail", component: EtudiantDetail, meta: { authorize: [Role.Formateur] } },
  //Promotion
  { path: "/formateur/promotions/detail/:id", name: "formateur_promotion_detail", component: PromotionDetail, meta: { authorize: [Role.Formateur] } },
  //Devoir  
  { path: "/formateur/devoirs/create/:id", name: "formateur_devoir_create", component: DevoirCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/devoirs/update/:id", name: "formateur_devoir_update", component: DevoirCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/devoirs/detail/:id", name: "formateur_devoir_detail", component: DevoirDetail, meta: { authorize: [Role.Formateur] } },
  //Absence  
  { path: "/formateur/absences/create", name: "formateur_absence_create", component: AbsenceCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/absences/update/:id", name: "formateur_absence_update", component: AbsenceCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/absences/detail/:id", name: "formateur_absence_detail", component: AbsenceDetail, meta: { authorize: [Role.Formateur] } },
  //Adresse
  { path: "/formateur/adresses/detail/:id", name: "formateur_adresse_detail", component: AdresseDetail, meta: { authorize: [Role.Formateur] } },
  //Examen
  { path: "/formateur/examens/create", name: "formateur_examen_create", component: ExamenCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/examens/update/:id", name: "formateur_examen_update", component: ExamenCreate, meta: { authorize: [Role.Formateur] } },
  { path: "/formateur/examens/detail/:id", name: "formateur_examen_detail", component: ExamenDetail, meta: { authorize: [Role.Formateur] } },

  //#######################
  //#       REFERENT      #
  //#######################

  { path: "/referent/", name: "referent_dashboard", redirect: { name: 'referent_promotions' }, meta: { authorize: [Role.Referent] } },
  //Divers  
  { path: "/referent/notes", name: "referent_notes", component: NotesR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/administratif", name: "referent_document-administratif", component: AskDocumentAdministratif, meta: { authorize: [Role.Referent] } },
  { path: "/referent/note-info/create", name: "NoteInfoR", component: NoteInfoR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/support-de-cours/create", name: "CreateSupportCoursR", component: CreateSupportCoursR, meta: { authorize: [Role.Referent] } },
  //Adresse
  { path: "/referent/adresses", name: "referent_adresse_list", component: AdresseList, meta: { authorize: [Role.Referent] } },
  { path: "/referent/adresses/create", name: "referent_adresse_create", component: AddAdresse, meta: { authorize: [Role.Referent] } },
  { path: "/referent/adresses/update/:id", name: "referent_adresse_update", component: AddAdresse, meta: { authorize: [Role.Referent] } },
  { path: "/referent/adresses/detail/:id", name: "referent_adresse_detail", component: AdresseDetail, meta: { authorize: [Role.Referent] } },
  //Groupe/Projet
  { path: "/referent/groupe-projet", name: "referent_groupe-projet", component: GroupeProjet, meta: { authorize: [Role.Referent] } },
  //Projet
  /*{ path: "/referent/projets", name: "referent_projets", component: Projets, meta: { authorize: [Role.Referent] }},
  { path: "/referent/projets/update", name: "referent_modifier-projet", component: ModifierProjet, meta: { authorize: [Role.Referent] }},
  { path: "/referent/projets/create", name: "referent_create-projet", component: CreateProjet, meta: { authorize: [Role.Referent] }},*/
  { path: "/referent/projets", name: "referent_projet_list", component: ProjetList, meta: { authorize: [Role.Referent] } },
  { path: "/referent/projets/create", name: "referent_projet_create", component: ProjetCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/projets/update/:id", name: "referent_projet_update", component: ProjetCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/projets/detail/:id", name: "referent_projet_detail", component: ProjetDetail, meta: { authorize: [Role.Referent] } },
  //Groupe
  /*{ path: "/referent/groupes", name: "referent-groupes", component: Groupes, meta: { authorize: [Role.Referent] }},
  { path: "/referent/groupes/create", name: "referent_create-groupe", component: CreateGroupe, meta: { authorize: [Role.Referent] }},
  { path: "/referent/groupes/update", name: "referent_modifier-groupe", component: ModifierGroupe, meta: { authorize: [Role.Referent] }},*/
  //Absence
  { path: "/referent/absence-retard", name: "referent_absence-retard", component: AbsenceRetard, meta: { authorize: [Role.Referent] } },
  { path: "/referent/absence-retard/create", name: "referent_create-absence-retard", component: CreateAbsenceRetard, meta: { authorize: [Role.Referent] } },
  //Intervention
  { path: "/referent/interventions", name: "referent_intervention_list", component: CoursR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/interventions/create", name: "referent_intervention_create", component: CreateCoursR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/interventions/update/:id", name: "referent_intervention_update", component: AjoutIntervention, meta: { authorize: [Role.Referent] } },
  { path: "/referent/interventions/detail/:id", name: "referent_intervention_detail", component: DetailIntervention, meta: { authorize: [Role.Referent] } },
  //Devoir
  { path: "/referent/devoirs", name: "DevoirsR", component: DevoirsR, meta: { authorize: [Role.Referent] } },
  //{ path: "/referent/devoirs/create", name: "CreateDevoirR", component: CreateDevoirR},
  //{ path: "/referent/devoirs/update", name: "ModifierDevoirR", component: ModifierDevoirR},
  { path: "/referent/devoirs/create", name: "referent_devoir_create", component: DevoirCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/devoirs/update/:id", name: "referent_devoir_update", component: DevoirCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/devoirs/detail/:id", name: "referent_devoir_detail", component: DevoirDetail, meta: { authorize: [Role.Referent] } },
  //Examen
  { path: "/referent/examens", name: "ExamenR", component: ExamenR, meta: { authorize: [Role.Referent] } },
  //{ path: "/referent/examens/create", name: "CreateExamenR", component: CreateExamenR},
  //{ path: "/referent/examens/update", name: "ModifierExamenR", component: ModifierExamenR},  
  { path: "/referent/examens/create", name: "referent_examen_create", component: ExamenCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/examens/update/:id", name: "referent_examen_update", component: ExamenCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/examens/detail/:id", name: "referent_examen_detail", component: ExamenDetail, meta: { authorize: [Role.Referent] } },
  //Promo
  { path: "/referent/promotions", name: "referent_promotions", component: ReferentDashboard, meta: { authorize: [Role.Referent] } },
  { path: "/referent/promotions/detail/:id", name: "referent_promotion_detail", component: PromotionDetail, meta: { authorize: [Role.Referent] } },
  { path: "/referent/promotions/update/:id", name: "referent_promotion_update", component: PromotionCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/promotions/create", name: "referent_promotion_create", component: PromotionCreate, meta: { authorize: [Role.Referent] } },
  //Groupe
  /*{ path: "/referent/groupes/detail/:id", name:"referent_groupe_detail", component: GroupeDetail, meta: { authorize: [Role.Referent] }},
  { path: "/referent/groupes/update/:id", name:"referent_groupe_update", component: GroupeCreate, meta: { authorize: [Role.Referent] }},*/
  { path: "/referent/groupes", name: "referent_groupe_list", component: GroupeList, meta: { authorize: [Role.Referent] } },
  { path: "/referent/groupes/create", name: "referent_groupe_create", component: GroupeCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/groupes/update/:id", name: "referent_groupe_update", component: GroupeCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/groupes/detail/:id", name: "referent_groupe_detail", component: GroupeDetail, meta: { authorize: [Role.Referent] } },
  //Note
  { path: "/referent/notes/detail/:id", name: "referent_note_detail", component: NoteDetail, meta: { authorize: [Role.Referent] } },
  { path: "/referent/notes/update/:id", name: "referent_note_update", component: NoteCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/notes/create/:id", name: "referent_note_create", component: NoteCreate, meta: { authorize: [Role.Referent] } },
  //Absence
  { path: "/referent/absences/detail/:id", name: "referent_absence_detail", component: AbsenceDetail, meta: { authorize: [Role.Referent] } },
  { path: "/referent/absences/create/:id", name: "referent_absence_create", component: AbsenceCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/absences/update/:id", name: "referent_absence_update", component: AbsenceCreate, meta: { authorize: [Role.Referent] } },
  //Conge
  { path: "/referent/conges/detail/:id", name: "referent_conge_detail", component: CongeDetail, meta: { authorize: [Role.Referent] } },
  { path: "/referent/conges/create/:id", name: "referent_conge_create", component: CongeCreate, meta: { authorize: [Role.Referent] } },
  { path: "/referent/conges/update/:id", name: "referent_conge_update", component: CongeCreate, meta: { authorize: [Role.Referent] } },
  //Etudiant
  { path: "/referent/etudiants", name: "referent_etudiant", component: EtudiantR, meta: { authorize: [Role.Referent] } },
  { path: "/referent/etudiants/detail/:id", name: "referent_etudiant_detail", component: EtudiantDetail, meta: { authorize: [Role.Referent] } },
  { path: "/referent/etudiants/fiche-salarie", name: "referent_etudiant_fiche_salarie", component: EtudiantFicheSalarie, meta: { authorize: [Role.Referent] } },
  { path: "/referent/etudiants/fiche-poste", name: "referent_etudiant_fiche_poste", component: EtudiantFichePoste, meta: { authorize: [Role.Referent] } },
  { path: "/referent/etudiants/fiche-entreprise", name: "referent_etudiant_fiche_entreprise", component: EtudiantFicheEntreprise, meta: { authorize: [Role.Referent] } },

  //#######################
  //#       ADMIN         #
  //#######################

  { path: "/admin/", name: "admin_dashboard", redirect: { name: 'admin_utilisateur' }, meta: { authorize: [Role.Admin] } },
  //Utilisateur
  { path: "/admin/utilisateurs", name: "admin_utilisateur", component: AdminDashboard, meta: { authorize: [Role.Admin] } },
  { path: "/admin/utilisateurs/create", name: "admin_addUser", component: AddUser, meta: { authorize: [Role.Admin] } },
  { path: "/admin/utilisateurs/update/:id", name: "admin_user_update", component: AddUser, meta: { authorize: [Role.Admin] } },
  { path: "/admin/utilisateurs/detail/:id", name: "admin_user_detail", component: DetailUser, meta: { authorize: [Role.Admin] } },
  // Intervention
  { path: "/admin/interventions", name: "admin_intervention_list", component: AllInterventions, meta: { authorize: [Role.Admin] } },
  { path: "/admin/interventions/create", name: "admin_intervention_create", component: AjoutIntervention, meta: { authorize: [Role.Admin] } },
  { path: "/admin/interventions/update/:id", name: "admin_intervention_update", component: AjoutIntervention, meta: { authorize: [Role.Admin] } },
  { path: "/admin/interventions/detail/:id", name: "admin_intervention_detail", component: DetailIntervention, meta: { authorize: [Role.Admin] } },
  // Formation
  { path: "/admin/formations", name: "admin_formation_list", component: AllFormations, meta: { authorize: [Role.Admin] } },
  { path: "/admin/formations/create", name: "admin_formation_create", component: AjoutFormation, meta: { authorize: [Role.Admin] } },
  { path: "/admin/formations/update/:id", name: "admin_formation_update", component: AjoutFormation, meta: { authorize: [Role.Admin] } },
  { path: "/admin/formations/detail/:id", name: "admin_formation_detail", component: DetailFormation, meta: { authorize: [Role.Admin] } },
  //Promotion
  { path: "/admin/promotions", name: "admin_promotion_list", component: PromotionList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/promotions/create", name: "admin_promotion_create", component: PromotionCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/promotions/update/:id", name: "admin_promotion_update", component: PromotionCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/promotions/detail/:id", name: "admin_promotion_detail", component: PromotionDetail, meta: { authorize: [Role.Admin] } },
  //Adresse
  { path: "/admin/adresses", name: "admin_adresse_list", component: AdresseList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/adresses/create", name: "admin_addAdresse", component: AddAdresse, meta: { authorize: [Role.Admin] } },
  { path: "/admin/adresses/update/:id", name: "admin_adresse_update", component: AddAdresse, meta: { authorize: [Role.Admin] } },
  { path: "/admin/adresses/detail/:id", name: "admin_adresse_detail", component: AdresseDetail, meta: { authorize: [Role.Admin] } },
  //Conge
  { path: "/admin/conges", name: "admin_conge_list", component: CongeList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/conges/create/:id", name: "admin_conge_create", component: CongeCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/conges/update/:id", name: "admin_conge_update", component: CongeCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/conges/detail/:id", name: "admin_conge_detail", component: CongeDetail, meta: { authorize: [Role.Admin] } },
  //Examen
  { path: "/admin/examens", name: "admin_examen_list", component: ExamenList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/examens/create", name: "admin_examen_create", component: ExamenCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/examens/update/:id", name: "admin_examen_update", component: ExamenCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/examens/detail/:id", name: "admin_examen_detail", component: ExamenDetail, meta: { authorize: [Role.Admin] } },
  //Devoir
  { path: "/admin/devoirs", name: "admin_devoir_list", component: DevoirList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/devoirs/create", name: "admin_devoir_create", component: DevoirCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/devoirs/update/:id", name: "admin_devoir_update", component: DevoirCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/devoirs/detail/:id", name: "admin_devoir_detail", component: DevoirDetail, meta: { authorize: [Role.Admin] } },
  //Entreprise
  { path: "/admin/entreprises", name: "admin_entreprise_list", component: EntrepriseList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/entreprises/create", name: "admin_addEntreprise", component: AddEntreprise, meta: { authorize: [Role.Admin] } },
  { path: "/admin/entreprises/createAdresse", name: "admin_addEntreprise_adresse", component: AddEntrepriseAdresse, meta: { authorize: [Role.Admin] } },
  { path: "/admin/entreprises/update/:id", name: "admin_entreprise_update", component: AddEntreprise, meta: { authorize: [Role.Admin] } },
  { path: "/admin/entreprises/detail/:id", name: "admin_entreprise_detail", component: EntrepriseDetail, meta: { authorize: [Role.Admin] } },
  //Cursus
  { path: "/admin/cursus", name: "admin_cursus_list", component: CursusList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/cursus/create", name: "admin_cursus_create", component: AddCursus, meta: { authorize: [Role.Admin] } },
  { path: "/admin/cursus/update/:id", name: "admin_cursus_update", component: AddCursus, meta: { authorize: [Role.Admin] } },
  { path: "/admin/cursus/detail/:id", name: "admin_cursus_detail", component: CursusDetail, meta: { authorize: [Role.Admin] } },
  //Note
  { path: "/admin/notes", name: "admin_note_list", component: NoteList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/notes/create/:id", name: "admin_note_create", component: NoteCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/notes/update/:id", name: "admin_note_update", component: NoteCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/notes/detail/:id", name: "admin_note_detail", component: NoteDetail, meta: { authorize: [Role.Admin] } },
  //PassageExamen
  { path: "/admin/passage-examen", name: "admin_passage-examen_list", component: PassageExamenList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/passage-examen/create", name: "admin_passage-examen_create", component: PassageExamenCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/passage-examen/update/:id", name: "admin_passage-examen_update", component: PassageExamenCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/passage-examen/detail/:id", name: "admin_passage-examen_detail", component: PassageExamenDetail, meta: { authorize: [Role.Admin] } },
  //Projet
  { path: "/admin/projets", name: "admin_projet_list", component: ProjetList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/projets/create", name: "admin_projet_create", component: ProjetCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/projets/update/:id", name: "admin_projet_update", component: ProjetCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/projets/detail/:id", name: "admin_projet_detail", component: ProjetDetail, meta: { authorize: [Role.Admin] } },
  //Groupe
  { path: "/admin/groupes", name: "admin_groupe_list", component: GroupeList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/groupes/create", name: "admin_groupe_create", component: GroupeCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/groupes/update/:id", name: "admin_groupe_update", component: GroupeCreate, meta: { authorize: [Role.Admin] } },
  { path: "/admin/groupes/detail/:id", name: "admin_groupe_detail", component: GroupeDetail, meta: { authorize: [Role.Admin] } },
  //Centre Formation
  { path: "/admin/centreFormations", name: "admin_centreFormation_list", component: CentreFormationList, meta: { authorize: [Role.Admin] } },
  { path: "/admin/centreFormations/create", name: "admin_centreFormation_create", component: AddCentreFormation, meta: { authorize: [Role.Admin] } },
  { path: "/admin/centreFormations/update/:id", name: "admin_centreFormation_update", component: AddCentreFormation, meta: { authorize: [Role.Admin] } },
  { path: "/admin/centreFormations/detail/:id", name: "admin_centreFormation_detail", component: CentreFormationDetail, meta: { authorize: [Role.Admin] } },
   //Etudiant
   { path: "/admin/etudiants/fiche-salarie/detail/:id", name:"admin_etudiant_fiche_salarie_detail", component: EtudiantFicheSalarieDetail, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-poste/update/:id", name:"admin_etudiant_fiche_poste_update", component: EtudiantFichePoste, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-entreprise/update/:id", name:"admin_etudiant_fiche_entreprise_update", component: EtudiantFicheEntreprise, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-poste/detail/:id", name:"admin_etudiant_fiche_poste_detail", component: EtudiantFichePosteDetail, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-entreprise/detail/:id", name:"admin_etudiant_fiche_entreprise_detail", component: EtudiantFicheEntrepriseDetail, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants", name:"admin_etudiant_list", component: EtudiantList, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/detail/:id", name:"admin_etudiant_detail", component: EtudiantDetail, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-salarie", name:"admin_etudiant_fiche_salarie", component: EtudiantFicheSalarie, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-poste", name:"admin_etudiant_fiche_poste", component: EtudiantFichePoste, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/fiche-entreprise", name:"admin_etudiant_fiche_entreprise", component: EtudiantFicheEntreprise, meta: { authorize: [Role.Admin] }},
   { path: "/admin/etudiants/:id/cerfa", name:"admin_etudiant_cerfa", component: CerfaAdmin, meta: { authorize: [Role.Admin] }},
   //Absence
   { path: "/admin/absences/create", name:"admin_absence_create", component: AbsenceCreate, meta: { authorize: [Role.Admin] }},
   { path: "/admin/absences/update/:id", name:"admin_absence_update", component: AbsenceCreate, meta: { authorize: [Role.Admin] }},
   { path: "/admin/absences/detail/:id", name:"admin_absence_detail", component: AbsenceDetail, meta: { authorize: [Role.Admin] }},

   //#######################
   //#       CEF           #
   //#######################

   { path: "/cef/", name: "cef_dashboard", redirect: {name: 'cef_centreFormation_list'}, meta: { authorize: [Role.CEF] }},
   //Centre Formation
  { path: "/cef/centreFormations", name: "cef_centreFormation_list", component: CentreFormation, meta: { authorize: [Role.CEF] }},
  { path: "/cef/centreFormations/create", name:"cef_centreFormation_create", component: AddCentreFormation, meta: { authorize: [Role.CEF] }},
  { path: "/cef/centreFormations/update/:id", name:"cef_centreFormation_update", component: AddCentreFormation, meta: { authorize: [Role.CEF] }},
  { path: "/cef/centreFormations/detail/:id", name: "cef_centreFormation_detail", component: CentreFormationDetail, meta: { authorize: [Role.CEF] } },
  //Promo
  { path: "/cef/promotions", name: "cef_promotions", component: CefPromo, meta: { authorize: [Role.CEF] } },
  { path: "/cef/promotions/detail/:id", name: "cef-promotion-detail", component: PromotionDetail, meta: { authorize: [Role.CEF] } },
  { path: "/cef/promotions/update/:id", name: "cef_promotion_update", component: PromotionCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/promotions/create", name: "cef_promotion_create", component: PromotionCreate, meta: { authorize: [Role.CEF] } },

  //Etudiant
  { path: "/cef/etudiants", name: "cef_etudiant", component: CefEtudiant, meta: { authorize: [Role.CEF] } },
  { path: "/cef/etudiants/detail/:id", name: "cef_etudiant_detail", component: EtudiantDetail, meta: { authorize: [Role.CEF] } },
  { path: "/cef/etudiants/fiche-salarie", name: "cef_etudiant_fiche_salarie", component: EtudiantFicheSalarie, meta: { authorize: [Role.CEF] } },
  { path: "/cef/etudiants/fiche-poste", name: "cef_etudiant_fiche_poste", component: EtudiantFichePoste, meta: { authorize: [Role.CEF] } },
  { path: "/cef/etudiants/fiche-entreprise", name: "cef_etudiant_fiche_entreprise", component: EtudiantFicheEntreprise, meta: { authorize: [Role.CEF] } },

  //Intervention
  { path: "/cef/interventions", name: "cef_cours", component: CefIntervention, meta: { authorize: [Role.CEF] } },
  { path: "/cef/interventions/:id", name: "cef-intervention-detail", component: DetailIntervention, meta: { authorize: [Role.CEF] } },
  { path: "/cef/interventions/create", name: "cef_intervention_create", component: CefCreateCours, meta: { authorize: [Role.CEF] } },
  { path: "/cef/interventions/update/:id", name: "cef_modifier_intervention", component: AjoutIntervention, meta: { authorize: [Role.CEF] } },

  //Cursus
  { path: "/cef/cursus", name: "cef_cursus_list", component: CursusList, meta: { authorize: [Role.CEF] } },
  { path: "/cef/cursus/create", name: "cef_addCursus", component: AddCursus, meta: { authorize: [Role.CEF] } },
  { path: "/cef/cursus/update/:id", name: "cef_cursus_update", component: AddCursus, meta: { authorize: [Role.CEF] } },
  { path: "/cef/cursus/detail/:id", name: "cef_cursus_detail", component: CursusDetail, meta: { authorize: [Role.CEF] } },

  //Note
  { path: "/cef/notes/detail/:id", name: "cef_note_detail", component: NoteDetail, meta: { authorize: [Role.CEF] } },
  { path: "/cef/notes/update/:id", name: "cef_note_update", component: NoteCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/notes/create/:id", name: "cef_note_create", component: NoteCreate, meta: { authorize: [Role.CEF] } },
  //Absence
  { path: "/cef/absences/detail/:id", name: "cef_absence_detail", component: AbsenceDetail, meta: { authorize: [Role.CEF] } },
  { path: "/cef/absences/create/:id", name: "cef_absence_create", component: AbsenceCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/absences/update/:id", name: "cef_absence_update", component: AbsenceCreate, meta: { authorize: [Role.CEF] } },
  //Conge
  { path: "/cef/conges/detail/:id", name: "cef_conge_detail", component: CongeDetail, meta: { authorize: [Role.CEF] } },
  { path: "/cef/conges/create/:id", name: "cef_conge_create", component: CongeCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/conges/update/:id", name: "cef_conge_update", component: CongeCreate, meta: { authorize: [Role.CEF] } },
  //Groupe
  { path: "/cef/groupes", name: "cef_groupe_list", component: GroupeList, meta: { authorize: [Role.CEF] } },
  { path: "/cef/groupes/create", name: "cef_groupe_create", component: GroupeCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/groupes/update/:id", name: "cef_groupe_update", component: GroupeCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/groupes/detail/:id", name: "cef_groupe_detail", component: GroupeDetail, meta: { authorize: [Role.CEF] } },
  //Projet
  { path: "/cef/projets", name: "cef_projet_list", component: ProjetList, meta: { authorize: [Role.CEF] } },
  { path: "/cef/projets/create", name: "cef_projet_create", component: ProjetCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/projets/update/:id", name: "cef_projet_update", component: ProjetCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/projets/detail/:id", name: "cef_projet_detail", component: ProjetDetail, meta: { authorize: [Role.CEF] } },
  //Devoir
  { path: "/cef/devoirs", name: "cef_devoir", component: CefDevoir, meta: { authorize: [Role.CEF] } },
  { path: "/cef/devoirs/create", name: "cef_devoir_create", component: DevoirCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/devoirs/update/:id", name: "cef_devoir_update", component: DevoirCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/devoirs/detail/:id", name: "cef_devoir_detail", component: DevoirDetail, meta: { authorize: [Role.CEF] } },
  //Examen
  { path: "/cef/examens", name: "cef_examen", component: CefExamen, meta: { authorize: [Role.CEF] } },
  { path: "/cef/examens/create", name: "cef_examen_create", component: ExamenCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/examens/update/:id", name: "cef_examen_update", component: ExamenCreate, meta: { authorize: [Role.CEF] } },
  { path: "/cef/examens/detail/:id", name: "cef_examen_detail", component: ExamenDetail, meta: { authorize: [Role.CEF] } },
  //Administratif
  { path: "/cef/administratif", name: "cef_document_administratif", component: AskDocumentAdministratif, meta: { authorize: [Role.CEF] } },

];

const router = new VueRouter({
  //mode: "history",
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
