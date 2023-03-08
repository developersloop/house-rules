import { $http } from '../../service/index'

import { FETCH_ENTITIES } from "../../mutationsTypes/index"

export const state = () => ({
  entities: []
})

export const getters = {
  getEntities: (state) => state.entities
}

export const mutations = {
  [FETCH_ENTITIES](state, payload) {
    state.entities = [...payload]
  }
}

export const actions = {
  fetchEntities(context) {
    return new Promise((resolve,reject) => {
       $http.get('/house_rules')
          .then(resp => {
            if(resp) {
              context?.commit(FETCH_ENTITIES, resp?.data?.data?.entities || [])
              resolve(resp)
            }
            else reject(resp)
          })
    })
  }
}
