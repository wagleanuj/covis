

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: 'node',
    testPathIgnorePatterns : [
      "<rootDir>/dist/" 
    ],
    transform: {
      "^.+\\.tsx?$": [ 
        "esbuild-jest", 
        { 
          sourcemap: true,
          loaders: {
            '.spec.ts': 'ts'
          }
        } 
      ]
    }
  };
  