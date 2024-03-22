module.exports = {
  setupFilesAfterEnv: ['<rootDir>/specs/support/setup.ts'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  roots: ['<rootDir>/specs'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          isolatedModules: true,
          sourceMap: false,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^@specs/(.*)': '<rootDir>/specs/$1',
  },
};
