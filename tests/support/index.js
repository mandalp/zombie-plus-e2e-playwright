const { test: base, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['loginPage'] = new LoginPage(page)
        context['moviesPage'] = new MoviesPage(page)
        context['landingPage'] = new LandingPage(page)
        context['toast'] = new Toast(page)
        await use(context)
    }
})

export { test, expect }