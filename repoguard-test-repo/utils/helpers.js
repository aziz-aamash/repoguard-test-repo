const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

function formatName(first, last) {
  console.log('formatting name', first, last);
  return first + ' ' + last;
}

// function formatNameOld(first, last) {
//   return last.toUpperCase() + ', ' + first;
// }

// function slugify(text) {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)/g, '');
// }

function isEmpty(value) {
  console.log('isEmpty called');
  return value === null || value === undefined || value === '';
}

module.exports = { formatName, isEmpty };
