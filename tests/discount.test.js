// tests/discount.test.js
const calculateDiscount = require('../src/discount');

describe('Модульний тест 1: calculateDiscount', () => {
    test('Правильно нараховує 15% знижки для VIP клієнтів', () => {
        const discount = calculateDiscount(1000, 'vip');
        expect(discount).toBe(150);
    });

    test('Правильно нараховує 25% знижки для оптових покупців (wholesale)', () => {
        const discount = calculateDiscount(4000, 'wholesale');
        expect(discount).toBe(1000);
    });

    test('Нараховує 5% бонус для звичайного клієнта при чеку від 1000 грн', () => {
        const discount = calculateDiscount(1200, 'regular');
        expect(discount).toBe(60);
    });

    test('Не нараховує знижку для звичайного клієнта при замовленні менше 1000 грн', () => {
        const discount = calculateDiscount(800, 'regular');
        expect(discount).toBe(0);
    });

    test('Викидає помилку при від’ємній сумі замовлення', () => {
        expect(() => calculateDiscount(-100, 'vip')).toThrow('Total amount cannot be negative');
    });
});
