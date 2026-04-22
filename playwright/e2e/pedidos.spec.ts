import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido', async ({ page }) => {

  const orderNumber = "VLO-IJJFFY"

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido'}).click()

  // Assert
  /* meu código */
  // await expect(page.getByTestId(`order-result-${orderNumber}`)).toBeVisible()

  // await expect(page.getByTestId(`order-result-${orderNumber}`).locator('p', { hasText: /^Pedido$/ })).toBeVisible()
  // await expect(page.getByTestId(`order-result-${orderNumber}`).locator('p', { hasText: orderNumber })).toBeVisible()
  // await expect(page.getByTestId(`order-result-${orderNumber}`).locator('p', { hasText: orderNumber })).toContainText(orderNumber)

  // await expect(page.getByTestId(`order-result-${orderNumber}`).locator('div', { hasText: /^APROVADO$/ })).toBeVisible()
  // await expect(page.getByTestId(`order-result-${orderNumber}`).locator('div', { hasText: /^APROVADO$/ })).toContainText('APROVADO')

  /* Código do Papito */
  const orderCode = page.locator(`//p[text()="Pedido"]/..//p[text()="${orderNumber}"]`)
  await expect(orderCode).toBeVisible( { timeout: 10_000 } )

  const containerPedido = page.getByRole('paragraph')
    .filter( { hasText: /^Pedido$/ } )
    .locator('..')  // sobe um nível igual ao xpath

  await expect(containerPedido).toContainText(`${orderNumber}`)

  await expect(page.getByText('APROVADO')).toBeVisible()
})