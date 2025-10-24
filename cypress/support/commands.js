Cypress.Commands.add('clickIfVisible', (selector, options = {}) => {
  cy.get('body').then(($body) => {
    const $element = $body.find(selector);
    if ($element.length > 0 && $element.is(':visible')) {
      cy.wrap($element).click(options);
      cy.log(`✅ Clicked element: ${selector}`);
    } else {
      cy.log(`⚠️ Element not found or not visible: ${selector}`);
    }
  });
});


// Reusable command to select a duration
Cypress.Commands.add('selectDuration', (value) => {
  cy.get('.absolute.z-10 ul li')         // get all list items
    .contains(new RegExp(`^${value}$`))  // match exact text
    .should('be.visible')
    .click();
});



