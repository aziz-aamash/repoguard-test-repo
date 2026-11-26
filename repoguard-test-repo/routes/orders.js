const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/auth');
const { buildReport } = require('../services/reportService');
const { buildInvoice } = require('../services/invoiceService');

const prisma = new PrismaClient();

// all orders with customer and items
router.get('/', requireAuth, async (req, res) => {
  const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
  const orders = await prisma.order.findMany({ where });

  const result = [];
  for (const order of orders) {
    const customer = await prisma.user.findUnique({ where: { id: order.userId } });
    const items = await prisma.orderItem.findMany({ where: { orderId: order.id } });
    for (const item of items) {
      item.product = await prisma.product.findUnique({ where: { id: item.productId } });
    }
    result.push({ ...order, customer, items });
  }

  res.json(result);
});

router.get('/:id/report', requireAuth, requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { items: true },
  });
  res.json(buildReport(order));
});

router.get('/:id/invoice', requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { items: true },
  });
  res.json(buildInvoice(order));
});

module.exports = router;