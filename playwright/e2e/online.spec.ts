import { test, expect } from '@playwright/test'

test('web app deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page).toHaveTitle(/Velô by Papito/)
})




/* para abrir o codegen do playwright, basta rodar o comando no terminal
  yarn playwright codegen http://localhost:5173/ 
*/
