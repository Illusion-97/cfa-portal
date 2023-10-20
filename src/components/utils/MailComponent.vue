<template>
  <div style="position: fixed; height: 72%;width: 94%;">
    <div class="form">
    <v-text-field label="De:" v-model="from_" disabled></v-text-field>
    <v-text-field label="A:" v-model="to_" disabled></v-text-field>
    <v-text-field label="Sujet:" v-model="header"></v-text-field>
    <v-textarea label="Contenu:" v-model="mailContent"></v-textarea>

    <v-btn @click="sendMailTo()" color="back-color" style="margin-inline: 30% 30%">
      <v-icon icon="mdi-domain" size="large" color="white">
        mdi-email-outline
      </v-icon>
    </v-btn>
  </div>
  </div>
</template>

<script>
import {etudiantApi} from "@/_api/etudiant.api";

export default {
  name: "MailComponent",
  props:{
    from: String,
    to: String,
    success:Function,
    fail:Function
  },
  data: () => {
    return {
      clicked:false,
      header:"",
      mailContent:""
    };
  },
  computed:{
    from_(){
      return this.from;
    },
    to_(){
      return this.to;
    }
  },
  methods:{
    sendMailTo(){
      if (this.header && this.mailContent){
        etudiantApi.sendMail(this.from, this.to, this.header, this.mailContent)
            .then(this.success(), this.header = "", this.mailContent = "")
      }
      else {
        this.fail()
      }
    },
    clear(){
      this.header = "";
      this.mailContent = "";
    }
  }
}
</script>

<style>

.form{
  display: flex;
  flex-direction: column;
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  z-index: 999;
  background-color: #dddddd;
  padding-inline: 5%;
}
.overlay {
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>