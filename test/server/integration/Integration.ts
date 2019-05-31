import * as supertest from 'supertest'
import dic from '../../../src/server/dic/dic'

describe('ServerTest', () => {
    it('Server is working fine', async () => {
        const server = dic.server.init()
        const testServer = supertest(server.app.callback())

        const pub = await testServer.get('/')

        expect(pub.status).toBe(200)

        const resp = await testServer.post('/api/search')
            .send(`blogName=staff`)
            .send(`searchText=Joo Han`)

        const id = resp.body.id

        expect(resp.body).toEqual({
            id,
            params: {
                blogName: 'staff',
                searchText: 'Joo Han'
            }
        })
    })
})
