import { injectable } from 'inversify'
import 'reflect-metadata'
import SearchData from './SearchData'
import Search from './Search'

@injectable()
export default class SearchFactory {

    public fromData(data: SearchData): Search {
        return {
            id: data.id,
            params: data.params
        }
    }

}
