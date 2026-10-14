// src/paymentService.js
const axios = require('axios');

/**
 * Сервіс оплати замовлення через платіжний шлюз банку (зовнішній API).
 * @param {string} orderId
 * @param {number} amount
 * @param {string} paymentUrl
 * @returns {Promise<Object>} Результат платежу
 */
async function processPayment(orderId, amount, paymentUrl = 'https://api.payments-bank.com/v1/charge') {
    try {
        const response = await axios.post(paymentUrl, {
            orderId,
            amount,
            currency: 'UAH',
            timestamp: new Date().toISOString()
        });
        return {
            isPaid: response.data.status === 'SUCCESS',
            transactionId: response.data.transactionId,
            paidAmount: response.data.amount
        };
    } catch (error) {
        return {
            isPaid: false,
            error: error.message || 'Payment processing failed'
        };
    }
}

module.exports = processPayment;
