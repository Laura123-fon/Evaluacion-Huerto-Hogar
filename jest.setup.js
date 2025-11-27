// jest.setup.js

import '@testing-library/jest-dom';

// Polyfills para TextEncoder y TextDecoder
// Necesario para Node.js y React Router
const { TextEncoder, TextDecoder } = require('util');

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}