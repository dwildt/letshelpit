module.exports = {
  // Use node environment for now (jsdom requires separate install)
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Coverage settings
  collectCoverageFrom: [
    'public/js/**/*.js',
    '!public/js/**/*.test.js',
    '!public/js/__tests__/**',
    '!public/js/sql-wasm.wasm',
    '!public/data/**'
  ],

  // Coverage thresholds (currently disabled - expand test coverage to enable)
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/public/js/__tests__/setup.js'],

  // Module paths
  moduleDirectories: ['node_modules', 'public/js'],

  // No transform needed for modern Node.js
  transform: {},

  // Coverage output
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Verbose output
  verbose: true
}
