import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { TYPES } from '../dic/params'
import SearchSaver from './SearchSaver'
import SearchFactory from './SearchFactory'
import CreateSearchRequest from './CreateSearchRequest'
import Search from './Search'
import IdGenerator from '../id/IdGenerator'

@injectable()
export default class CreateSearch {

    constructor(
        @inject(TYPES.SearchSaver) private saver: SearchSaver,
        @inject(TYPES.IdGenerator) private idGenerator: IdGenerator,
        @inject(SearchFactory) private searchFactory: SearchFactory
    ) {}

    public async handle(request: CreateSearchRequest): Promise<Search> {
        const data = await this.saver.saveSearch({
            id: this.idGenerator.generate(),
            date: request.date,
            params: request.params
        })
        return this.searchFactory.fromData(data)
    }

}
