const { test } = require('../support')

test.beforeEach(async ({ page }) => {
    await page.loginPage.visit()
})

test('should login with admin credentials', async ({ page }) => {
    await page.loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123') 
    await page.moviesPage.isLoggedIn()
})

test('should not login with invalid email', async ({ page }) => {
    await page.loginPage.submitLoginForm('invalid@zombieplus.com', 'invalid123') 
    const message = "Ocorreu um erro ao tentar efetuar o login"
    await page.toast.containText(message)
})

test('should not login with invalid email format', async ({ page }) => {
    await page.loginPage.submitLoginForm('invalid-email', 'pwd123') 
    await page.loginPage.alertHaveText('Email incorreto')
})

test('should not login with invalid password', async ({ page }) => {
    await page.loginPage.submitLoginForm('admin@zombieplus.com', 'invalid123') 
    const message = "Ocorreu um erro ao tentar efetuar o login"
    await page.toast.containText(message)
})

test('should not login with blank email', async ({ page }) => {
    await page.loginPage.submitLoginForm('', 'pwd123') 
    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('should not login with blank password', async ({ page }) => {
    await page.loginPage.submitLoginForm('admin@zombieplus.com', '') 
    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('should not login with blank email and password', async ({ page }) => {
    await page.loginPage.submitLoginForm('', '') 
    await page.loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
