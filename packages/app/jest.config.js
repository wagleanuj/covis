/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    "\\.(s?css|less)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.tsx?$": [ 
      "esbuild-jest", 
      { 
        sourcemap: true,
        loaders: {
          '.spec.ts': 'tsx'
        }
      } 
    ]
  }
};
