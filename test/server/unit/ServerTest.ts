import { server } from '../../../src/server/server'

describe('Server', () => {
    it('Server is starting', () => {
        const result = server().init().run()
        expect(result).toBe(1)
    })
})
