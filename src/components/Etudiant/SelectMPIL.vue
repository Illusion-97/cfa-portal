<template>
     <div>
    <select class="form-select">
      <option value="mpil">Activité type 1 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
    </select>
    <select class="form-select">
      <option value="mpil">Activité type 2 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
    </select>
    <select class="form-select">
      <option value="mpil">Activité type 3 MPIL</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
    </select>
    <select @change="checkAnnexes" v-model="annexes" class="form-select">
      <option value="null">Annexes</option>
      <option value="experience">Ajouter une expérience professionnelle</option>
      <option >Exemple 2</option>
      <option >Exemple 3</option>
    </select>
  </div>
</template>

<script>
export default {  
   name: "Selects",
  data: function () {
    return {
      annexes: null
    };
  },
  methods: {
    checkAnnexes: function () {
      if (this.annexes == "experience") {
        this.$emit('modal');
      }
    }
  }
}
</script>

<style scoped>
  select{
    display:block;
    min-width: 355px;
    max-width: 355px;
}
</style>
