const { test } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require(`../support/database`)

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})

test('should register a new movie', async ({ page }) => {
    const movie = data.create
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.movies.createMovie(movie)
    await page.dialog.containText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('should not register a duplicate movie', async ({ page, request }) => {
    const movie = data.duplicate
    await request.api.postMovie(movie)

    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.movies.createMovie(movie)
    await page.dialog.containText(`O título '${movie.title}' já consta em nosso catálogo.`)
})

test('should not register a movie with blank fields', async ({ page }) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.movies.goForm()
    await page.movies.submit()
    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'])
})

test('should remove a movie from the catalog', async ({ page, request }) => {
    const movie = data.remove
    await request.api.postMovie(movie)

    await page.login.doLogin('admin@zombieplus.com', 'pwd123')

    await page.movies.removeMovie(movie.title)
    await page.dialog.containText(`Filme removido com sucesso.`)
})

test('should do a search with no results', async ({ page }) => {
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')
    await page.movies.searchMovie('Filme que não existe')
    await page.movies.noSearchResults('Nenhum registro encontrado!')
})

test('should verify if the movie is featured', async ({ page, request }) => {
    const movie = data.featured
    await request.api.postMovie(movie)
    await page.movies.checkFeatured(movie.title)
})

test('should do a search for the name "morto"', async ({ page, request }) => {
    const movies = data.search

    movies.data.forEach(async (m) => {
        await request.api.postMovie(m)
    })
    
    await page.login.doLogin('admin@zombieplus.com', 'pwd123')
    await page.movies.searchMovie(movies.input)

    await page.movies.tableHave(movies.outputs)
})