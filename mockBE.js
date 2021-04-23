const WebSocket = require('ws')

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

wss.on('connection', function connection (ws) {
  // This fires a H_PAYMENT_CREATED every 20 seconds
  setInterval(() => {
    ws.send(JSON.stringify(H_PAYMENT_CREATED))
  }, 20000)
})
