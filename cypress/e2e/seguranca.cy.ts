describe('Proteção de rotas', () => {
  it('Deve redirecionar para login ao acessar rota protegida sem autenticação', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/signin')
  })
})
