import SearchSavingData from '../../../../src/server/search/SearchSavingData'
import SearchData from '../../../../src/server/search/SearchData'
import CreateSearch from '../../../../src/server/search/CreateSearch'
import SearchFactory from '../../../../src/server/search/SearchFactory'

describe('CreateSearch', () => {
    it('Search is created after the request', async () => {
        const saver = {
            entry: null,
            async saveSearch(data: SearchSavingData): Promise<SearchData> {
                this.search = data
                return data
            }
        }
        const handler = new CreateSearch(
            saver,
            {
                generate(): string {
                    return 'TEST'
                }
            },
            new SearchFactory()
        )

        const result = await handler.handle({
            date: new Date('2019-01-01'),
            params: {
                blogName: 'test',
                searchText: 'search text'
            }
        })

        expect(result.id).toEqual('TEST')
        expect(result.params.blogName).toEqual('test')
        expect(result.params.searchText).toEqual('search text')
    })
})