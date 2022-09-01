import type { Config } from 'jest';

export default {
  preset: 'ts-jest',

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },

  collectCoverage: true,

  coverageReporters: [
    'lcov'
  ],

  coverageProvider: 'v8'
} as Config;
