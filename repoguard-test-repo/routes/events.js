const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/auth');

const prisma = new PrismaClient();

// list events for the logged in user's branch
router.get('/', requireAuth, async (req, res) => {
  const events = await prisma.event.findMany({
    where: { branchId: req.user.branchId },
  });
  res.json(events);
});

// get one event
router.get('/:id', requireAuth, async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(event);
});

router.post('/', requireAuth, async (req, res) => {
  const event = await prisma.event.create({
    data: { ...req.body, branchId: req.user.branchId },
  });
  res.status(201).json(event);
});

router.put('/:id', requireAuth, async (req, res) => {
  const existingEvent = await prisma.event.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!existingEvent || existingEvent.branchId !== req.user.branchId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const event = await prisma.event.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(event);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.event.delete({ where: { id: Number(req.params.id) } });
  res.json({ deleted: true });
});

// search events by title
router.get('/search/title', requireAuth, async (req, res) => {
  const q = req.query.q;
  const rows = await prisma.$queryRawUnsafe(
    "SELECT * FROM Event WHERE title LIKE '%" + q + "%'"
  );
  res.json(rows);
});

// custom filter expression from the admin panel
router.post('/filter', requireAuth, (req, res) => {
  res.status(400).json({ error: "eval is disabled for security reasons" });
});

module.exports = router;
