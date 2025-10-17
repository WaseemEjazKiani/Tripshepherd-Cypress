import { loginIfNeeded } from '../support/utils/utils'

describe('Smoke Testing Unit', () => {

  it.skip('should open the website, verify the title, and handle login state', () => {
    cy.viewport(1920, 1080)
    loginIfNeeded()
  })

  it('should click Experiences and run its logic', () => {
    loginIfNeeded()
    //   cy.get('nav a').contains('Home').should('be.visible').click({ force: true });
    cy.get('nav a').contains('Experiences').should('be.visible').click({ force: true });
    //Experience Handing should be visible
    cy.get("h1.text-secondary.text-2xl.lg\\:text-3xl.font-semibold").should('be.visible').and('contain.text', 'Experiences')
    // three buttons of All Booked and Saved should be visible + All Button should be active
    cy.contains('button', 'All').should('be.visible').and('have.class', 'bg-secondary').and('have.class', 'text-black')
    cy.contains('button', 'Booked').should('be.visible')
    cy.contains('button', 'Saved').should('be.visible')

    cy.contains('h2', 'Booked Experiences').parent().within(() => {
        cy.contains('button', 'See all').should('be.visible').click()
      })
    cy.contains('button', 'Booked').should('be.visible').and('have.class', 'bg-secondary').and('have.class', 'text-black')

    //Move Back to all tab
    cy.contains('button', 'All').should('be.visible').click()

cy.contains('h2', 'Saved Experiences')
  .parent()
  .within(() => {
    cy.contains('button', 'See all')
      .scrollIntoView()           // 🔹 scrolls the button into view
      .should('be.visible')       // ensure it's visible
      .and('have.text', 'See all')
      .click()                    // now safely click it
  })

    // cy.contains('button', 'Booked').should('be.visible').and('have.class', 'bg-secondary').and('have.class', 'text-black')



  });

  return
  it('should click Create and run its logic', () => {
    loginIfNeeded()
    cy.get('nav a').contains('Create').should('be.visible').click({ force: true });
    cy.log('Clicked on Create');
  });

  it('should click Search and run its logic', () => {
    loginIfNeeded()
    cy.get('nav a').contains('Search').should('be.visible').click({ force: true });
    cy.log('Clicked on Search');
    // 🔹 Future logic for Search page
    // e.g., cy.url().should('include', '/search');
  });

  it('should click Profile and run its logic', () => {
    loginIfNeeded()
    cy.get('nav a').contains('Profile').should('be.visible').click({ force: true });
    cy.log('Clicked on Profile');
    // 🔹 Future logic for Profile page
    // e.g., cy.url().should('include', '/profile');
  });

})

