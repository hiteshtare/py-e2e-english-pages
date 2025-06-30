// Import common util
import {
  checkIfElementExist,
  checkStatus200ForLink,
} from "./util/common.util";

import { GuestLoginPages } from "./pages/guestLogin.page";

const guestLoginPages = new GuestLoginPages();

describe.skip("Guest Login", () => {
  beforeEach(() => {
    cy.visit("bookstore");
  });

  it("should have open Bookstore Page then select AOY and give 200 OK status", () => {
    checkStatus200ForLink(guestLoginPages.btnAOYproduct);
  });

  it("should open AOY Product page", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.url().should("include", guestLoginPages.linkAOYproduct);
  });

  it("AOY Product page should have Add to Cart button", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    checkIfElementExist(guestLoginPages.btnAddToCart);
  });

  it("should open Cart page", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    cy.url().should("include", guestLoginPages.linkCart);
  });

  it("Cart page should have Proceed to Checkout button", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    checkIfElementExist(guestLoginPages.btnCheckout);
  });

  it("should open Checkout page", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    cy.get(guestLoginPages.btnCheckout).click();

    cy.url().should("include", guestLoginPages.linkCheckout);
  });

  it("Checkout page should have Pay Now button", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    cy.get(guestLoginPages.btnCheckout).click();

    checkIfElementExist(guestLoginPages.btnPayNow);
  });

  it("Checkout page should fire validation, if input fields are empty", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    cy.get(guestLoginPages.btnCheckout).click();

    cy.wait(1000).get(guestLoginPages.btnPayNow).click();
  });

  it("Checkout page should proceed further if form is valid", () => {
    cy.get(guestLoginPages.btnAOYproduct).click();

    cy.get(guestLoginPages.btnAddToCart).click();

    cy.get(guestLoginPages.btnCheckout).click();

    cy.get("#billing_email").type(Cypress.env("BILLING_EMAIL"));
    cy.get("#billing_phone").type(Cypress.env("BILLING_PHONE"));
    cy.get("#billing_first_name").type(Cypress.env("BILLING_FIRST_NAME"));
    cy.get("#billing_last_name").type(Cypress.env("BILLING_LAST_NAME"));
    cy.get("#billing_address_1").type(Cypress.env("BILLING_ADDR1"));
    cy.get("#billing_city").type(Cypress.env("BILLING_CITY"));
    //Set Dropdown value on Form
    cy.get("#billing_state").select(Cypress.env("BILLING_STATE"), {
      force: true,
    });
    cy.get("#billing_postcode").type(Cypress.env("BILLING_POSTCODE"));

    cy.wait(1000).get(guestLoginPages.btnPayNow).click();
  });

  it.only("Checkout page should proceed further if form is valid", () => {
    cy.get(guestLoginPages.btnAOYproduct).should('be.visible').click();

    cy.get(guestLoginPages.btnAddToCart).should('be.visible').click();

    cy.get(guestLoginPages.btnCheckout).should('be.visible').click();

    cy.get("#billing_email").type(Cypress.env("BILLING_EMAIL"));
    cy.get("#billing_phone").type(Cypress.env("BILLING_PHONE"));
    cy.get("#billing_first_name").type(Cypress.env("BILLING_FIRST_NAME"));
    cy.get("#billing_last_name").type(Cypress.env("BILLING_LAST_NAME"));
    cy.get("#billing_address_1").type(Cypress.env("BILLING_ADDR1"));
    cy.get("#billing_city").type(Cypress.env("BILLING_CITY"));
    //Set Dropdown value on Form
    cy.get("#billing_state").select(Cypress.env("BILLING_STATE"), {
      force: true,
    });
    cy.get("#billing_postcode").type(Cypress.env("BILLING_POSTCODE"));

    //Click on Pay Now button from Form
    cy.get(guestLoginPages.btnPayNow).click();

    //iFrame
    cy.frameLoaded(guestLoginPages.iframe_selector);

    //RazorPay - Click on Netbanking button
    cy.iframe().find(guestLoginPages.iframe_btnNetbanking).should('be.visible').click();

    //RazorPay - Click on ICICI from the banks  
    cy.iframe().find(guestLoginPages.iframe_btnICICIBank).should('be.visible').click();

    //RazorPay - Click on Pay Now button
    cy.iframe().find(guestLoginPages.iframe_btnPayNow).should('be.visible').wait(1000).click();

    //RazorPay - Click on green Success button on Demo bank page
    // cy.get(".success").should('be.visible');
    });
});
