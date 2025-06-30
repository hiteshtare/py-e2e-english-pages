export const TEST_CONFIG = {
  //WPMLs
  buttonWPMLHindi: ".wpml-ls-item-hi",
  buttonWPMLTamil: ".wpml-ls-item-ta",
  buttonWPMLTelugu: ".wpml-ls-item-te",
  //Global settings
  captureScreenshotFor: 'viewport',
  waitForScreenshot: 2000,
  //Test suit wise
  digitalSampler: {
    //old - "https://yssofindia.org/digitalSamplers/"
    link: "https://wsfb.yssofindia.org/digitalsamplers/",
    skipOpen3DIssueAndTakeScreenshot: false,
  },
  productPreview: {
    //old - "https://yssofindia.org/wp-content/uploads/preview/"
    link: "https://wsfb.yssofindia.org/product-preview/" ,
    skipOpen3DIssueAndTakeScreenshot: false,
  },
  bookstorePreview: {
    buttonEnglish: ":nth-child(1) > .value > .iconic-was-swatches > :nth-child(1) > .iconic-was-swatch",
    buttonHindi: ":nth-child(1) > .value > .iconic-was-swatches > :nth-child(2) > .iconic-was-swatch",
    buttonBengali: ":nth-child(1) > .value > .iconic-was-swatches > :nth-child(3) > .iconic-was-swatch",
    //old - "https://yssofindia.org/wp-content/uploads/preview/"
    link: "https://wsfb.yssofindia.org/product-preview/" ,
    skipOpenPDFAndTakeScreenshot: false,
  } 
};
