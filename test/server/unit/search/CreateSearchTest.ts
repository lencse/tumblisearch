import SearchSavingData from '../../../../src/server/search/SearchSavingData'
import SearchData from '../../../../src/server/search/SearchData'
import CreateSearch from '../../../../src/server/search/CreateSearch'
import SearchFactory from '../../../../src/server/search/SearchFactory'
import JobData from '../../../../src/server/jobs/JobData'

describe('CreateSearch', () => {
    it('Search is created after the request', async () => {
        const saver = {
            search: null,
            async saveSearch(data: SearchSavingData): Promise<SearchData> {
                this.search = data
                return data
            }
        }
        const jobSaver = {
            jobData: null,
            async saveJob(jobData: JobData): Promise<void> {
                this.jobData = jobData
            }
        }
        const handler = new CreateSearch(
            saver,
            {
                generate(): string {
                    return 'TEST'
                }
            },
            jobSaver,
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
        expect(saver.search).toEqual({
            date: new Date('2019-01-01'),
            id: 'TEST',
            params: {
                blogName: 'test',
                searchText: 'search text'
            }
        })
        expect(jobSaver.jobData).toEqual({
            jobType: 'blog_info',
            params: null,
            searchId: 'TEST',
            searchParams: {
                blogName: 'test',
                searchText: 'search text'
            }
        })
    })
})
