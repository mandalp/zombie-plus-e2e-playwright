const { expect } = require('@playwright/test')

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async createMovie(movie) {
        await this.goForm()
        // await this.page.getByLabel('Título do Filme').fill(title)

        await this.page.locator('#title').fill(movie.title)
        await this.page.locator('#overview').fill(movie.overview)
        await this.page.locator('#select_company_id .react-select__indicator').click()
        // const html = await this.page.content()
        // console.log(html)

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year.toString() })
            .click()

        await this.page.locator('input[name=cover]').setInputFiles(`tests/support/fixtures${movie.cover}`)

        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async removeMovie(title) {
        //td[text()="O Exorcista"]/..//button
        await this.page.getByRole('row', { name: title }).locator('button.request-removal').click()
        // await this.page
        //     .locator('tr', { hasText: title })
        //     .locator('button.request-removal')
        //     .click()

        await this.page.click('.confirm-removal')
    }

    async searchMovie(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }
}
