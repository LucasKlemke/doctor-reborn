// cypress/e2e/registro.cy.js
describe('Fluxo de Registro', () => {
  let emailCriado = ''

  it('Usuário consegue se registrar', () => {
    const nome = 'Usuário Teste'
    const senha = 'senha1234'
    emailCriado = `testeemail@teste.com`
    const idade = '25'
    const roleValue = 'father' // ou 'mother', 'other', conforme desejar

    cy.visit('/register')

    cy.get('#name').type(nome)
    cy.get('#email').type(emailCriado)
    cy.get('#age').type(idade)

    // Abre o select
    cy.get('#role').click({ force: true })

    // Seleciona o item pelo texto visível (ajuste conforme seu projeto)
    cy.contains('[role="option"]', 'Pai').click()

    cy.get('#password').type(senha)
    cy.get('#confirmPassword').type(senha)

    cy.get('button[type="submit"]').click()

    // Aguarda o redirecionamento (ajuste para onde seu app leva o usuário)
    cy.url().should('not.include', '/register')
    // Ajuste o texto abaixo para o que aparece após registro bem-sucedido
    cy.contains('login').should('exist')
  })

  after(() => {
    // Supondo que exista uma rota DELETE /api/users/email
    cy.request({
      method: 'DELETE',
      url: `/api/user/${emailCriado}`,
      failOnStatusCode: false, // Em caso do teste rodar com email que não existe, não quebra
    })
  })
})
