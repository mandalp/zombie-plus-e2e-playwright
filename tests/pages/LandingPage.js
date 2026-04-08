const { expect } = require('@playwright/test')

export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/');
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
}