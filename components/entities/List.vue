<template>
   <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="12" md="10" lg="12">
        <b-table striped hover
          :fields="fields"
          :items="entities"
          >
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListEntities',
  data() {
    return {
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
    })
  },
  methods: {
    ...mapActions({
      'fetchEntities': 'entities/fetchEntities'
    })
  },
}
</script>
