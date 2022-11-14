import type { Config } from 'jest';

export default {
  transform: {
    '\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  },

  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  },

  collectCoverage: true,

  coverageProvider: 'v8',
  coverageReporters: ['lcov']
} as Config;
