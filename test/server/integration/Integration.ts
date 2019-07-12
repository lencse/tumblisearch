import * as supertest from 'supertest'
import dic from '../../../src/server/dic/dic'

describe('ServerTest', () => {
    it('Server is working fine', async () => {
        const server = dic.server.init()
        const testServer = supertest(server.webApp.callback())

        const pub = await testServer.get('/')

        expect(pub.status).toBe(200)

        // const resp = await testServer.post('/api/search')
        //     .send('blogName=anegyesmetrovodrei')
        //     .send('searchText=kitett')

        // const id = resp.body.id

        // expect(resp.body).toEqual({
        //     id,
        //     params: {
        //         blogName: 'anegyesmetrovodrei',
        //         searchText: 'kitett'
        //     }
        // })
    })
})
