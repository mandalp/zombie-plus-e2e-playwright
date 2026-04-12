const { expect } = require('@playwright/test')

export class Leads {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/');
    }

    async visitLeadsAdmin() {
        await this.page.goto('/admin/leads')
        await this.page.waitForLoadState('networkidle')
    }

    async tableHave(lead) {
        const row = this.page
            .locator('tbody tr')
            .filter({ hasText: lead.name })
            .filter({ hasText: lead.email })

        await expect(row).toBeVisible()
    }

    async searchLead(target) {
        await this.visitLeadsAdmin()
        await this.page.getByPlaceholder('Busque pelo email')
            .fill(target)

        await this.page.click('.actions button')
    }

    async noSearchResults(text) {
        await expect(this.page.getByText(text)).toBeVisible()
    }

    async openLeadModal() {
        //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
        //await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {

        await this.page.locator('#name').fill(name)
        await this.page.locator('input[name=email]').fill(email)
        // await this.page.getbyPlaceholder('Informe seu nome').fill('John Doe')
        // locator por placeholder: input[placeholder="Informe seu nome"]

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
        // await this.page.getByText('Quero entrar na fila!').click()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async removeLead(name) {
        await this.visitLeadsAdmin()
        await this.page.getByRole('row', {name: name}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}