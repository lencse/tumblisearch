import UuidGenerator from '../../../../src/server/id/UuidGenerator'

describe('UuidGenerator', () => {
    it('Uuid format', () => {
        const uuid = new UuidGenerator()
        expect(uuid.generate()).toMatch(
            /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
        )
    })
    it('Different uuids', () => {
        const uuid = new UuidGenerator()
        expect(uuid.generate() === uuid.generate()).toBeFalsy()
    })
})
