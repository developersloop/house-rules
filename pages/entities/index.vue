<template>
  <div class="list-entities">
    <list-entities />
  </div>
</template>
<script>
import ListEntities from '../../components/entities/ListEntities.vue'
export default {
  name: 'entities',
  components: {
    'list-entities': ListEntities
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$store?.state?.entities?.counter)
  }
}
</script>
<style lang="scss">
#__nuxt{
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
</style>
