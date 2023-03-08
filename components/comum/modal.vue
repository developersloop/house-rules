<template>
  <b-modal
    class="modal-task"
    :id="reference"
    :title="title"
  >
    <div class="content">
      <slot name="content"></slot>
    </div>
    <template #modal-footer>
        <b-button class="mt-3" @click="$bvModal.hide(reference)">Cancel</b-button>
        <b-button variant="primary" class="mt-3">{{ labelAction }}</b-button>
      </template>
  </b-modal>
</template>
<script>
export default {
  name: 'modal',
  props: {
    reference:{
      type: String,
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
  },
  data() {
    return {

    }
  },
  computed: {
    labelAction() {
      return this.reference.includes('store')
        ? 'Register'
        : 'To Update'
    }
  }
}
</script>
