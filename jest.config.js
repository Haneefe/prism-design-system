module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@prism/tokens(.*)$': '<rootDir>/packages/tokens/src$1',
    '^@prism/core(.*)$': '<rootDir>/packages/core/src$1',
    '^@prism/components(.*)$': '<rootDir>/packages/components/src$1',
  },
  testMatch: [
    '<rootDir>/packages/**/src/**/*.test.{ts,tsx}',
    '<rootDir>/examples/**/src/**/*.test.{ts,tsx}',
  ],
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/src/**/*.d.ts',
    '!packages/**/src/**/*.stories.{ts,tsx}',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.base.json',
    }],
  },
};