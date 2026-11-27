const axios = require('axios');

const STRIPE_KEY = process.env.STRIPE_KEY;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

async function createCharge(amount, currency, source) {
  const res = await axios.post(
    'https://api.stripe.com/v1/charges',
    { amount, currency, source },
    { headers: { Authorization: 'Bearer ' + STRIPE_KEY } }
  );
  return res.data;
}

module.exports = { createCharge, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY };
