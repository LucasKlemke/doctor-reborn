describe('Responsividade', () => {
  it('Deve renderizar corretamente no mobile', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.contains('Diagnóstico Reborn Preciso e rápido').should('exist')
  })
})
