import SearchSavingData from '../../../../src/server/search/SearchSavingData'
import SearchData from '../../../../src/server/search/SearchData'
import CreateSearch from '../../../../src/server/search/CreateSearch'
import SearchFactory from '../../../../src/server/search/SearchFactory'
import Job from '../../../../src/server/jobs/Job'

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
            {
                async saveJob(job: Job): Promise<void> {
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
        expect(result.params).toEqual({
            blogName: 'test',
            searchText: 'search text'
        })
    })
})
