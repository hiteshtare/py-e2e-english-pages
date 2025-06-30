// Import custom config
import { TEST_CONFIG } from "../config";

// Import custom modules
import { captureSreenshot } from "../util/common.util";

export class GuestLoginPages {
  //AOY product
  btnAOYproduct =
    ".jet-listing-dynamic-post-177392 > .elementor > .elementor-section > .elementor-container > .elementor-column > .elementor-widget-wrap > .elementor-element-49c9592 > .elementor-widget-container > .elementor-heading-title > a";
  linkAOYproduct = "product/autobiography-of-a-yogi";

  //Cart
  btnAddToCart =
    ".elementor-add-to-cart > .variations_form > .single_variation_wrap > .woocommerce-variation-add-to-cart > .single_add_to_cart_button";
  linkCart = "cart";

  //Checkout
  btnCheckout = ".checkout-button";
  linkCheckout = "checkout";

  //PayNow
  btnPayNow = "#place_order";

  //iFrame
  iframe_selector = '.razorpay-checkout-frame';

  // For Live scenario - iframe_btnNetbanking = '#nav-sidebar > div:nth-child(1) > label:nth-child(4)';
  iframe_btnNetbanking = 'button[method="netbanking"]';
  // For Live scenario - iframe_btnICICIBank = '#main-stack-container > div > div > div > div > div.flex.h-full.flex-1.flex-col.overflow-auto.bg-surface > div > div > form:nth-child(4) > div > label:nth-child(3) > div';
  iframe_btnICICIBank = '#bank-item-ICIC';
  iframe_btnPayNow = '#redesign-v15-cta';
  //iFrame

  validateNewlinkAndStatusCode200(selector: string) {
    captureSreenshot();

    //Check if href contains new link
    this.checkHrefForNewLink(selector);

    //Check if new link is giving 200 OK response code
    this.checkStatus200ForNewLink(selector);
  }

  checkHrefForNewLink(selector: string) {
    cy.get(selector)
      .should("have.attr", "href")
      .and("include", TEST_CONFIG.productPreview.link);
  }

  checkStatus200ForNewLink(selector: string) {
    cy.get(selector).then((link) => {
      cy.request("HEAD", link.prop("href")).its("status").should("eq", 200);

      cy.log(`3DIssue link: ${link.prop("href")}`);

      //Open this new link and take screenshot
      if (!TEST_CONFIG.productPreview.skipOpen3DIssueAndTakeScreenshot) {
        this.open3DIssueAndTakeScreenshot(link);
      }
    });
  }

  open3DIssueAndTakeScreenshot(link: JQuery<Element>) {
    // cy.visit(link.prop("href")).wait(3000).screenshot(`3DIssue: ${Cypress.currentTest.title}`,{ overwrite: true });

    cy.visit(link.prop("href"))
      .get(".a44")
      .wait(TEST_CONFIG.waitForScreenshot)
      .screenshot();
  }
}
