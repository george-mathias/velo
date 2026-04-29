// PascalCase
// camelCase
// snake_case
// kebab-case

import { Page } from '@playwright/test'

export class OrderLookupPage {
    constructor(private page: Page) {}
  
    async buscarPedido(code: string) {
      await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
      await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }
}