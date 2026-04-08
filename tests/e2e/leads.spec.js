const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')

test.beforeEach(async ({ page }) => {
    await page.landingPage.visit()
    await page.landingPage.openLeadModal()
})

test('should register a lead in the waiting queue.', async ({ page }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })

    await page.landingPage.submitLeadForm(leadName, leadEmail)
    const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

    await page.toast.containText(message)
});

test('should not register when an email exists.', async ({ page, request }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email({ firstName: leadName.split(' ')[0], lastName: leadName.split(' ')[1] })
    const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

    const newLead = await request.post('http://localhost:3333/leads', {
        data: {
            name: leadName,
            email: leadEmail
        }
    })

    expect(newLead.ok()).toBeTruthy()

    await page.landingPage.submitLeadForm(leadName, leadEmail)
    await page.toast.containText(message)
});

test('should not register a lead with invalid email', async ({ page }) => {
    await page.landingPage.submitLeadForm('John Doe', 'john.doe.com')
    const message = 'Email incorreto'
    await page.landingPage.alertHaveText(message)

});

test('should not register a lead with blank name', async ({ page }) => {
    await page.landingPage.submitLeadForm('', 'john.doe@example.com')
    const message = 'Campo obrigatório'

    await page.landingPage.alertHaveText(message)
});

test('should not register a lead with blank email', async ({ page }) => {
    await page.landingPage.submitLeadForm('John Doe', '')
    const message = 'Campo obrigatório'

    await page.landingPage.alertHaveText(message)
});

test('should not register a lead when all fields are blank', async ({ page }) => {
    await page.landingPage.submitLeadForm('', '')
    await page.landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
});