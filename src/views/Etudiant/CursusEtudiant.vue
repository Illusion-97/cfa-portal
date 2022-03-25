<template>
  <div class="container">
    <h5>Concepteur développeur d'applications - NANTES 2021</h5>
    <p>
      <b-row>
        <b-col cols="2" class="info-gauche"><strong>Descriptif</strong></b-col>
        <b-col cols="10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          blanditiis nesciunt necessitatibus iure, doloremque ab sunt, cum
          reiciendis obcaecati voluptatum eum ad reprehenderit id mollitia dicta
          molestias dolor praesentium inventore.
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="space"></b-col>
        <b-col cols="10"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="info-gauche"><strong>Durée</strong></b-col>
        <b-col cols="10"> 1500h </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="space"></b-col>
        <b-col cols="10"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="info-gauche"><strong>Date</strong></b-col>
        <b-col cols="10"> du 03/01/2022 au 24/12/2022 </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="space"></b-col>
        <b-col cols="10"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="info-gauche"><strong>Planning</strong></b-col>
        <b-col cols="10">
          <b-button variant="success" size="sm">
            <font-awesome-icon
              :icon="['fas', 'download']"
              class="btn-download"
            />
            Télécharger</b-button
          >
        </b-col>
      </b-row>
    </p>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  margin: 89px 0 0 421px;
}

h5 {
  margin-bottom: 30px;
}

.info-gauche {
  text-align: end;
}

.space {
  min-height: 10px;
}
</style>