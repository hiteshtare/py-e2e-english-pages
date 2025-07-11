// Import common util
import { TEST_CONFIG } from "./config";
import { captureSreenshot } from "./util/common.util";

// using baseURL
const baseUrl = Cypress.config("baseUrl");

const testDataForItems = require("../fixtures/events.json");

beforeEach(function () {
  // Define and Encode the authentication string
  const authString = `yssdev:Jaiguru@123!`;
  const encodedAuth = Buffer.from(authString).toString("base64");

  // Preparing to intercept the /basic_auth request and add the auth header once we click on login
  cy.intercept("GET", "**", (req) => {
    req.headers["authorization"] = `Basic ${encodedAuth}`;
  }).as("basicAuth");
  cy.intercept("POST", "**", (req) => {
    req.headers["authorization"] = `Basic ${encodedAuth}`;
  }).as("basicAuth");
});

describe("Events", () => {
  testDataForItems.forEach((testCase: any, index: number) => {
    it(`#${index} page ${testCase.label} should have Page Load Time less than ${TEST_CONFIG.maximumPageLoadTime} seconds`, () => {
      const fullURL = `${baseUrl}${testCase.url}`;
      cy.visit(`${fullURL}`);
      cy.window().then((win) => {
        const [navigationTiming] = win.performance.getEntriesByType(
          "navigation"
        ) as PerformanceNavigationTiming[];
        if (navigationTiming) {
          const pageLoadTime = + (
            (navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime) /
            1000
          ).toFixed(4);
          const ttfb =
            navigationTiming.responseStart - navigationTiming.startTime;
          const fcp =
            navigationTiming.domContentLoadedEventEnd -
            navigationTiming.startTime;
          const responseTime =
            navigationTiming.responseEnd - navigationTiming.requestStart;
          const throughput =
            navigationTiming.encodedBodySize /
              (navigationTiming.responseEnd - navigationTiming.responseStart) ||
            0;
          
          cy.log(`Total Load Time: ${pageLoadTime} s`);
          cy.log(`Time to First Byte: ${ttfb} ms`);
          cy.log(`First Contentful Paint: ${fcp} ms`);
          cy.log(`Response Time: ${responseTime} ms`);
          cy.log(`Throughput: ${throughput}`);
          
          expect(pageLoadTime).to.be.lessThan(TEST_CONFIG.maximumPageLoadTime);
        }
      });
      captureSreenshot();
    });
  });
});
