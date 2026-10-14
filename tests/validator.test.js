// tests/validator.test.js
const validateOrderInput = require('../src/validator');

describe('Модульний тест 2: validateOrderInput', () => {
    test('Успішно валідує коректні дані замовлення', () => {
        const validOrder = {
            customerName: 'Максим Сливка',
            email: 'slyvka@example.com',
            items: [{ id: 'apple_juice', quantity: 3 }]
        };
        const result = validateOrderInput(validOrder);
        expect(result.isValid).toBe(true);
    });

    test('Повертає помилку, якщо ім’я клієнта занадто коротке', () => {
        const invalidOrder = {
            customerName: 'М',
            email: 'slyvka@example.com',
            items: [{ id: 'apple_juice', quantity: 1 }]
        };
        const result = validateOrderInput(invalidOrder);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Ім’я клієнта');
    });

    test('Повертає помилку при некоректному форматі email', () => {
        const invalidOrder = {
            customerName: 'Максим Сливка',
            email: 'invalid-email-format',
            items: [{ id: 'apple_juice', quantity: 2 }]
        };
        const result = validateOrderInput(invalidOrder);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('електронної пошти');
    });

    test('Повертає помилку, якщо список товарів порожній або містить непозитивну кількість', () => {
        const invalidOrder = {
            customerName: 'Максим Сливка',
            email: 'slyvka@example.com',
            items: [{ id: 'orange_juice', quantity: 0 }]
        };
        const result = validateOrderInput(invalidOrder);
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Кількість товару повинна бути більшою за 0');
    });
});
