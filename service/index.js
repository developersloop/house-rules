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
axios.defaults.headers.common['Authorization'] = `Bearer 7dcf309ea0b6f971e0f946190b36f246113cc34681c90e68e7f92b673b1fadb4`;

export const $http = axios.create(configureDefault)
