// Import common util
import { TEST_CONFIG } from "./config";
import { captureSreenshot } from "./util/common.util";

// using baseURL
const baseUrl = Cypress.config("baseUrl");

const testDataForItems = require("../fixtures/priority-pages.json");

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

describe("Priority Pages", () => {

  testDataForItems.forEach((testCase: any, index: number) => {
     it(`#${index} page ${
      testCase.label
       } should have Page Load Time less than ${TEST_CONFIG.maximumPageLoadTime} seconds`, () => {
      // const fullURL = `${baseUrl}${testCase.match_url}`;
      // cy.visit(`${fullURL}`);
      cy.visit(`${testCase.url}`);
      cy.window().then((win) => {
        const [navigationTiming] = win.performance.getEntriesByType(
          "navigation"
        ) as PerformanceNavigationTiming[];
        if (navigationTiming) {
          const pageLoadTime = + (
            (navigationTiming.loadEventEnd - navigationTiming.startTime) /
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

  // it(`#${1} page link: should have Page Load Time less than 1 second`, () => {
  //   // cy.visit(`/event/sadhana-sangams`);

  //   cy.visit(`/autobiography-of-a-yogi-regional-languages-free-audiobook`);
  //   cy.window().then((win) => {
  //     const [navigationTiming] = win.performance.getEntriesByType(
  //       "navigation"
  //     ) as PerformanceNavigationTiming[];
  //     if (navigationTiming) {
  //       const pageLoadTime =
  //         + ((navigationTiming.loadEventEnd - navigationTiming.startTime) / 1000).toFixed(4);
  //       const ttfb =
  //         navigationTiming.responseStart - navigationTiming.startTime;
  //       const fcp =
  //         navigationTiming.domContentLoadedEventEnd -
  //         navigationTiming.startTime;
  //       const responseTime =
  //         navigationTiming.responseEnd - navigationTiming.requestStart;
  //       const throughput =
  //         navigationTiming.encodedBodySize /
  //           (navigationTiming.responseEnd - navigationTiming.responseStart) ||
  //         0;
  //       cy.log(`Total Load Time: ${pageLoadTime} s`);

  //       expect(pageLoadTime).to.be.lessThan(1.0000);

  //       cy.log(`Time to First Byte: ${ttfb} ms`);
  //       cy.log(`First Contentful Paint: ${fcp} ms`);
  //       cy.log(`Response Time: ${responseTime} ms`);
  //       cy.log(`Throughput: ${throughput}`);
  //     }
  //   });
  //   captureSreenshot();
  // });
});
