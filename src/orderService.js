// src/orderService.js
const validateOrderInput = require('./validator');
const checkStockAvailability = require('./inventory');
const calculateDiscount = require('./discount');

/**
 * Оформлює замовлення, інтегруючи валідацію, перевірку складу, розрахунок знижки та списання залишків.
 * @param {Object} orderData
 * @param {Object} warehouseStock
 * @returns {Object} Результат оформлення замовлення
 */
function createOrder(orderData, warehouseStock) {
    // 1. Валідація
    const validation = validateOrderInput(orderData);
    if (!validation.isValid) {
        return { success: false, reason: 'VALIDATION_ERROR', message: validation.error };
    }

    // 2. Перевірка наявності на складі
    const stockCheck = checkStockAvailability(warehouseStock, orderData.items);
    if (!stockCheck.isAvailable) {
        return { success: false, reason: 'OUT_OF_STOCK', missing: stockCheck.missingItems };
    }

    // 3. Розрахунок вартості та знижки
    let subtotal = 0;
    for (const item of orderData.items) {
        subtotal += item.price * item.quantity;
    }
    const discount = calculateDiscount(subtotal, orderData.customerType || 'regular');
    const finalAmount = Math.max(0, subtotal - discount);

    // 4. Списання зі складу
    for (const item of orderData.items) {
        warehouseStock[item.id] -= item.quantity;
    }

    return {
        success: true,
        orderId: `ORD-2026-JUICE`,
        customerName: orderData.customerName,
        subtotal,
        discount,
        finalAmount,
        status: 'CONFIRMED'
    };
}

module.exports = createOrder;
