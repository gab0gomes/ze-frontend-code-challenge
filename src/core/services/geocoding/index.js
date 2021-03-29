import axios from 'axios'

export const getAddresses = (address) =>
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      key: process.env.GOOGLE_GEOCODING_API_KEY,
      components: 'country:BR',
      language: 'pt-br',
      address
    }
  })
