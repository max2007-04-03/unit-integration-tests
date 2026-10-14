// tests/orderPipeline.test.js
const createOrder = require('../src/orderService');

describe('Інтеграційний тест 1: createOrder (внутрішня інтеграція модулів)', () => {
    let warehouseStock;

    beforeEach(() => {
        warehouseStock = {
            'apple_juice': 50,
            'orange_juice': 40
        };
    });

    test('Успішне наскрізне оформлення замовлення: валідація, наявність, знижка та списання зі складу', () => {
        const orderData = {
            customerName: 'Максим Сливка',
            email: 'slyvka@example.com',
            customerType: 'vip',
            items: [
                { id: 'apple_juice', price: 40, quantity: 10 },  // 400 грн
                { id: 'orange_juice', price: 60, quantity: 10 }   // 600 грн -> разом 1000 грн
            ]
        };

        const result = createOrder(orderData, warehouseStock);

        // Перевіряємо успішність інтеграційного ланцюжка
        expect(result.success).toBe(true);
        expect(result.subtotal).toBe(1000);
        expect(result.discount).toBe(150); // 15% VIP
        expect(result.finalAmount).toBe(850);
        expect(result.status).toBe('CONFIRMED');

        // Перевіряємо інтеграцію зі складом: залишки повинні зменшитися
        expect(warehouseStock['apple_juice']).toBe(40);
        expect(warehouseStock['orange_juice']).toBe(30);
    });

    test('Блокування оформлення при дефіциті складу без модифікації залишків', () => {
        const orderData = {
            customerName: 'Олена Коваль',
            email: 'olena@example.com',
            customerType: 'regular',
            items: [
                { id: 'apple_juice', price: 40, quantity: 100 } // Потрібно 100, а є 50
            ]
        };

        const result = createOrder(orderData, warehouseStock);

        expect(result.success).toBe(false);
        expect(result.reason).toBe('OUT_OF_STOCK');
        // Залишок на складі не повинен змінитися
        expect(warehouseStock['apple_juice']).toBe(50);
    });
});
