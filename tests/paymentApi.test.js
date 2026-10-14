// tests/paymentApi.test.js
const processPayment = require('../src/paymentService');
const axios = require('axios');

jest.mock('axios');

describe('Інтеграційний тест 2: processPayment (інтеграція із зовнішнім банківським API через Mock)', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Успішна оплата замовлення через зовнішній платіжний шлюз (SUCCESS)', async () => {
        const mockedApiResponse = {
            data: {
                status: 'SUCCESS',
                transactionId: 'TXN-98472-UA',
                amount: 850,
                message: 'Payment completed successfully'
            }
        };
        axios.post.mockResolvedValue(mockedApiResponse);

        const paymentResult = await processPayment('ORD-2026-JUICE', 850);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
            'https://api.payments-bank.com/v1/charge',
            expect.objectContaining({
                orderId: 'ORD-2026-JUICE',
                amount: 850,
                currency: 'UAH'
            })
        );

        expect(paymentResult.isPaid).toBe(true);
        expect(paymentResult.transactionId).toBe('TXN-98472-UA');
        expect(paymentResult.paidAmount).toBe(850);
    });

    test('Коректна обробка відмови або помилки шлюзу (Network / Card declined)', async () => {
        axios.post.mockRejectedValue(new Error('Card insufficient funds or timeout'));

        const paymentResult = await processPayment('ORD-2026-JUICE', 5000);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(paymentResult.isPaid).toBe(false);
        expect(paymentResult.error).toContain('insufficient funds');
    });
});
