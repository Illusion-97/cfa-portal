<template>
  <div>
    <select class="form-select">
      <option value="cda">Activité type 1 CDA</option>
      <option value="cda" v-b-modal.modal-1>Option 1</option>
      <option value="cda">Option 2</option>
      <option value="cda">Option 3</option>
    </select>
    <select class="form-select">
      <option value="cda">Activité type 2 CDA</option>
      <option value="cda" >Option 1</option>
      <option value="cda">Option 2</option>
      <option value="cda">Option 3</option>
    </select>
       <select class="form-select">
      <option value="mpil">Activité type 3 CDA</option>
      <option value="mpil">Option 1</option>
      <option value="mpil">Option 2</option>
      <option value="mpil">Option 3</option>
    </select>
    <select class="form-select">
    <option value="mpil">Annexes</option>
      <option value="mpil">Ajouter une expérience professionnelle</option>
      <option value="mpil">Exemple 2</option>
      <option value="mpil">Exemple 3</option>
    </select>
       <!-- modal -->
    <div>
      <b-button v-b-modal.modal-1>test</b-button>
      <b-modal id="modal-1" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selects",
  data: function () {
    return {};
  },
};
</script>

<style scoped>
  select{
    display:block;
     min-width: 355px;
    max-width: 355px;
}
</style>
