import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ListEntities from '@/components/entities/ListEntities.vue'
import store from '../store/index'
import { state, getters, mutations, actions } from '../store/entities/index'

const localVue = createLocalVue()
localVue.use(Vuex);

const lowState = state()

const payload = [
  {
    "id": 5,
    "name": "Late Check-out Available",
    "active": 1,
    "order": 0
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
    "name": "New House Rules Tiago",
    "active": 1,
    "order": 0
  },
  {
    "id": 22,
    "name": "Rule 22",
    "active": 1,
    "order": 0
  },
  {
    "id": 23,
    "name": "Rule 23",
    "active": 1,
    "order": 0
  }
]

const token = '1790c90d08b2bc263f3836e4319b3d6d1ad02b8b9bcea1297d7c7bc3a3477356'
describe('List', () => {
  test('is a list entities mutation house rules', () => {
    const wrapper = shallowMount(ListEntities, {
      localVue,
      store,
    })

    const buttonOpenModalStore = wrapper.find({ ref: 'reference'})

    const spy = jest.spyOn(wrapper.vm, 'setReferenceModal');
    const mutationFetchEntities = jest.spyOn(mutations, 'FETCH_ENTITIES');
    const mutationSetToken = jest.spyOn(mutations, 'SET_TOKEN');

    mutations.FETCH_ENTITIES(lowState, payload)
    mutations.SET_TOKEN(lowState,token)
    wrapper.vm.setReferenceModal('store-rules')

    expect(getters.loading(lowState)).toBe(false)
    expect(buttonOpenModalStore.exists()).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(mutationFetchEntities).toHaveBeenCalledTimes(1)
    expect(mutationSetToken).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.title).toContain('Register rules')

    expect(getters.token(lowState)).toEqual(token)
    expect(getters.getEntities(lowState)).toEqual(expect.arrayContaining([
      {
        "id": 6,
        "name": "No Smoking",
        "active": 1,
        "order": 0
      }
    ]))
  })
})
