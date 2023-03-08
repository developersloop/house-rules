<template>
   <b-container>
    <b-row align-v="center" align-h="center">
      <b-col cols="12" sm="12" md="10" lg="12" class="col-custom">
        <b-table striped hover
          :fields="fields"
          :items="fake"
          :currentPage="currentPage"
          :perPage="4"
        >
        <template #cell(#)="row">
          <div>
            <b-icon-pencil class="mr-2" style="cursor: pointer;"/>
            <b-icon-trash style="cursor: pointer;"/>
          </div>
        </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
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
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListEntities',
  data() {
    return {
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
  },
  methods: {
    ...mapActions({
      'fetchEntities': 'entities/fetchEntities'
    })
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
</style>
