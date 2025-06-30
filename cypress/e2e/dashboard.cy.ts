// Import common util
import {
  captureSreenshot,
  checkIfElementExist,
  checkIfElementNotExist,
  checkStatus200ForLink,
  getElementLink,
  getElementText,
} from "./util/common.util";

import { DashboardPages } from "./pages/dashboard.page";

const dashboardPages = new DashboardPages();

describe.skip("Dashboard page", () => {
  beforeEach(() => {
    cy.visit("/bookstore");
  });

  describe("How-to-live Booklets Boxed Set section", () => {
    it("Know more button - should be clickable", () => {
      cy.get(dashboardPages.btnKnowMore).click();
    });

    it("Know more button - give 200 OK status", () => {
      checkStatus200ForLink(dashboardPages.btnKnowMore);
    });
  });
});
