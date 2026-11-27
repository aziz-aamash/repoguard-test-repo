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
  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  res.json(orders);
});

router.get('/:id/report', requireAuth, requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { items: true },
  });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (req.user.role !== 'admin' && order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  res.json(buildReport(order));
});

router.get('/:id/invoice', requireAuth, requireAuth, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { items: true },
  });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (req.user.role !== 'admin' && order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  res.json(buildInvoice(order));
});

module.exports = router;