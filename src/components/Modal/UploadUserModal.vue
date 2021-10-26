<template>
  <section>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="idName"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Importer des utilisateurs</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <form class="d-flex" enctype="multipart/form-data " @submit="submit"> -->
            <div class="d-flex justify-content-between">
            <input
              type="file"
              name="file"
              ref="file"
              class="ml-2"
              @change="handleFileUpload"
            />
            <input
              type="button"
              @click="fileUpload"
              value="Importer"
              class="btn btn-outline-success px-3"
              data-dismiss="modal"
            />
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilisateurApi } from "@/_api/utilisateur.api.js";

export default {
  name: "upload-file",
  props: {
    idName: String,
  },
  data() {
    return {
      file_imported: "",
      formData: null,
    };
  },
  methods: {
    handleFileUpload(e) {
      this.file_imported = this.$refs.file.files[0];
      this.formData = new FormData();
      this.formData.append("file", this.file_imported);
    },
    fileUpload() {
      utilisateurApi.uploadUser(this.formData).then((res) => {
        if (res.status == 200) this.file_imported = "";
      });
    },
  },
};
</script>

<style scoped></style>
