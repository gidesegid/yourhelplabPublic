const mollie = require('@mollie/api-client')({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });
mollie.payments.create({
  amount: {
    value:    "10.00",
    currency: 'EUR'
  },
  description: 'My first API payment',
  redirectUrl: 'https://yourwebshop.example.org/order/123456',
  webhookUrl:  'https://yourwebshop.example.org/webhook'
})
  .then((payment) => {
    // Forward the customer to the payment.getPaymentUrl()
  })
  .catch((err) => {
    // Handle the error
  });
  var payment={}
  payment.id='1'
  mollie.payments.get(payment.id)
  .then((payment) => {
    // E.g. check if the payment.isPaid()
    console.log("paid")
  })
  .catch((err) => {
    // Handle the error
    console.log(err)
  });
  module.exports=mollie;