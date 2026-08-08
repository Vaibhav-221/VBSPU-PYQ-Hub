const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const crypto = require('crypto');
const Razorpay = require('razorpay');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const allowedOrigins = [
    'https://vbspu-pyq-hub.online',
    'https://www.vbspu-pyq-hub.online'
  ];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay credentials are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file.');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/api/config', (req, res) => {
  res.json({ keyId: process.env.RAZORPAY_KEY_ID || '' });
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'support' } = req.body || {};
    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 paise.' });
    }

    const orderOptions = {
      amount: parsedAmount,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(orderOptions);
    res.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error('Create order error:', error);
    if (error.statusCode === 401) {
      return res.status(401).json({ error: 'Razorpay authentication failed.' });
    }
    res.status(500).json({ error: 'Failed to create Razorpay order.' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification fields.' });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Signature mismatch.' });
    }

    res.json({ success: true, message: 'Payment verified successfully.' });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment.' });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
