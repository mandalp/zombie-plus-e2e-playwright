const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')
const { executeSQL } = require(`../support/database`)

test.beforeAll(async () => {
    await executeSQL('DELETE FROM leads')
})

test.describe('Leads - public registration', () => {
    test('should register a lead in the waiting queue.', async ({ page }) => {
        const leadName = faker.person.fullName()
        const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })

        await page.leads.visit()
        await page.leads.openLeadModal()

        await page.leads.submitLeadForm(leadName, leadEmail)
        const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'

        await page.dialog.containText(message)
    })

    test('should not register when an email exists.', async ({ page, request }) => {
        const leadName = faker.person.fullName()
        const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })
        const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'

        await request.api.postLead({ name: leadName, email: leadEmail })

        await page.leads.visit()
        await page.leads.openLeadModal()

        await page.leads.submitLeadForm(leadName, leadEmail)
        await page.dialog.containText(message)
    })

    test('should not register a lead with invalid email', async ({ page }) => {
        await page.leads.visit()
        await page.leads.openLeadModal()
        await page.leads.submitLeadForm('John Doe', 'john.doe.com')
        const message = 'Email incorreto'
        await page.leads.alertHaveText(message)

    })

    test('should not register a lead with blank name', async ({ page }) => {
        await page.leads.visit()
        await page.leads.openLeadModal()
        await page.leads.submitLeadForm('', 'john.doe@example.com')
        const message = 'Campo obrigatório'

        await page.leads.alertHaveText(message)
    })

    test('should not register a lead with blank email', async ({ page }) => {
        await page.leads.visit()
        await page.leads.openLeadModal()
        await page.leads.submitLeadForm('John Doe', '')
        const message = 'Campo obrigatório'

        await page.leads.alertHaveText(message)
    })

    test('should not register a lead when all fields are blank', async ({ page }) => {
        await page.leads.visit()
        await page.leads.openLeadModal()
        await page.leads.submitLeadForm('', '')
        await page.leads.alertHaveText([
            'Campo obrigatório',
            'Campo obrigatório'
        ])
    })
})

test.describe('Leads - admin management', () => {
    test('should display a registered lead', async ({ page, request }) => {
        const leadName = faker.person.fullName()
        const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })
        await request.api.postLead({ name: leadName, email: leadEmail })
        await page.login.doLogin('admin@zombieplus.com', 'pwd123')
        await page.leads.visitLeadsAdmin()
        await page.leads.tableHave({
            name: leadName,
            email: leadEmail,
        })
    })

    test('should search lead by email', async ({ page, request }) => {
        const leadName = faker.person.fullName()
        const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })
        await request.api.postLead({ name: leadName, email: leadEmail })
        await page.login.doLogin('admin@zombieplus.com', 'pwd123')
        await page.leads.searchLead(leadEmail)
        await page.leads.tableHave({
            name: leadName,
            email: leadEmail,
        })
    })

    test('should show no results when searching for a lead that does not exist', async ({ page }) => {
        await page.login.doLogin('admin@zombieplus.com', 'pwd123')
        await page.leads.visitLeadsAdmin()
        await page.leads.searchLead('inexistente@example.com')
        await page.leads.noSearchResults('Nenhum lead encontrado!')
    })

    test('should remove a lead', async ({ page, request }) => {
        const leadName = faker.person.fullName()
        const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })
        await request.api.postLead({ name: leadName, email: leadEmail })
        await page.login.doLogin('admin@zombieplus.com', 'pwd123')
        await page.leads.visitLeadsAdmin()
        await page.leads.removeLead(leadName)
        await page.dialog.containText('Lead removido com sucesso.')
    })
})