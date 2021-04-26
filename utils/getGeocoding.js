import axios from 'axios'
import get from 'lodash/get'

const MAP_QUEST_KEY = 'ypW0SfoRPJnLeFPUG3kyGhOm1zy8X96v'
const MAP_QUEST_API = 'http://www.mapquestapi.com/geocoding/v1/address'

const getLatLng = async (location) => {
  const url = `${MAP_QUEST_API}?key=${MAP_QUEST_KEY}&location=${location}`
  const response = await axios.get(url)
  const latLng = get(response, 'data.results[0].locations[0].displayLatLng', {})
  return latLng
}

const getGeocoding = async (message) => {
  const { actionType, data } = message

  if (actionType === 'H_PAYMENT_CREATED') {
    const payerCountryCode = get(data, 'payer.isoCountryCode')
    const payerCity = get(data, 'payer.city')
    const payeeCountryCode = get(data, 'payee.isoCountryCode')
    const payeeCity = get(data, 'payee.city')

    const payerLocation = `${payerCity},${payerCountryCode}`
    const payerLatLng = await getLatLng(payerLocation)

    const payeeLocation = `${payeeCity},${payeeCountryCode}`
    const payeeLatLng = await getLatLng(payeeLocation)

    return { payerLatLng, payeeLatLng }
  }

  if (actionType === 'H_ACCOUNT_CREATED') {
    const accountCountryCode = get(data, 'isoCountryCode')
    const accountCity = get(data, 'city')
    const accountLocation = `${accountCity},${accountCountryCode}`
    const accountLatLng = await getLatLng(accountLocation)

    return { accountLatLng }
  }

  return {}
}

export default getGeocoding
