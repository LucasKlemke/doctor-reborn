import '@cypress/code-coverage/support'
describe('Login', () => {
  it('Deve permitir login com usuário válido', () => {
    cy.visit('/signin')
    cy.get('input[type="email"]').type('usuario@cypress.com') // use um usuário real de teste
    cy.get('input[type="password"]').type('senha1234')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/signin')
    cy.contains('Olá').should('exist')
  })
})
