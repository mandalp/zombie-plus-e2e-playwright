const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login')
const { Movies } = require('./actions/Movies')
const { Leads } = require('./actions/Leads')
const { Dialog } = require('./actions/Components')
const { API } = require('./api')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['leads'] = new Leads(page)
        context['dialog'] = new Dialog(page)
        await use(context)
    },
    request: async ({ request }, use) => {
        const context = request
        context['api'] = new API(request)
        await context['api'].setToken()
        await use(context)
    }
})

export { test, expect }