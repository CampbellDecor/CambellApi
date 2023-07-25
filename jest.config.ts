module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage:true,
    coverageReporters:["lcov", "text"],
    coverageDirectory:"./tests/reports",
    // reporters:["default",["./node_modules/jest-html-reporter", {
    //   pageTitle: "Test Report",
    //   outputPath: "./tests/reports/test-report.html",
    //   expand:true
    // }]]
  };