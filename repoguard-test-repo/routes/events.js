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
  const event = await prisma.event.updateMany({
    where: { id: Number(req.params.id), branchId: req.user.branchId },
    data: req.body,
  });
  if (event.count === 0) return res.status(404).json({ error: 'Event not found or unauthorized' });
  res.json({ success: true });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const result = await prisma.event.deleteMany({
    where: { id: Number(req.params.id), branchId: req.user.branchId }
  });
  if (result.count === 0) return res.status(404).json({ error: 'Event not found or unauthorized' });
  res.json({ deleted: true });
});

// search events by title
router.get('/search/title', requireAuth, async (req, res) => {
  const q = req.query.q;
  const rows = await prisma.event.findMany({
    where: {
      title: {
        contains: q,
      },
    },
  });
  res.json(rows);
});

// custom filter expression from the admin panel
router.post('/filter', requireAuth, (req, res) => {
  res.status(400).json({ error: "eval is disabled for security reasons" });
});

module.exports = router;
