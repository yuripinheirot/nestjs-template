const config = require('./jest.config.js');
module.exports = {
  ...config,
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'node',
};
