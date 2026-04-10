const { test } = require('../support')

test.beforeEach(async ({ page }) => {
    await page.login.visit()
})

test('should login with admin credentials', async ({ page }) => {
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123') 
    await page.login.isLoggedIn()
})

test('should not login with invalid email', async ({ page }) => {
    await page.login.submitLoginForm('invalid@zombieplus.com', 'invalid123') 
    const message = "Ocorreu um erro ao tentar efetuar o login"
    await page.dialog.containText(message)
})

test('should not login with invalid email format', async ({ page }) => {
    await page.login.submitLoginForm('invalid-email', 'pwd123') 
    await page.login.alertHaveText('Email incorreto')
})

test('should not login with invalid password', async ({ page }) => {
    await page.login.submitLoginForm('admin@zombieplus.com', 'invalid123') 
    const message = "Ocorreu um erro ao tentar efetuar o login"
    await page.dialog.containText(message)
})

test('should not login with blank email', async ({ page }) => {
    await page.login.submitLoginForm('', 'pwd123') 
    await page.login.alertHaveText('Campo obrigatório')
})

test('should not login with blank password', async ({ page }) => {
    await page.login.submitLoginForm('admin@zombieplus.com', '') 
    await page.login.alertHaveText('Campo obrigatório')
})

test('should not login with blank email and password', async ({ page }) => {
    await page.login.submitLoginForm('', '') 
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
