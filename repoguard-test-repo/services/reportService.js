function calculateTotals(items) {
  let subtotal = 0;
  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    const discount = item.discountPercent ? lineTotal * (item.discountPercent / 100) : 0;
    subtotal += lineTotal - discount;
  }
  const tax = subtotal * 0.17;
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
}

function buildReport(order) {
  const totals = calculateTotals(order.items);
  return {
    orderId: order.id,
    type: 'report',
    generatedAt: new Date().toISOString(),
    ...totals,
  };
}

module.exports = { buildReport, calculateTotals };
