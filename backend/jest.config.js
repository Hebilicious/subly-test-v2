module.exports = {
    preset: "ts-jest",
    testEnvironment: "./tests/test-environment.js",
    setupFilesAfterEnv: ["./tests/setup.ts"]
}
