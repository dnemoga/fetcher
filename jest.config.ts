import { Config } from 'jest';

export default {
  transform: {
    '\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]
  },

  moduleNameMapper: {
    '^(.*)\\.js$': '$1'
  },

  collectCoverage: true
} as Config;
