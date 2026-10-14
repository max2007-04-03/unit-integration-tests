// src/inventory.js
/**
 * Перевіряє наявність соків на складі фабрики.
 * @param {Object} warehouseStock - Залишки товарів на складі { 'apple_juice': 50, ... }
 * @param {Array} requestedItems - Список замовлених товарів [{ id: 'apple_juice', quantity: 10 }, ...]
 * @returns {Object} { isAvailable: boolean, missingItems: Array }
 */
function checkStockAvailability(warehouseStock, requestedItems) {
    const missing = [];
    for (const item of requestedItems) {
        const availableQty = warehouseStock[item.id] || 0;
        if (availableQty < item.quantity) {
            missing.push({
                id: item.id,
                requested: item.quantity,
                available: availableQty,
                diff: item.quantity - availableQty
            });
        }
    }
    return {
        isAvailable: missing.length === 0,
        missingItems: missing
    };
}

module.exports = checkStockAvailability;
