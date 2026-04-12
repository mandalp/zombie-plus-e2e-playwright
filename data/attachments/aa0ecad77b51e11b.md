# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/leads.spec.js >> Leads - admin management >> should show no results when searching for a lead that does not exist
- Location: tests/e2e/leads.spec.js:100:5

# Error details

```
Error: page.waitForLoadState: Test ended.
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test')
  2  | 
  3  | export class Leads {
  4  | 
  5  |     constructor(page) {
  6  |         this.page = page
  7  |     }
  8  | 
  9  |     async visit() {
  10 |         await this.page.goto('/');
  11 |     }
  12 | 
  13 |     async visitLeadsAdmin() {
  14 |         await this.page.goto('/admin/leads')
> 15 |         await this.page.waitForLoadState('networkidle')
     |                         ^ Error: page.waitForLoadState: Test ended.
  16 |     }
  17 | 
  18 |     async tableHave(lead) {
  19 |         const row = this.page
  20 |             .locator('tbody tr')
  21 |             .filter({ hasText: lead.name })
  22 |             .filter({ hasText: lead.email })
  23 | 
  24 |         await expect(row).toBeVisible()
  25 |     }
  26 | 
  27 |     async searchLead(target) {
  28 |         await this.visitLeadsAdmin()
  29 |         await this.page.getByPlaceholder('Busque pelo email')
  30 |             .fill(target)
  31 | 
  32 |         await this.page.click('.actions button')
  33 |     }
  34 | 
  35 |     async noSearchResults(text) {
  36 |         await expect(this.page.getByText(text)).toBeVisible()
  37 |     }
  38 | 
  39 |     async openLeadModal() {
  40 |         //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  41 |         //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()
  42 |         await this.page.getByRole('button', { name: /Aperte o play/ }).click()
  43 |         await expect(
  44 |             this.page.getByTestId('modal').getByRole('heading')
  45 |         ).toHaveText('Fila de espera')
  46 |     }
  47 | 
  48 |     async submitLeadForm(name, email) {
  49 | 
  50 |         await this.page.locator('#name').fill(name)
  51 |         await this.page.locator('input[name=email]').fill(email)
  52 |         // await this.page.getbyPlaceholder('Informe seu nome').fill('John Doe')
  53 |         // locator por placeholder: input[placeholder="Informe seu nome"]
  54 | 
  55 |         await this.page.getByTestId('modal')
  56 |             .getByText('Quero entrar na fila!').click()
  57 |         // await this.page.getByText('Quero entrar na fila!').click()
  58 |     }
  59 | 
  60 |     async alertHaveText(target) {
  61 |         await expect(this.page.locator('.alert')).toHaveText(target)
  62 |     }
  63 | 
  64 |     async removeLead(name) {
  65 |         await this.visitLeadsAdmin()
  66 |         await this.page.getByRole('row', {name: name}).getByRole('button').click()
  67 |         await this.page.click('.confirm-removal')
  68 |     }
  69 | }
```