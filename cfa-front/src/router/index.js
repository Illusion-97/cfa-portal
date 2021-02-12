import Vue from 'vue'
import VueRouter from 'vue-router'
import EspaceAdministratif from '@/components/Etudiant/EspaceAdministratif/EspaceAdministratif.vue'
import DepotFichier from '@/components/Etudiant/EspaceAdministratif/DepotFichier.vue'
import DemandeConge from '@/components/Etudiant/EspaceAdministratif/DemandeConge.vue'
import CourseDashboard from '@/components/Formateur/Cours/CourseDashboard.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/Etudiant/EspaceAdministratif', name: 'EspaceAdministratif', component: EspaceAdministratif},
  { path: '/Etudiant/EspaceAdministratif/DepotFichier', name: 'DepotFichier', component: DepotFichier},
  { path: '/Etudiant/EspaceAdministratif/DemandeConge', name: 'DemandeConge', component: DemandeConge},
  { path: '/formateur/cours', name: 'DashboardCours', component: CourseDashboard},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
