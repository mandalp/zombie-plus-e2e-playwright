const { test } = require('../support')
const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require(`../support/database`)

test.beforeAll(async () => {
    await executeSQL('DELETE FROM tvshows')
})

test('should register a new tv show', async ({ page }) => {
    const tvshow = data.create
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.tvshows.createTVShow(tvshow)
    await page.dialog.containText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)
})

test('should not register a duplicate tv show', async ({ page, request }) => {
    const tvshow = data.duplicate    
    await request.api.postTVShow(tvshow)

    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.tvshows.createTVShow(tvshow)
    await page.dialog.containText(`O título '${tvshow.title}' já consta em nosso catálogo.`)
})

test('should not register a tv show with blank fields', async ({ page }) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.tvshows.goForm()
    await page.tvshows.submit()
    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'])
})

test('should remove a tv show from the catalog', async ({ page, request }) => {
    const tvshow = data.to_remove
    await request.api.postTVShow(tvshow)

    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.tvshows.removeTVShow(tvshow.title)
    await page.dialog.containText(`Série removida com sucesso.`)
})

test('should do a search with no results', async ({ page }) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')
    await page.tvshows.searchTVShow('Série que não existe')
    await page.tvshows.noSearchResults('Nenhum registro encontrado!')
})

test('should verify if tv show is featured', async ({ page, request }) => {
    const tvshow = data.featured
    await request.api.postTVShow(tvshow)
    await page.tvshows.checkFeatured(tvshow.title)
})

test('should do a search for name "zombie"', async ({ page, request }) => {
    const tvshows = data.search

    for (const tvshow of tvshows.data) {
        await request.api.postTVShow(tvshow)
    }

    await page.login.doLogin('admin@zombieplus.com', 'pwd123')
    await page.tvshows.searchTVShow(tvshows.input)
    await page.tvshows.tableHave(tvshows.outputs)
})

test('sould verify if seasons field is numeric', async ({ page }) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')
    
    await page.tvshows.goForm()
    await page.tvshows.fillSeasons('abc')
    await page.tvshows.submit()
    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'])
})
