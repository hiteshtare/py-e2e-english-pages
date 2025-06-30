import { ProductPages } from "./pages/product.page";
import { captureSreenshot } from "./util/common.util";

// Import custom modules
const itemPages = new ProductPages();

// using baseURL
const testDataForItems = require("../fixtures/existing_products_url.json");

const baseUrl = Cypress.config("baseUrl");

beforeEach(function () {
 // Define and Encode the authentication string
        const authString = `yssdev:Jaiguru@123!`;
        const encodedAuth = Buffer.from(authString).toString('base64')
        const authorizedMsg = "Congratulations! You must have the proper credentials"

        // Preparing to intercept the /basic_auth request and add the auth header once we click on login
        cy.intercept('GET', '**', (req) => {
            req.headers['authorization'] = `Basic ${encodedAuth}`
        }).as('basicAuth')
        cy.intercept('POST', '**', (req) => {
            req.headers['authorization'] = `Basic ${encodedAuth}`
        }).as('basicAuth')

})

describe("Language first & Format second test for Books products ", () => {
      it(`#${1} Centre link: should give 200 OK status`, () => {

        // cy.visit(`/product/god-alone`);
        // cy.get('.elementor-element-6277a59 > .elementor-widget-container > .elementor-heading-title').should("include.text", "Language");

        // cy.visit(`/product/how-to-change-others`);
        cy.visit(`/product/autobiography-of-a-yogi`);
        cy.get(':nth-child(1) > .label > label > .iconic-was-attr-label-text').should("include.text", "Language");

        // cy.visit(`/product/god-alone`);
        // cy.get('.elementor-element-6277a59 > .elementor-widget-container > .elementor-heading-title').should("include.text", "Language");

        captureSreenshot();
  });

//  testDataForItems.forEach((testCase: any, index: number) => {
//       it(`#${index + 1} Centre link: ${
//         testCase.match_url
//       } should give 200 OK status`, () => {
//         cy.visit(`${testCase.match_url}`);

//         const fullURL = `${baseUrl}${testCase.match_url}`;
//         cy.log(`#${index + 1} Centre with link: ${fullURL}`);

//         cy.request("HEAD", testCase.match_url).its("status").should("eq", 200);

//         captureSreenshot();
//       });
//   });
});
