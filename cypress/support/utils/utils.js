export function loginIfNeeded() {
  cy.viewport(1920, 1080)
  cy.visit('https://pr-115.ddl3rcnmmz93r.amplifyapp.com/')
  cy.title().should('include', 'Discover Top Local-Led Tours')

  cy.get('button.cursor-pointer span.text-base')
    .should('be.visible')
    .then(($span) => {
      const label = $span.text().trim()

      if (label === 'Sign In') {
        cy.contains('Sign In').should('be.visible').click()
        cy.get("input[placeholder='1 (702) 123-4567']")
          .should('exist')
          .type('{backspace}')
          .type('923488189787')

        cy.contains('button', 'Continue').click()

        cy.get('input[id^="otp-input-"]').each(($el, index) => {
          cy.wrap($el).type(`${index + 1}`)
        })

        cy.contains('button', 'Continue').click()
        cy.get('.text-secondary > div:first-child img').click()
        cy.contains('span.text-base', 'Profile')
          .should('be.visible')
          .and('have.text', 'Profile')
      } else {
        cy.log('Already logged in')
      }
    })
}





 // else if (label === 'Log out') {
    //       expect(label).to.eq('Log out')
    //       cy.contains('Log out').should('be.visible').click()
    //       cy.contains('Sign In', { timeout: 10000 }).should('be.visible')

    //     } else {
    //       cy.log(`Unexpected button text: ${label}`)
    //       expect(['Sign In', 'Log out']).to.include(label)
    //     }
    //   })
