const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
	projectId: "92odwv",
	adminPassword: "wela.online",
	testUser: "administrator",
	defaultCommandTimeout: 20000,
	pageLoadTimeout: 15000,
	video: true,
	viewportHeight: 960,
	viewportWidth: 1400,
	retries: {
		runMode: 2,
		openMode: 2,
	},
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			// Delete videos for specs without failing or retried tests
			// https://docs.cypress.io/guides/guides/screenshots-and-videos#Delete-videos-for-specs-without-failing-or-retried-tests
			on("after:spec", (spec, results) => {
				if (results && results.video) {
					const failures = results.tests.some((test) =>
						test.attempts.some((attempt) => attempt.state === "failed")
					);
					if (!failures) {
						fs.unlinkSync(results.video);
					}
				}
			});

			return require("./cypress/plugins/index.js")(on, config);
		},
		testIsolation: false,
		baseUrl: "http://py15.localhost:8000",
		specPattern: ["./cypress/integration/*.js", "**/ui_test_*.js"],
	},
});
