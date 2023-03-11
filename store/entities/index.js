import Vue from 'vue'
import { $http, login } from '../../service/index'

import {
    FETCH_ENTITIES,
    SET_LOADING,
    SET_TOKEN,
    SET_PAGINATION,
} from "../../mutationsTypes/index"

export const state = () => ({
  entities: {},
  pagination: {},
  loading: false,
  token: null
})

export const getters = {
  getEntities: state => state.entities,
  loading: state => state.loading,
  token: state => state.token,
  pagination: state => state.pagination
}

export const mutations = {
  [FETCH_ENTITIES](state, payload) {
    Vue.set(state.entities, 'results', [...payload])
  },
  [SET_PAGINATION](state, pagination) {
    state.pagination = pagination
  },
  [SET_LOADING](state, token) {
    state.loading = token
  },
  [SET_TOKEN](state, token) {
    state.token = token
  }
}
export const actions = {
  fetchEntities(context, page = 1) {
    if(context.state.token) {
      $http.get(`house_rules?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${context.state.token}`
        }
      })
      .then(resp => {
        context.commit(SET_PAGINATION, resp.data.data.pagination)
        if(resp) context?.commit(FETCH_ENTITIES, resp?.data?.data?.entities || [])
      })
    }
    else {
      login()
        .then(resp => {
          context.commit(SET_LOADING, true)
          context.commit(SET_TOKEN, resp.data.data.result.access_token)
          $http.get(`house_rules?page=${page}`, {
            headers: {
              'Authorization': `Bearer ${resp.data.data.result.access_token}`
            }
          })
          .then(resp => {
              context.commit(SET_PAGINATION, resp.data.data.pagination)
              if(resp) context?.commit(FETCH_ENTITIES, resp?.data?.data?.entities || [])
            })
            .finally(_ => context.commit(SET_LOADING, false))
        })
    }
  },
  createEntities({ getters }, payload) {
    return new Promise((resolve,reject) => {
      $http.post('/house_rules',{
        house_rules:{
          ...payload
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${getters.token}`
        }
      })
      .then(resp => {
        if(resp) resolve(resp)
        else reject(resp)
      })
    })
  },
  updateEntities({ getters }, { id, payload }) {
    return new Promise((resolve,reject) => {
      $http.put(`/house_rules/${id}`, {
        house_rules:{
          ...payload
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${getters.token}`
        }
      })
        .then(resp => {
          if(resp) resolve(resp)
          else reject(resp)
        })
    })
  },
  deleteEntities({ getters }, id) {
    return new Promise((resolve,reject) => {
       $http.delete(`/house_rules/${id}`, {
        headers: {
          'Authorization': `Bearer ${getters.token}`
        }
       })
        .then(resp => {
          if(resp) resolve(resp)
          else reject(resp)
        })
    })
  }
}
