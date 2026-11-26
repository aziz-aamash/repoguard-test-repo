const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

function formatName(first, last) {
  return first + ' ' + last;
}

// function formatNameOld(first, last) {
// function slugify(text) {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)/g, '');
// }

module.exports = { formatName, isEmpty };
