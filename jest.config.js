module.exports = {
  transform: {
    '^.+\\.(ts|js)x?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.(ts|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/index.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}; 