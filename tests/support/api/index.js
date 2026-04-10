const { expect } = require('@playwright/test')

export class API {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = await JSON.parse(await response.text())
        this.token = body.token
    }

    async getCompanyByName(name) {
        const response = await this.request.get(`http://localhost:3333/companies?name=${name}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        expect(response.ok()).toBeTruthy()
        const body = await JSON.parse(await response.text())
        return body.data[0].id
    }

    async postMovie(movie) {
        const companyId = await this.getCompanyByName(movie.company)
        return this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                release_year: movie.release_year,
                company_id: companyId,
                featured: movie.featured
            }
        })
        expect(response.ok()).toBeTruthy()
    }
}