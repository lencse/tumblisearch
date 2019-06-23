import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { TYPES } from '../dic/params'
import SearchSaver from './SearchSaver'
import SearchFactory from './SearchFactory'
import CreateSearchRequest from './CreateSearchRequest'
import Search from './Search'
import IdGenerator from '../id/IdGenerator'
import JobSaver from '../jobs/JobSaver'
import BlogInfo from '../jobs/BlogInfo'

@injectable()
export default class CreateSearch {

    constructor(
        @inject(TYPES.SearchSaver) private saver: SearchSaver,
        @inject(TYPES.IdGenerator) private idGenerator: IdGenerator,
        @inject(TYPES.JobSaver) private jobSaver: JobSaver,
        @inject(SearchFactory) private searchFactory: SearchFactory
    ) {}

    public async handle(request: CreateSearchRequest): Promise<Search> {
        const data = await this.saver.saveSearch({
            id: this.idGenerator.generate(),
            date: request.date,
            params: request.params
        })
        const search = this.searchFactory.fromData(data)
        await this.jobSaver.saveJob(new BlogInfo(search).data())
        return search
    }

}
