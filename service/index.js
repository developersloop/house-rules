import axios from 'axios'
(function() {
  axios.post('https://sys-dev.searchandstay.com/api/admin/login_json', {
    login: {
      email: "task@searchandstay.com",
      password: "ph37i45K"
    }
  })
  .then(resp => localStorage.setItem('token', resp?.data?.data?.result?.access_token))
})()


const configureDefault = {
  baseURL: 'https://sys-dev.searchandstay.com/api/admin'
}
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const $http = axios.create(configureDefault)
