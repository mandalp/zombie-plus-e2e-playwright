const { test } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require(`../support/database`)

test.beforeEach(async ({ page }) => {
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123') 
    await page.moviesPage.isLoggedIn()
})

test('should register a new movie', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)
    await page.moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')
})