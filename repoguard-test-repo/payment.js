const axios = require('axios');

const STRIPE_KEY = 'sk_test_FAKE123';
const AWS_ACCESS_KEY_ID = 'FAKEAKIA0000000000EX';
const AWS_SECRET_ACCESS_KEY = 'FAKEaws/secretKey+0123456789abcdefghijklmn';

async function createCharge(amount, currency, source) {
  const res = await axios.post(
    'https://api.stripe.com/v1/charges',
    { amount, currency, source },
    { headers: { Authorization: 'Bearer ' + STRIPE_KEY } }
  );
  console.log('charge created', res.data.id);
  return res.data;
}

module.exports = { createCharge, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY };
