import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ListEntities from '@/components/entities/ListEntities.vue'
import store from '../store/index'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('List', () => {
  test('is a list endpoint house rules', () => {
    const wrapper = shallowMount(ListEntities, {
      localVue,
      store,
      fetchEntities: jest.fn()
    })

    const buttonOpenModalStore = wrapper.find({ ref: 'reference'})
    expect(buttonOpenModalStore.exists()).toBe(true)

    const spy = jest.spyOn(wrapper.vm, 'setReferenceModal');

    wrapper.vm.setReferenceModal('store-rules')
    console.log(wrapper.store)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.title).toContain('Register rules')
  })
})
