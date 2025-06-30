// Import custom config
import { TEST_CONFIG } from "../config";

// Import custom modules
import { captureSreenshot } from "../util/common.util";

export class FilterPages {

  divFilterMenuText = "Filter by:";
  divCarousal = ".swiper-wrapper.elementor-slides > div";
  
  //Dropdown
  bookDropdownCategories = ".elementor-element-339adf4 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  bookDropdownAuthors = " .elementor-element-339adf4 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  bookDropdownLanguages = ".elementor-element-a5e8b3a > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  bookDropdownFormats = ".elementor-element-3ead66f > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  //Dropdown

  audioDropdownCategories = ".elementor-element-9d3a260 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  audioDropdownSpeakers = ".elementor-element-7cbb562 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";
  audioDropdownFormats = ".elementor-element-ed3bf31 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-select > .jet-select > .jet-select__control";

  //Checkboxlist
  checkboxlistCategory = '.elementor-element-f4e1846 > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-checkboxes > .jet-filter-items-dropdown > .jet-filter-items-dropdown__label';
  checkboxlistSpeaker = '.jet-smart-filters-color-image > .jet-filter-items-dropdown > .jet-filter-items-dropdown__label';
  checkboxlistLanguage = '.elementor-element-b5b9f6e > .elementor-widget-wrap > .elementor-element > .elementor-widget-container > .jet-smart-filters-checkboxes > .jet-filter-items-dropdown > .jet-filter-items-dropdown__label';
  //Checkboxlist

  carousalItem = '.swiper-slide-inner';

  selectDropdownOptionByValue(value: string) {
    cy.get(this.bookDropdownCategories).select(value);

    captureSreenshot(3000);
  }
}