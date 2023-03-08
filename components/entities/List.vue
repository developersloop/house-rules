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
        <template #cell(#)="row" v-if="entities.length">
          <div>
            <b-icon
              v-b-modal.edit-rules
              style="cursor: pointer;"
              class="mr-2"
              icon="pencil"
              @click="setReferenceModal('edit-rules', row?.item?.id)"
            />
            <b-icon icon="trash" @click="deleteEntities(row?.item?.id)" style="cursor: pointer;"/>
          </div>
        </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="row-pagination">
      <b-col cols="12" sm="12" md="10" lg="12">
        <b-pagination
          v-show="entities.length"
          v-model="currentPage"
          :total-rows="6"
          :per-page="3"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
    <Modal
      :reference="reference"
      :title="title"
      @register="register()"
      @toUpdate="toUpdate()"
      @closeModal="closeModal"
    >
      <template v-slot:content>
        <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
        <b-form-radio v-model="active" size="md" :value="1" class="pt-2">Is active?</b-form-radio>
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
      active: 0,
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
      empty: [{ id: null, name: null, active: null, order: null}],
      entitie: null,
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
      return this.entities.length
        ? this.entities
        : this.empty
    }
  },
  methods: {
    ...mapActions({
      'fetchEntities': 'entities/fetchEntities',
      'createEntities': 'entities/createEntities',
      'updateEntities': 'entities/updateEntities',
      'deleteEntities': 'entities/deleteEntities'
    }),
    setReferenceModal(refs, id = null) {
      let prefix = 'rules'
      this.reference = refs
      if(refs.includes('store')) this.title = `Register ${prefix}`
      else {
        let entitie = this.entities.find(entitie => entitie?.id == id)
        this.entitie = entitie
        this.title = `Edit ${prefix}`
        this.name = entitie?.name
        this.active = entitie.active

      }
    },
    register() {
      this.createEntities({ name: this.name, active: this.active })
      this.closeModal()
    },
    toUpdate() {
      this.updateEntities({
        id: this.entitie?.id,
        payload: {
          name: this.name,
          active: this.active
       }
      })
      this.closeModal()
    },
    closeModal() {
      this.name = null,
      this.active = 0
      this.$bvModal.hide(this.reference)
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
