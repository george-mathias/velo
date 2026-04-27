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

test('It should return an error message when submitting an invalid order number', async ({ page }) => {

  const orderNumber = "VLO-ABC123"
  const expectedErrorMessage = "Pedido não encontrado"
  const expectedInformationMessage = "Verifique o número do pedido e tente novamente"

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido'}).click()

  // Assert
  // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
  // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente') 

  // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 })
  // await expect(title).toBeVisible()

  // const message = page.getByText('Verifique o número do pedido e tente novamente')
  // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')

  // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
  // await expect(message).toBeVisible()

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "${expectedErrorMessage}" [level=3]
    - paragraph: ${expectedInformationMessage}
    `)

})