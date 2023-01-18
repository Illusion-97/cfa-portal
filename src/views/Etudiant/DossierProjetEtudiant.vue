<template>
    <section id="services" class="text-center">
        <div class="col-12 text-center text-white">
            <a>
              <router-link :to="{ name: 'creer_dossier_projet' }">
              Créer un projet
              </router-link>
            </a>
            <a>
              <router-link :to="{ name: 'modifier_dossier_projet' }">
              Modifier
              </router-link>
            </a>
            <a>
              <router-link :to="{ name: '' }">
              Télécharger
              </router-link>
            </a>
            <a>
              <router-link :to="{ name: '' }">
              Consulter
              </router-link>
            </a>
        </div>
        <div class="container">            
            <div class="row g-4">
                <div class="col-lg-4 col-md-6">
                    <div class="service">
                        <h5>Block 1</h5>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                            classical Latin literature from</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service">
                        <h5>Block 2</h5>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                            classical Latin literature from</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="service">
                        <h5>Block 3</h5>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                            classical Latin literature from</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import { dossierProfessionnelApi } from '@_api/dossierProjet.api.js'

export default ({
    name: "DossierProjetEtudiant" 
        

})
</script>

<style scoped>

/* ajout */
.service {
    padding: 32px;
    background-color: #fff;
    box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.08);
}

#main-grp-btn_frm button, a {

    background-color: #F54D4D;

    color: white;

    padding: 12px 20px;

    border: none;

    cursor: pointer;

    margin-left: 10px;

    border-radius: 200px;

}
/* fin ajout */

h2 {
  font-weight: bolder;
}

/* .div-btn-right {
  display: flex;
  flex-flow: row-reverse;
} */
.dnone {
  display: none;
}

.oui {
  color: red;
}

.test {
  margin-top: 10px;
}

.container {
  margin: 89px 0 0 421px;
  min-height: 340px;
}

.fa-folder-open {
  color: #4caf50;
}

.fa-upload {
  color: #4caf50;
}

.redOu {
  color: red;
  font-style: italic;
}

.table {
  margin-top: 30px;
}

.consignes {
  margin: 30px 0 0 0;
}

#btn-creer-dossier {
  margin: 0 auto;
  display: block;
}

.card {
  max-width: 30rem !important;
  margin-right: 30px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.card .btn {
  width: auto;
}

#div-cards-dossier {
  display: flex;
  margin-bottom: 30px;
}

.card-text {
  font-size: 14px;
}

.fsize14 {
  font-size: 14px;
}

#info {
  margin-bottom: 50px;
}

#div-cards-dossier h4 {
  font-size: 1.25rem;
}

.card-body .btn {
  width: -webkit-fill-available;
}

a:hover {
  text-decoration: none;
}

h5 {
  margin-bottom: 31px;
  font-weight: bolder;
}

h4 {
  font-size: 1rem !important;
  font-weight: bolder;
}

#title-info {
  padding-left: 7px;
}
</style>
