/** @type {import('ts-jest').JestConfigWithTsJest} */
/* global module */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    // index.ts is the main entry point and is excluded in the Unit testing. This should be tested in an End-to-end test
    collectCoverageFrom:["src/**/*.ts","!src/index.ts"],
    coverageThreshold: {
        global: {
            lines: 60,
            functions: 60,
            statements: 60,
            branches: 60,
        },
    },
};
