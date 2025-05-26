describe('CRUD de Bebês', () => {
  beforeEach(() => {
    cy.visit('/signin')
    cy.get('input[type="email"]').type('usuario@cypress.com')
    cy.get('input[type="password"]').type('senha1234')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/signin')
    cy.contains('Olá').should('exist')
  })

  it('Deve criar um bebê', () => {
    cy.visit('/dashboard')
    cy.contains('Adicionar Bebê').click()

    cy.get('input[placeholder="Nome do bebê"]').type('Baby Teste')
    cy.get('input[type="date"]').type('2023-01-01')

    // Selecionar sexo (select shadcn/ui)
    cy.contains('button', 'Selecione').first().click({ force: true })
    cy.get('div[role="listbox"]').contains('Masculino').click()

    // Selecionar marca (select shadcn/ui)
    // cy.contains('button', 'Marca').first().click({ force: true })
    // cy.get('div[role="listbox"]').contains('SkyNet').click()

    cy.get('input[placeholder="Peso"]').type('3.5')
    cy.get('input[placeholder="Altura"]').type('50')
    // Observações é opcional, então pode deixar em branco ou preencher:
    // cy.get('textarea[placeholder="Observações (opcional)"]').type('Observação de teste')

    // Clica em adicionar (o texto depende do botão, confira se é 'Adicionar')
    cy.get('button[type="submit"]')
      .contains(/Adicionar|adicionando/i)
      .click()

    // Aguarda sucesso (ajuste mensagem se necessário)
    cy.contains('Novo bebê adicionado com sucesso!').should('exist')
    cy.contains('Baby Teste').should('exist')
  })

  it('Deve editar um bebê', () => {
    cy.visit('/bebes') // ajuste a rota conforme sua aplicação

    // Encontra o card do bebê "Baby Teste" pelo título (h3)
    cy.contains('h3', 'Baby Teste')
      .parents('.p-6') // classe do Card, ajusta se necessário
      .within(() => {
        // Clica no botão de editar
        cy.get('button').contains('svg').next().click({ force: true }) // pega o EditBabyFormButton, pode ser só cy.get('button').eq(1).click({force:true}) se for o 2° botão
      })

    // Troca o nome do bebê no modal de edição
    cy.get('input[placeholder="Nome do bebê"]').clear().type('Baby Editado')
    // Você pode editar outros campos, se quiser
    // cy.get('input[type="date"]').clear().type('2023-02-01')

    cy.get('button[type="submit"]').contains('Atualizar').click()

    // Confirma se foi atualizado
    cy.contains('Baby Editado').should('exist')
  })

  it('Deve deletar um bebê', () => {
    cy.visit('/dashboard')
    cy.contains('Baby Editado').parents('[data-baby-id]').find('button').contains('Deletar').click()
    // Confirme o modal de deleção, se existir
    cy.contains('Confirmar').click()
    cy.contains('Baby Editado').should('not.exist')
  })
})
