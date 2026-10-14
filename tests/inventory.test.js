// tests/inventory.test.js
const checkStockAvailability = require('../src/inventory');

describe('Модульний тест 3: checkStockAvailability', () => {
    const warehouseStock = {
        'apple_juice': 100,
        'orange_juice': 50,
        'cherry_juice': 20
    };

    test('Повертає true, якщо всі товари є на складі в достатній кількості', () => {
        const items = [
            { id: 'apple_juice', quantity: 20 },
            { id: 'orange_juice', quantity: 15 }
        ];
        const result = checkStockAvailability(warehouseStock, items);
        expect(result.isAvailable).toBe(true);
        expect(result.missingItems).toHaveLength(0);
    });

    test('Виявляє дефіцит товару, якщо замовлена кількість перевищує залишок на складі', () => {
        const items = [
            { id: 'cherry_juice', quantity: 30 } // На складі лише 20
        ];
        const result = checkStockAvailability(warehouseStock, items);
        expect(result.isAvailable).toBe(false);
        expect(result.missingItems[0].diff).toBe(10);
    });

    test('Фіксує відсутність товару, якщо позиції взагалі немає на складі', () => {
        const items = [
            { id: 'grape_juice', quantity: 5 }
        ];
        const result = checkStockAvailability(warehouseStock, items);
        expect(result.isAvailable).toBe(false);
        expect(result.missingItems[0].available).toBe(0);
    });
});
