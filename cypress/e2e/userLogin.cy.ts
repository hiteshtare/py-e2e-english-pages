import { UserLoginPages } from "./pages/userLogin.page";

const userLoginPages = new UserLoginPages();

describe.skip("User Login", () => {
  beforeEach(() => {
    cy.visit("bookstore");
  });

  it("Checkout page should proceed further with Valid login", () => {
    //Click on Quick links menu from the top-right
    cy.get('#mega-menu-item-186115 > [href="#"]').should("be.visible").click();

    //Click on My Account option from the dropdown
    cy.get("#mega-menu-item-209015").should("be.visible").click();

    //Click on Login Now button
    cy.contains("Login Now").should("be.visible").click();

    //Enter email and password in email input box
    cy.get("#email").type(Cypress.env("LOGIN_EMAIL"));
    cy.get("#password").type(Cypress.env("LOGIN_PASSWORD"));

    //Click on Continue button from Login form
    cy.get("#btn-login").should("be.visible").click();

    //After Login success
    cy.wait(2000).contains('Welcome').should('be.visible');

    //Navigate back to bookstore
    cy.visit('bookstore');

    cy.get(userLoginPages.btnAOYproduct).should('be.visible').click();

    cy.get(userLoginPages.btnAddToCart).should('be.visible').click();

    cy.get(userLoginPages.btnCheckout).should('be.visible').click();

    //Click on Pay Now button from Form
    cy.get(userLoginPages.btnPayNow).click();

    //iFrame
    cy.frameLoaded(userLoginPages.iframe_selector);

    //RazorPay - Click on Netbanking button
    cy.iframe().find(userLoginPages.iframe_btnNetbanking).should('be.visible').click();

    //RazorPay - Click on ICICI from the banks  
    cy.iframe().find(userLoginPages.iframe_btnICICIBank).should('be.visible').click();

    //RazorPay - Click on Pay Now button
    cy.iframe().find(userLoginPages.iframe_btnPayNow).should('be.visible').wait(1000).click();
  });
});
