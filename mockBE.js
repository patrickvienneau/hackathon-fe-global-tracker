const WebSocket = require('ws')
const _ = require('lodash')
const wss = new WebSocket.Server({ port: 3000 })
const H_PAYMENT_CREATED = {
  type: 'H_PAYMENT_CREATED',
  data: {
    usdAmount: 100.00,
    payer: {
      isoCountryCode: 'US',
      state: 'FL',
      province: null,
      city: 'Tampa',
      primaryCurrency: 'USD',
      postalCode: '33603',
    },
    payee: {
      isoCountryCode: 'IN',
      state: null,
      province: 'Uttar Pradesh',
      city: 'Agra',
      postalCode: '282001',
      primaryCurrency: 'INR',
    },
  },
}

const H_ACCOUNT_CREATED = {
  type: 'H_ACCOUNT_CREATED',
  data: {
    isoCountryCode: 'US',
    state: 'FL',
    province: null,
    city: 'Tampa',
    postalCode: '33603',
    primaryCurrency: 'USD',
  },
}

wss.on('connection', function connection (ws) {
  // This fires a H_PAYMENT_CREATED every 20 seconds
  setInterval(() => {
    if (_.random(0, 1)) {
      ws.send(JSON.stringify(H_PAYMENT_CREATED))
    } else {
      ws.send(JSON.stringify(H_ACCOUNT_CREATED))
    }
  }, 5000)
})
