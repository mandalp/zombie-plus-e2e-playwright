const { test: base, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page, 
            loginPage: new LoginPage(page),
            moviesPage: new MoviesPage(page),
            landingPage: new LandingPage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }