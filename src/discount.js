// src/discount.js
/**
 * Розраховує знижку для замовлення на фабриці соків.
 * @param {number} totalAmount - Загальна вартість замовлення.
 * @param {string} customerType - Тип клієнта ('regular', 'vip', 'wholesale').
 * @returns {number} - Сума знижки у гривнях.
 */
function calculateDiscount(totalAmount, customerType) {
    if (totalAmount < 0) {
        throw new Error('Total amount cannot be negative');
    }
    
    let discountRate = 0;
    if (customerType === 'vip') {
        discountRate = 0.15; // 15% для VIP клієнтів
    } else if (customerType === 'wholesale') {
        discountRate = 0.25; // 25% для оптових покупців
    } else if (customerType === 'regular' && totalAmount >= 1000) {
        discountRate = 0.05; // 5% бонус за чек від 1000 грн
    }
    
    return Math.round(totalAmount * discountRate * 100) / 100;
}

module.exports = calculateDiscount;
