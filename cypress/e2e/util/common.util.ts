// Import custom config
import { TEST_CONFIG } from "../config";

export function openHindiPage() {
  cy.get(TEST_CONFIG.buttonWPMLHindi).click();
}

export function openTamilPage() {
  cy.get(TEST_CONFIG.buttonWPMLTamil).click();
}

export function openTeluguPage() {
  cy.get(TEST_CONFIG.buttonWPMLTelugu).click();
}

export function checkIfElementNotVisible(selector: string) {
  cy.get(selector).should("not.be.visible");

  captureSreenshot(500);
}

export function checkIfElementIsVisible(selector: string) {
  cy.get(selector).should("be.visible");

  captureSreenshot(500);
}

export function checkIfElementIsVisible_Contains(selector: string) {
  cy.contains(selector).should("be.visible");

  captureSreenshot(500);
}

export function checkIfElementNotExist_Contains(selector: string) {
  cy.contains(selector).should("not.exist");

  captureSreenshot(500);
}

export function checkIfElementExist(selector: string, takeScreenshot = false) {
  if (takeScreenshot) {
    captureSreenshot(500);
  }

  return cy.get(selector).should("exist");
}

export function checkIfElementNotExist(selector: string) {
  return cy.get(selector).should("not.exist");
}

export function checkIfElementIsClickable(
  selector: string,
  takeScreenshot = false
) {
  cy.get(selector).click();

  if (takeScreenshot) {
    captureSreenshot(500);
  }
}

export function captureSreenshot(seconds = 0) {
  cy.wait(seconds).screenshot({ capture: "viewport" });
}

export function checkStatus200ForLink(selector: string) {
  cy.get(selector).then((link) => {
    cy.request("HEAD", link.prop("href")).its("status").should("eq", 200);

    cy.log(`link: ${link.prop("href")}`);

    //Open this new link and take screenshot
    // if (!TEST_CONFIG.bookstorePreview.skipOpenPDFAndTakeScreenshot){
    //   this.openPDFAndTakeScreenshot(link);
    // }
  });
}

export async function getElementText(selector: string) {
  let text: string = await new Cypress.Promise<string>((resolve, reject) => {
    if (checkIfElementExist(selector))
      cy.get(selector)
        .invoke("text")
        .then((text) => {
          resolve(text.toString());
        });
    else {
      reject("");
    }
  });
  return text;
}

export async function getElementLink(selector: string) {
  let link: string = await new Cypress.Promise<string>((resolve) => {
    cy.get(selector).then((link) => {
      resolve(link.prop("href").toString());
    });
  });
  return link;
}