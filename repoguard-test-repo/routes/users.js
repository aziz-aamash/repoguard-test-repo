const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/auth');

const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email} AND password = ${password}`;
  if (users.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const user = users[0];
  const token = jwt.sign(
    { id: user.id, role: user.role, branchId: user.branchId },
    process.env.JWT_SECRET
  );
  res.json({ token, user });
});

// list all users
router.get('/', requireAuth, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// get any user by id
router.get('/:id', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
});

module.exports = router;
