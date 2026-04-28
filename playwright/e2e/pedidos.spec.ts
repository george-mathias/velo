import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'


test.describe('Consulta de Pedidos', () => {

  test.beforeEach(async ({ page }) => {

    const baseUrl = 'http://localhost:5173/'

    // Arrange
    await page.goto(baseUrl)
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  })

  test('It should display the approved order details after submitting a valid order number', async ({ page }) => {

    // Test Data
    const order = {
      orderNumber: 'VLO-IJJFFY',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'George Mathias',
        email: 'mathias@gmail.com'
      },
      payment_method: 'À Vista',
      status: 'APROVADO'
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.orderNumber)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.orderNumber}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.orderNumber}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment_method}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
  })


  test('It should display the declined order details after submitting a valid order number', async ({ page }) => {

    // Test Data
    const order = {
      orderNumber: 'VLO-DOPGB6',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Trabalho',
        email: 'trabalho@apple.com'
      },
      payment_method: 'À Vista',
      status: 'REPROVADO'
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.orderNumber)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.orderNumber}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.orderNumber}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment_method}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);
  })


  test('It should return an error message when submitting an invalid order number', async ({ page }) => {

    const orderNumber = generateOrderCode()
    const expectedErrorMessage = "Pedido não encontrado"
    const expectedInformationMessage = "Verifique o número do pedido e tente novamente"

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "${expectedErrorMessage}" [level=3]
      - paragraph: ${expectedInformationMessage}
    `)
  })
})