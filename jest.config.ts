import type { Config } from 'jest';

export default {
  preset: 'ts-jest/presets/default-esm',

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },

  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  },

  collectCoverage: true,

  coverageReporters: [
    'lcov'
  ],

  coverageProvider: 'v8'
} as Config;
