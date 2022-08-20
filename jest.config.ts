import { Config } from 'jest';

const config: Config = {
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
};

export default config;
