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
        <b-button ref="cancel" class="mt-3" @click="$emit('closeModal')">Cancel</b-button>
        <b-button ref="send" variant="primary" class="mt-3" @click="send()">{{ labelAction }}</b-button>
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
  },
  methods: {
    send() {
      let type = this.reference.includes('store')
        ? 'register'
        : 'toUpdate'

      this.$emit(type)
    }
  }
}
</script>
