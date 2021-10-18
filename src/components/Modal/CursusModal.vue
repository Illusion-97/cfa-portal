<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Choisir le cursus</h3>
        </div>

        <CursusListComponent
          v-on:click-list="onClickChildInterventionList"
          :interventionProp="cursus"
          :isModal="true"
        />

        <div class="modal-footer text-right">
          <button class="btn btn-primary" @click="close()">
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CursusListComponent from "@/components/List/CursusListComponent.vue";

export default {
  name: "EtudiantModal",
  components: {
    CursusListComponent,
  },
  data() {
    return {
      cursus: {},
    };
  },
  props: {
    cursusProp: {
      default: null,
    },
  },
  watch: {
    cursusProp() {
      if (this.cursusProp != null) this.cursus = this.cursusProp;
    },
  },
  methods: {
    close() {
      this.$emit("close", this.cursus);
    },
    onClickChildInterventionList(cursus) {
      this.cursus = cursus;
    },
  },
  created() {},
};
</script>

<style scoped>
.croix-delete {
  cursor: pointer;
  margin-left: 1em;
}

.mon-group {
  margin-bottom: 2em;
}

.mon-tr:hover {
  background-color: rgb(216, 213, 213) !important;
  cursor: pointer;
}

/* Modal */
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 50%;
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
}

.form-label > .form-control {
  margin-top: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
