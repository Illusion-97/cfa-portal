<template>
  <div>
    <body-title title="Affichage des cours" />
    <section>
      <div class="container">
        <div class="row">
          <div class="my-3 ml-auto">
            <b-form inline>
              <label for="pageSelect" class="mr-sm-2">Affichage :</label>
              <b-form-select
                id="pageSelect"
                v-model="perPage"
                :options="itemLength"
                class="border-0 opts"
                size="sm"
              >
              </b-form-select>
            </b-form>
          </div>
          <div class="col-md-12">
            <b-table
              id="my-table"
              striped
              fixed
              small
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
            >
              <template #cell(title)="data">
                <b-link href="#" style="color:black;">
                  {{ data.value }}
                </b-link>
              </template>

              <template #cell(dateBegin)="data">
                {{
                  data.value | moment("timezone", "Europe/Paris", "DD/MM/YYYY")
                }}
              </template>

              <template #cell(dateEnd)="data">
                {{
                  data.value | moment("timezone", "Europe/Paris", "DD/MM/YYYY")
                }}
              </template>

              <template #cell(modifier)>
                <font-awesome-icon
                  :icon="['fas', 'pen']"
                  class="icon text-secondary"
                />
              </template>

              <template #cell(supprimer)>
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="icon text-danger"
                />
              </template>
            </b-table>
          </div>

          <b-pagination
            class="pages ml-auto border-0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            size="sm"
          >
          </b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import courseModel from "@/assets/mock/course.json";
import { courseFields } from "@/assets/js/fields.js";
import { courseItemLength } from "@/assets/js/itemLength.js";
import BodyTitle from "@/components/utils/BodyTitle.vue";
export default {
  components: {
    BodyTitle,
  },
  name: "Course",
  props: {
    data: {},
  },
  data() {
    return {
      items: courseModel,
      fields: courseFields,
      itemLength: courseItemLength,
      perPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1);
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>
<style scoped>
.opts,
label {
  color: black;
}

.icon:hover {
  cursor: pointer;
}
</style>
