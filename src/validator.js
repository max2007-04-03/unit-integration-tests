// src/validator.js
/**
 * Валідує вхідні дані нового замовлення соків.
 * @param {Object} order - Об'єкт замовлення.
 * @returns {Object} { isValid: boolean, error?: string }
 */
function validateOrderInput(order) {
    if (!order || typeof order !== 'object') {
        return { isValid: false, error: 'Замовлення не може бути порожнім' };
    }
    if (!order.customerName || order.customerName.trim().length < 2) {
        return { isValid: false, error: 'Ім’я клієнта повинно містити щонайменше 2 символи' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!order.email || !emailRegex.test(order.email)) {
        return { isValid: false, error: 'Некоректний формат електронної пошти' };
    }
    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
        return { isValid: false, error: 'Замовлення повинно містити хоча б один товар' };
    }
    for (const item of order.items) {
        if (!item.quantity || item.quantity <= 0) {
            return { isValid: false, error: 'Кількість товару повинна бути більшою за 0' };
        }
    }
    return { isValid: true };
}

module.exports = validateOrderInput;
