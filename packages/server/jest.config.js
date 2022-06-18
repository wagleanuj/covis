

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: 'node',
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
  