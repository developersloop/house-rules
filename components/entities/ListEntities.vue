<template>
   <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="12" md="10" lg="12" class="col-custom">
        <b-icon
          v-show="!loading && (getFieds && getFieds.length)"
          v-b-modal.store-rules
          style="cursor: pointer;"
          class="mb-3 icon float-right"
          icon="plus-circle"
          font-scale="2.2"
          ref="reference"
          @click="setReferenceModal('store-rules')"
        />
        <b-table
          v-show="!loading && (getFieds && getFieds.length)"
          striped hover
          :items="getEnttities"
          :currentPage="pagination.currentPage"
          :per-page="pagination.count"
        >
        <template #cell(#)="row" v-if="entities.results ? entities.results.length : false">
          <div>
            <b-icon
              v-b-modal.edit-rules
              style="cursor: pointer;"
              class="mr-2"
              icon="pencil"
              @click="setReferenceModal('edit-rules', row.item.id)"
            />
            <b-icon icon="trash" @click="del(row.item.id)" style="cursor: pointer;"/>
          </div>
        </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="row-pagination">
      <b-col cols="12" sm="12" md="10" lg="12">
        <b-pagination
        v-show="entities.results ? entities.results.length : false"
        v-model="currentPage"
        :total-rows="pagination.total_pages+1"
        :per-page="pagination.total_pages"
        aria-controls="my-table"
        @input="handler(currentPage)"
        ></b-pagination>
      </b-col>
    </b-row>
    <div class="loader">
      <b-icon v-show="loading" icon="arrow-counterclockwise" animation="spin-reverse" font-scale="4"></b-icon>
      <div v-show="crash" class="crash">Oh no, come back later :(</div>
    </div>
    <Modal
      :reference="reference"
      :title="title"
      @register="register()"
      @toUpdate="toUpdate()"
      @closeModal="closeModal"
    >
    <template v-slot:content>
      <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
      <div class="d-flex flex-row align-items-baseline">
        <span class="mr-2">Is Active?</span>
        <b-form-radio v-model="active" size="md" :value="1" class="pt-2 mr-2">yes</b-form-radio>
        <b-form-radio v-model="active" size="md" :value="0" class="pt-2">no</b-form-radio>
      </div>
    </template>
  </Modal>
</b-container>
</template>
<script>
import Vue from 'vue'
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
      entitie: null,
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
      crash: false
    }
  },
  mounted() {
    this.fetchEntities()
      .catch(_ => this.crash = true)
  },
  computed: {
    ...mapGetters({
      'entities': 'entities/getEntities',
      'loading': 'entities/loading',
      'pagination': 'entities/pagination'
    }),
    getEnttities() {
      return this.entities.results
    },
    getFieds() {
      return !this.loading
        ? this.entities.results
        : null
    },
  },
  methods: {
    ...mapActions({
      'fetchEntities': 'entities/fetchEntities',
      'createEntities': 'entities/createEntities',
      'updateEntities': 'entities/updateEntities',
      'deleteEntities': 'entities/deleteEntities'
    }),
    handler(currentPage) {
      this.fetchEntities(currentPage)
    },
    setReferenceModal(refs, id = null) {
      let prefix = 'rules'
      this.reference = refs
      if(refs.includes('store')) this.title = `Register ${prefix}`
      else {
        let entitie = this.entities.find(entitie => entitie.id == id)
        this.entitie = entitie
        this.title = `Edit ${prefix}`
        this.name = entitie.name
        this.active = entitie.active
      }
    },
    register() {
      this.createEntities({ name: this.name, active: this.active })
        .finally(_ => this.closeModal())
    },
    toUpdate() {
      this.updateEntities({
        id: this.entitie.id,
        payload: {
          name: this.name,
          active: this.active
        }
      })
      .then(({ data }) => {
        let entitie = this.entities.find(entitie => entitie.id == data.data.id)
        entitie.name = this.name
        entitie.active = this.active
        this.closeModal()
      })
    },
    del(id) {
      this.deleteEntities(id)
        .finally(_ => {
          this.entities.splice(this.entities.indexOf(this.entitie),1);
        })
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

.loader{
  display: flex;
  flex-flow: row;
  justify-content: center;
}

.crash{
  font-size: larger;
  font-weight: bold;
}
</style>
