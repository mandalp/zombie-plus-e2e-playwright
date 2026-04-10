const { expect } = require('@playwright/test')

export class Dialog {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const element = this.page.locator('.swal2-html-container')
        await expect(element).toContainText(message)
    }
}