import * as supertest from 'supertest'
import dic from '../../../src/server/dic/dic'

describe('ServerTest', () => {
    it('Server is working fine', async () => {
        const server = dic.server.init()
        const testServer = supertest(server.app.callback())

        const pub = await testServer.get('/')

        expect(pub.status).toBe(200)

    })
})
