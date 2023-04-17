module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    }
  };