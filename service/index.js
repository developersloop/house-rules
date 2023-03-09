import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'

(function() {
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin)

})()

export const login = () => {
  return new Promise((resolve,reject) => {
    axios.post('https://sys-dev.searchandstay.com/api/admin/login_json', {
      login: {
        email: "task@searchandstay.com",
        password: "ph37i45K"
      }
    })
    .then(resp => {
      if(resp) resolve(resp)
      else reject(resp)
    })
  })
}
export const $http = axios.create({
  baseURL: 'https://sys-dev.searchandstay.com/api/admin'
})
