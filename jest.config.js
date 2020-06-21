module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.txt$': 'jest-raw-loader'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/{!(__tests__/**),}.+(ts|tsx|js)'
  ],
  globals: {
    'ts-jest': {
      warnOnly: false
    }
  },
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/src/__tests__/$1'
  }
}
