<template>
  <div class="container-fluid">
    <router-link
      :to="{ name: 'admin_dashboard' }"
      class="h5"
      style="cursor:pointer; color:black;text-decoration:none;"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" class="icon" />
      Precedent
    </router-link>

    <BodyTitle :title="vue_title" />

    <form @submit="submit">
      <!-- Civilite -->
      <div class="form-group">
        <div class="row">
          <label class="civilite">Civilité : </label>
          <div class="form-check col-1">
            <input
              class="form-check-input"
              type="radio"
              name="gridRadios"
              id="monsieur"
              value="M"
              checked
              v-model="form.civilite"
              autocomplete="honorific-prefix"
            />
            <label class="form-check-label" for="monsieur">
              Monsieur
            </label>
          </div>
          <div class="form-check col-1">
            <input
              class="form-check-input"
              type="radio"
              name="gridRadios"
              id="madame"
              value="Mme"
              v-model="form.civilite"
              autocomplete="honorific-prefix"
            />
            <label class="form-check-label" for="madame">
              Madame
            </label>
          </div>
          <div class="form-check col-1">
            <input
              class="form-check-input"
              type="radio"
              name="gridRadios"
              id="mademoiselle"
              value="Mlle"
              v-model="form.civilite"
              autocomplete="honorific-prefix"
            />
            <label class="form-check-label" for="mademoiselle">
              Mademoiselle
            </label>
          </div>
        </div>
      </div>

      <!-- Nom / Prenom -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-6">
          <label for="nom">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            class="form-control"
            placeholder="Michel"
            v-model="form.nom"
            autocomplete="family-name"
          />
        </div>
        <div class="form-group col-6">
          <label for="nom">Prénom</label>
          <input
            type="text"
            name="prenom"
            class="form-control"
            placeholder="Jean"
            v-model="form.prenom"
            autocomplete="given-name"
          />
        </div>
      </div>
      <!-- Date de naissance / Telephone -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-6">
          <label for="nom">Date de naissance</label>
          <input
            type="text"
            name="birthdate"
            id="birth"
            class="form-control"
            placeholder="jj/mm/aaaa"
            v-model="form.dateDeNaissance"
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
            autocomplete="bday"
          />
        </div>
        <div class="form-group col-6">
          <label for="nom">Telephone</label>
          <input
            type="tel"
            name="phone"
            class="form-control"
            placeholder="0000000000"
            v-model="form.telephone"
            pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
            maxlength="10"
            autocomplete="tel"
          />
        </div>
      </div>
      <!-- Email -->
      <div class="d-flex justify-content-center">
        <div class="form-group col-12">
          <label for="nom">Email</label>
          <input
            type="email"
            name="email"
            id="login"
            class="form-control"
            placeholder="jmichel@dawan.fr"
            v-model="form.login"
            autocomplete="email"
          />
        </div>
      </div>

      <!-- Roles -->
      <div class="d-flex">
        <div class="form-group col-6">
          <label for="">Roles : </label>
          <a class="" @click="showModal()" href="#"> Ajouter un role</a>
          <div class="mon-group d-flex" v-if="rolesComputed" id="role">
            <div
              class="alert alert-secondary mr-2 py-1 px-2"
              role="alert"
              v-for="(role, index) in rolesComputed"
              :key="role.id"
            >
              {{ role.intitule }}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span class="close" @click="removeFromlist(index)"
                  >&times;</span
                >
              </button>
            </div>
          </div>
        </div>
        <!-- Adresse -->
        <div class="form-group col-6">
          <label for="">Adresse</label>
          <div class="d-flex justify-content-between">
            <input
              type="number"
              name="num"
              class="form-control col-1"
              placeholder="N°"
              v-model="form.adresseDto.numero"
            />
            <input
              type="text"
              name="rue"
              class="form-control col-4"
              placeholder="rue"
              v-model="form.adresseDto.rue"
            />
            <input
              type="text"
              name="ville"
              class="form-control col-3"
              placeholder="ville"
              v-model="form.adresseDto.ville"
            />
            <input
              type="text"
              name="zipcode"
              class="form-control col-3"
              maxlength="5"
              placeholder="code postale"
              v-model="form.adresseDto.codePostal"
            />
          </div>
        </div>
      </div>

      <!-- Entreprise -->
      <div v-if="hasEntreprise()">
        <p>
          Entreprise :
          <a
            :class="{
              'btn col-1': true,
              'btn-primary': IsEntrepriseNouvelle,
              'btn-success': !IsEntrepriseNouvelle,
            }"
            @click="changeIsEntrepriseNouvelle(1)"
            >Nouvelle</a
          >
          <a
            :class="{
              'btn col-1': true,
              'btn-primary': !IsEntrepriseNouvelle,
              'btn-success': IsEntrepriseNouvelle,
            }"
            @click="changeIsEntrepriseNouvelle(0)"
            >Existante</a
          >
        </p>

        <div v-if="!IsEntrepriseNouvelle">
          <!-- raisonSociale -->
          <div class="d-flex justify-content-center">
            <div class="form-group col-4">
              <label for="nom">Raison Sociale</label>
              <input
                type="text"
                name="nom"
                id="nom"
                class="form-control"
                v-model="entrepriseUtilisateur.raisonSociale"
                autocomplete="family-name"
              />
            </div>
            <div class="form-group col-4">
              <label for="nom">Siret</label>
              <input
                type="text"
                name="prenom"
                class="form-control"
                v-model="entrepriseUtilisateur.siret"
                autocomplete="given-name"
              />
            </div>
            <div class="form-group col-4">
              <label for="nom">NAF</label>
              <input
                type="text"
                name="prenom"
                class="form-control"
                v-model="entrepriseUtilisateur.naf"
                autocomplete="given-name"
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="form-group col-6">
              <label for="nom">Effectif total</label>
              <input
                type="text"
                name="nom"
                id="nom"
                class="form-control"
                v-model="entrepriseUtilisateur.effectifTotal"
                autocomplete="family-name"
              />
            </div>
            <div class="form-group col-6">
              <label for="nom">Type Employeur</label>
              <input
                type="text"
                name="prenom"
                class="form-control"
                v-model="entrepriseUtilisateur.employeurType"
                autocomplete="given-name"
              />
            </div>
          </div>
          <!-- Adresse Entreprise-->
          <p>Adresse de l'entreprise :</p>
          <div class="form-group col-6">
            <div class="d-flex justify-content-between">
              <input
                type="number"
                name="num"
                class="form-control col-1"
                placeholder="N°"
                v-model="entrepriseUtilisateur.adresseSiegeDto.numero"
              />
              <input
                type="text"
                name="rue"
                class="form-control col-4"
                placeholder="rue"
                v-model="entrepriseUtilisateur.adresseSiegeDto.rue"
              />
              <input
                type="text"
                name="ville"
                class="form-control col-3"
                placeholder="ville"
                v-model="entrepriseUtilisateur.adresseSiegeDto.ville"
              />
              <input
                type="text"
                name="zipcode"
                class="form-control col-3"
                maxlength="5"
                placeholder="code postale"
                v-model="entrepriseUtilisateur.adresseSiegeDto.codePostal"
              />
            </div>
          </div>
        </div>

          <EntrepriseListComponent v-if="IsEntrepriseNouvelle" v-on:click-list="clickListEntrepriseUtilisateur"/>
      </div>

      <!-- Contrat -->
      <div class="d-flex justify-content-center" v-if="isEtudiant()">
        <div class="form-group col-12">
          <label>Contrat : </label>
          <!-- Dates -->
          <div class="col-3">
            <label>Date de début :</label>
            <b-form-datepicker
              locale="fr"
              v-model="contrat.dateDebut"
              :required="true"
            ></b-form-datepicker>
          </div>
          <div class="col-3">
            <label>Date de fin :</label>
            <b-form-datepicker
              locale="fr"
              v-model="contrat.dateFin"
              :required="true"
            ></b-form-datepicker>
          </div>

          <!-- Maitre apprentissage -->
          <p>
            Maitre d'apprentissage :
            <!-- Du ternaire serait plus jolie ? -->
            <a
              :class="{
                'btn col-1': true,
                'btn-primary': isMaitreApprentissageDawan,
                'btn-success': !isMaitreApprentissageDawan,
              }"
              @click="changeIsMaitreApprentissageDawan(1)"
              >Nouveau</a
            >
            <a
              :class="{
                'btn col-1': true,
                'btn-primary': !isMaitreApprentissageDawan,
                'btn-success': isMaitreApprentissageDawan,
              }"
              @click="changeIsMaitreApprentissageDawan(0)"
              >Existant</a
            >
          </p>
          <div v-if="!isMaitreApprentissageDawan">
            <!-- Civilite -->
            <div class="form-group">
              <div class="row">
                <label class="civilite">Civilité : </label>
                <div class="form-check col-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="monsieur"
                    value="M"
                    checked
                    v-model="maitreApprentissage.civilite"
                    autocomplete="honorific-prefix"
                  />
                  <label class="form-check-label" for="monsieur">
                    Monsieur
                  </label>
                </div>
                <div class="form-check col-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="madame"
                    value="Mme"
                    v-model="maitreApprentissage.civilite"
                    autocomplete="honorific-prefix"
                  />
                  <label class="form-check-label" for="madame">
                    Madame
                  </label>
                </div>
                <div class="form-check col-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="mademoiselle"
                    value="Mlle"
                    v-model="maitreApprentissage.civilite"
                    autocomplete="honorific-prefix"
                  />
                  <label class="form-check-label" for="mademoiselle">
                    Mademoiselle
                  </label>
                </div>
              </div>
            </div>

            <!-- Nom / Prenom -->
            <div class="d-flex justify-content-center">
              <div class="form-group col-6">
                <label for="nom">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  class="form-control"
                  placeholder="Michel"
                  v-model="maitreApprentissage.nom"
                  autocomplete="family-name"
                />
              </div>
              <div class="form-group col-6">
                <label for="nom">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  class="form-control"
                  placeholder="Jean"
                  v-model="maitreApprentissage.prenom"
                  autocomplete="given-name"
                />
              </div>
            </div>
            <!-- Date de naissance / Telephone -->
            <div class="d-flex justify-content-center">
              <div class="form-group col-6">
                <label for="nom">Date de naissance</label>
                <input
                  type="text"
                  name="birthdate"
                  id="birth"
                  class="form-control"
                  placeholder="jj/mm/aaaa"
                  v-model="maitreApprentissage.dateDeNaissance"
                  pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                  autocomplete="bday"
                />
              </div>
              <div class="form-group col-6">
                <label for="nom">Telephone</label>
                <input
                  type="tel"
                  name="phone"
                  class="form-control"
                  placeholder="0000000000"
                  v-model="maitreApprentissage.telephone"
                  pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
                  maxlength="10"
                  autocomplete="tel"
                />
              </div>
            </div>
            <!-- Email -->
            <div class="d-flex justify-content-center">
              <div class="form-group col-12">
                <label for="nom">Email</label>
                <input
                  type="email"
                  name="email"
                  id="login"
                  class="form-control"
                  placeholder="jmichel@dawan.fr"
                  v-model="maitreApprentissage.login"
                  autocomplete="email"
                />
              </div>
            </div>

            <p>Entreprise :</p>
            <!-- Entreprise -->
              <p>
                Entreprise :
                <a
                  :class="{
                    'btn col-1': true,
                    'btn-primary': IsEntrepriseNouvelle,
                    'btn-success': !IsEntrepriseNouvelle,
                  }"
                  @click="changeIsEntrepriseMaitreNouvelle(1)"
                  >Nouvelle</a
                >
                <a
                  :class="{
                    'btn col-1': true,
                    'btn-primary': !IsEntrepriseNouvelle,
                    'btn-success': IsEntrepriseNouvelle,
                  }"
                  @click="changeIsEntrepriseMaitreNouvelle(0)"
                  >Existante</a
                >
              </p>

              <div v-if="!IsEntrepriseMaitreNouvelle">
                <!-- raisonSociale -->
                <div class="d-flex justify-content-center">
                  <div class="form-group col-4">
                    <label for="nom">Raison Sociale</label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      class="form-control"
                      v-model="entrepriseUtilisateur.raisonSociale"
                      autocomplete="family-name"
                    />
                  </div>
                  <div class="form-group col-4">
                    <label for="nom">Siret</label>
                    <input
                      type="text"
                      name="prenom"
                      class="form-control"
                      v-model="entrepriseUtilisateur.siret"
                      autocomplete="given-name"
                    />
                  </div>
                  <div class="form-group col-4">
                    <label for="nom">NAF</label>
                    <input
                      type="text"
                      name="prenom"
                      class="form-control"
                      v-model="entrepriseUtilisateur.naf"
                      autocomplete="given-name"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <div class="form-group col-6">
                    <label for="nom">Effectif total</label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      class="form-control"
                      v-model="entrepriseUtilisateur.effectifTotal"
                      autocomplete="family-name"
                    />
                  </div>
                  <div class="form-group col-6">
                    <label for="nom">Type Employeur</label>
                    <input
                      type="text"
                      name="prenom"
                      class="form-control"
                      v-model="entrepriseUtilisateur.employeurType"
                      autocomplete="given-name"
                    />
                  </div>
                </div>
                <!-- Adresse Entreprise-->
                <p>Adresse de l'entreprise :</p>
                <div class="form-group col-6">
                  <div class="d-flex justify-content-between">
                    <input
                      type="number"
                      name="num"
                      class="form-control col-1"
                      placeholder="N°"
                      v-model="entrepriseUtilisateur.adresseSiegeDto.numero"
                    />
                    <input
                      type="text"
                      name="rue"
                      class="form-control col-4"
                      placeholder="rue"
                      v-model="entrepriseUtilisateur.adresseSiegeDto.rue"
                    />
                    <input
                      type="text"
                      name="ville"
                      class="form-control col-3"
                      placeholder="ville"
                      v-model="entrepriseUtilisateur.adresseSiegeDto.ville"
                    />
                    <input
                      type="text"
                      name="zipcode"
                      class="form-control col-3"
                      maxlength="5"
                      placeholder="code postale"
                      v-model="entrepriseUtilisateur.adresseSiegeDto.codePostal"
                    />
                  </div>
                </div>
              </div>

                <EntrepriseListComponent v-if="IsEntrepriseMaitreNouvelle" v-on:click-list="clickListEntrepriseMaitre"/>
          </div>
          <!-- END !isMaitreApprentissageDawan-->

          <!-- START isMaitreApprentissageDawan-->
          <div v-if="isMaitreApprentissageDawan">
            <UserListComponent v-on:click-list="clickListMaitreApprentissage"/>
          </div>
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Envoyer"
          class="btn btn-outline-success float-right"
        />
      </div>
    </form>

    <RoleModal
      v-show="isModalVisible"
      @close="closeModal"
      :rolesProp="rolesComputed"
      v-on:close="onClickClose"
    />
  </div>
