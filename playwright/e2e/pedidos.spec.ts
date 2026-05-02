import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLookupPage } from '../support/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-IJJFFY',
      status: 'APROVADO' as const,
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'George Mathias',
        email: 'mathias@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderResult(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-DOPGB6',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Trabalho',
        email: 'trabalho@apple.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderResult(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-JL8DII',
      status: 'EM_ANALISE' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Geni Valdo',
        email: 'genivaldo@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.validateOrderResult(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order)


    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

  })
})