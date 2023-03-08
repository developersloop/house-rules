<template>
   <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="12" md="10" lg="12" class="col-custom">
        <b-icon
          v-b-modal.store-rules
          style="cursor: pointer;"
          class="mb-3 icon float-right"
          icon="plus-circle"
          font-scale="2.2"
          @click="setReferenceModal('store-rules')"
        />
        <b-table
          striped hover
          :fields="fields"
          :items="getItems"
          :currentPage="currentPage"
          :perPage="4"
        >
        <template #cell(#)="row" v-if="fake.length">
          <div>
            <b-icon
              v-b-modal.edit-rules
              style="cursor: pointer;"
              class="mr-2"
              icon="pencil"
              @click="setReferenceModal('edit-rules')"
            />
            <b-icon icon="trash" style="cursor: pointer;"/>
          </div>
        </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="row-pagination">
      <b-col cols="12" sm="12" md="10" lg="12">
        <b-pagination
          v-show="entities.length || fake.length"
          v-model="currentPage"
          :total-rows="6"
          :per-page="3"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
    <Modal :reference="reference" :title="title">
      <template v-slot:content>
        <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
        <b-form-radio v-model="active" size="md" class="pt-2">Is active?</b-form-radio>
      </template>
    </Modal>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '../comum/modal.vue'
export default {
  name: 'ListEntities',
  components: {
    Modal,
  },
  data() {
    return {
      reference: '',
      title: '',
      active: false,
      name: '',
      currentPage: 1,
      fields: [
        {
          key: 'id',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'active',
          sortable: true,
        },
        {
          key: 'order',
          sortable: true,
        },
        {
          key: '#'
        }
      ],
      fake: [
        {
          "id": 2,
          "name": "No Pets",
          "active": 1,
          "order": 0,
        },
        {
          "id": 4,
          "name": "Events (On Application)",
          "active": 1,
          "order": 0
        },
        {
          "id": 5,
          "name": "Late Check-out Available",
          "active": 1,
          "order": 0,
        },
        {
          "id": 6,
          "name": "No Smoking",
          "active": 1,
          "order": 0
        },
        {
          "id": 7,
          "name": "No Parties\/Events",
          "active": 1,
          "order": 0
        },
        {
          "id": 8,
          "name": "Age Restriction",
          "active": 1,
          "order": 0
        },
        {
          "id": 10,
          "name": "New House Rules vitor",
          "active": 1,
          "order": 0
        }
      ],
      empty: [{ id: null, name: null, active: null, order: null}]
    }
  },
  mounted() {
    this.fetchEntities()
  },
  computed: {
    ...mapGetters({
      'entities': 'entities/getEntities'
    }),
    getItems() {
      return this.fake.length
        ? this.fake
        : this.empty
    }
  },
  methods: {
    ...mapActions({
      'fetchEntities': 'entities/fetchEntities'
    }),
    setReferenceModal(refs) {
      let prefix = 'rules'
      this.reference = refs
      if(refs.includes('store')) this.title = `Register ${prefix}`
      else this.title = `Edit ${prefix}`
    }
  },
}
</script>
<style lang="scss" scoped>
.pagination{
  display: flex;
  flex-flow: row;
  justify-content: center;

}

.col-custom{
  @media (max-width: 576px) { padding: 0; }
}

.icon {
  @media (max-width: 576px) {
    margin-right: 10px;
    font-size: 190% !important;
  }

}
.row-pagination{
  @media (max-width: 992px) { justify-content: center; }
}
</style>