</template>

<script>
import moment from "moment-timezone";
import { utilisateurApi } from "@/_api/utilisateur.api.js";
import { contratApi } from "@/_api/contrat.api.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
// import AdresseListComponent from "@/components/List/AdresseListComponent.vue";
import EntrepriseListComponent from "@/components/List/EntrepriseListComponent.vue";
import RoleModal from "@/components/Modal/RoleModal.vue";
import UserListComponent from "@/components/List/UserListComponent.vue";

export default {
  name: "AddUser",
  components: {
    BodyTitle,
    // AdresseListComponent,
    EntrepriseListComponent,
    RoleModal,
    UserListComponent,
  },
  data() {
    return {
      btn_form_text: "Ajouter",
      vue_title: "Nouvel utilisateur",

      form: {
        id: null,
        prenom: "",
        nom: "",
        civilite: "",
        dateDeNaissance: "",
        telephone: "",
        login: "",
        password: "",
        rolesDto: [],
        adresseDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        etudiantDto: null,
        formateurDto: null,
        cefDto: null,
        maitreApprentissageDto: null,
      },

      maitreApprentissage: {
        id: null,
        prenom: "",
        nom: "",
        civilite: "",
        dateDeNaissance: "",
        telephone: "",
        login: "",
        password: "",
        rolesDto: [
          {
            id: null,
            intitule: "",
            utilisateursDto: null,
          },
        ],
        adresseDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
        etudiantDto: null,
        formateurDto: null,
        cefDto: null,
        maitreApprentissageDto: null,
      },

      contrat: {
        dateDebut: "",
        dateFin: "",
        etudiantDto: null,
        maitreApprentissageDto: null,
      },

      entrepriseMaitreApprentissage: {
        id: null,
        raisonSociale: "",
        siret: "",
        naf: "",
        effectifTotal: "",
        employeurType: "",
        adresseSiegeDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
      },

      entrepriseUtilisateur: {
        id: null,
        raisonSociale: "",
        siret: "",
        naf: "",
        effectifTotal: "",
        employeurType: "",
        adresseSiegeDto: {
          id: null,
          numero: "",
          rue: "",
          ville: "",
          codePostal: "",
        },
      },

      isModalVisible: false,

      isMaitreApprentissageDawan: false,
      IsEntrepriseNouvelle: false,
      IsEntrepriseMaitreNouvelle: false,

      btn_adresse: "Existante",
      btn_entreprise: "Existante",
    };
  },
  computed: {
    rolesComputed() {
      return this.form.rolesDto;
    },
    adresse_input() {
      return this.adresse;
    },
    entrepriseUtilisateurComputed() {
      return this.entrepriseUtilisateur;
    },
    maitreApprentissageComputed(){
      return this.maitreApprentissage;
    }
  },
  methods: {
    isEtudiant(){
      for(let i=0; i<this.form.rolesDto.length; i++)
        if(this.form.rolesDto[i].intitule == "ETUDIANT") return true;

      return false;
    },
    changeIsMaitreApprentissageDawan(index) {
      if (index == 0) this.isMaitreApprentissageDawan = true;
      else this.isMaitreApprentissageDawan = false;
    },
    changeIsEntrepriseNouvelle(index) {
      if (index == 0) this.IsEntrepriseNouvelle = true;
      else this.IsEntrepriseNouvelle = false;
    },
    changeIsEntrepriseMaitreNouvelle(index) {
      if (index == 0) this.IsEntrepriseMaitreNouvelle = true;
      else this.IsEntrepriseMaitreNouvelle = false;
    },
    hasEntreprise(){
      for(let i=0; i<this.form.rolesDto.length; i++){
        if(this.form.rolesDto[i].intitule != "ETUDIANT" && this.form.rolesDto[i].intitule != "ADMIN") return true;
      }
      return false;
    },
    clickListEntrepriseUtilisateur(entreprise) {
      this.entrepriseUtilisateur = entreprise;
    },
    clickListEntrepriseMaitre(entreprise){
      this.entrepriseMaitreApprentissage = entreprise;
    },
    clickListMaitreApprentissage(maitreApprentissage){
      this.maitreApprentissage = maitreApprentissage;
    },
    submit(e) {
      e.preventDefault();

      //Pour custom le message d'erreur
      let login = document.getElementById("login");

      // ON SUBMIT =>  conversion jj/mm/aaaa vers aaaa-mm-jj
      this.form.dateDeNaissance = this.backEndDateFormat(
        this.form.dateDeNaissance
      );

      //Si formateur,cef, maitre apprentissage => il a une entreprise
      //TODO: on save l'entreprise quand on insert utilisateur 
      
      //L'utilisateur
      utilisateurApi
        .save(this.form)
        .then(response => {
          
          if(this.isEtudiant()){
            
            this.contrat.etudiantDto = response.etudiantDto;

            //Le Maitre d'apprentissage
            utilisateurApi
              .save(this.maitreApprentissage)
              .catch((error) => {
                // console.log(error.response.data);
                if (
                  error.response.data ==
                  "Un utilisateur utilise déjà cette adresse mail"
                ) {
                  login.setCustomValidity("Cette adresse mail est déjà utilisée");
                  login.reportValidity();
                }
              })
              .then(response => {

                this.contrat.maitreApprentissageDto = response;

                contratApi
                  .save(this.contrat)
                  .catch((error) => {
                    console.log(error);
                  })
                  .then(() =>  this.$router.go(-1))
              })          
            
          }
          return;
        }           
        
        )
        .catch((error) => {
          // console.log(error.response.data);
          if (
            error.response.data ==
            "Un utilisateur utilise déjà cette adresse mail"
          ) {
            login.setCustomValidity("Cette adresse mail est déjà utilisée");
            login.reportValidity();
          }
        })

      

      //Contrat
      
      
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    onClickClose(roles) {
      this.form.rolesDto = roles;
    },
    removeFromlist(index) {
      this.form.rolesDto.splice(index, 1);
    },
    setAdresseVisibility() {
      this.isAdresseNew = !this.isAdresseNew;
      if (this.btn_adresse == "Existante") this.btn_adresse = "Nouvelle";
      else this.btn_adresse = "Existante";
    },
    setEntrepriseVisibility() {
      this.isEntrepriseNew = !this.isEntrepriseNew;
      if (this.btn_entreprise == "Existante") this.btn_entreprise = "Nouvelle";
      else this.btn_entreprise = "Existante";
    },
    testPassword(password) {
      const regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
      );
      // console.log("regex.test() : ", regex.test(password));
      return regex.test(password);
    },
    frontEndDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    backEndDateFormat(date) {
      return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    },
    // dateValidity(date){
    //   const maxYear = new Date();
    //   let dateInput = date.split("/");
    //   if(dateInput[0] >= 1 && dateInput <=31 && dateInput[1]>=1 && dateInput[1]<=12 && dateInput[1]>=1950 && dateInput[1]<= maxYear.getFullYear.toString() ) {
    //     console.log("OK");
    //     console.log(date);
    //     // date = this.backEndDateFormat(date);
    //   }
    // }
  },
  created() {
    //Pour etre sur, dans le doute, on fait les 3 tests
    if (
      this.$route.params.id != null &&
      this.$route.params.id != "" &&
      this.$route.params.id != 0
    ) {
      utilisateurApi.getById(this.$route.params.id).then((response) => {
        this.vue_title = "Modifier l'utilisateur";
        this.btn_form_text = "Modifier";
        this.form = response;

        // Si id existant => conversion aaaa-mm-jj vers jj/mm/aaaa
        this.form.dateDeNaissance = this.frontEndDateFormat(
          response.dateDeNaissance
        );
      });
    }
  },
};
</script>

<style scoped>
.header-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
}

.header-list > form {
  width: 40%;
}

.civilite {
  font-weight: bold;
  margin-left: 1.7em;
  margin-right: 3em;
}

#saisie {
  width: 70%;
  margin-right: 5%;
}

.croix-delete:hover {
  cursor: pointer;
}
</style>
