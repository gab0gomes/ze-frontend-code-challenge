import axios from 'axios'

export const getAddresses = (address) =>
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key: 'AIzaSyCV5Sbzub13VPsrgddiGx9WoGx91Dmi3WY',
      components: 'country:BR',
      language: 'pt-br',
      address
    }
  })
