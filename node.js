const axios = require('axios');

app.get('/api/buat-pembayaran', async (req, res) => {
  const orderId = 'order-' + Date.now();

  // Simpan order ke database sebagai "pending"
  
  const response = await axios.post(
    'https://app.sandbox.midtrans.com/snap/v1/transactions',
    {
      transaction_details: {
        order_id: orderId,
        gross_amount: 50000
      },
      enabled_payments: ["qris", "gopay", "shopeepay"]
    },
    {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('SERVER_KEY' + ':').toString('base64'),
        'Content-Type': 'application/json'
      }
    }
  );

  res.json({ redirect_url: response.data.redirect_url });
});
