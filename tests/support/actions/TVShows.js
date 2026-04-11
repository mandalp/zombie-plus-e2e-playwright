const { expect } = require('@playwright/test')

export class TVShows {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.goto('/admin/tvshows/register')
    }
    
    async goList() {
        await this.page.getByRole('link', { name: 'Séries de TV' }).click()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.getByRole('heading', { name: 'Séries de TV' })).toBeVisible()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async fillSeasons(seasons) {
        await this.page.locator('#seasons').fill(seasons)
    }

    async createTVShow(tvshow) {
        await this.goForm()

        await this.page.locator('#title').fill(tvshow.title)
        await this.page.locator('#overview').fill(tvshow.overview)
        await this.page.locator('#select_company_id .react-select__control').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year.toString() })
            .click()

        await this.page.locator('#seasons').fill(tvshow.season.toString())

        await this.page.locator('input[name=cover]').setInputFiles(`tests/support/fixtures/covers/tvshows/${tvshow.cover.split('/').pop()}`)

        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async removeTVShow(title) {
        await this.goList()
        await this.page.getByRole('row', {name: title}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }

    async searchTVShow(target) {
        await this.goList()
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async noSearchResults(text) {
        await expect(this.page.getByText(text)).toBeVisible()
    }

    async checkFeatured(title) {
        await this.page.goto('/')
        const destaques = this.page.locator('section:has(h2:has-text("Destaques"))')

        const featuredImage = destaques.getByRole('img', { name: title })

        await expect(featuredImage).toHaveCount(1)
        await expect(featuredImage).toBeVisible()
    }
}
