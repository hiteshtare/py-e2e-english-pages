// Import common util
import { TEST_CONFIG } from "./config";
import { captureSreenshot } from "./util/common.util";

const testDataForItems = require("../fixtures/events.json");

describe("Events", () => {
  testDataForItems.forEach((testCase: any, index: number) => {
    it(`#${index} page ${testCase.label} should have Page Load Time less than ${TEST_CONFIG.maximumPageLoadTime} seconds`, () => {
      cy.visit(`${testCase.url}`);
      cy.window().then((win) => {
        const [navigationTiming] = win.performance.getEntriesByType(
          "navigation"
        ) as PerformanceNavigationTiming[];
        if (navigationTiming) {
          const pageLoadTime = +(
            (navigationTiming.loadEventEnd - navigationTiming.startTime) /
            1000
          ).toFixed(4);
          cy.log(`Total Load Time: ${pageLoadTime} s`);
          expect(pageLoadTime).to.be.lessThan(TEST_CONFIG.maximumPageLoadTime);
        }
      });
      captureSreenshot();
    });
  });
});
