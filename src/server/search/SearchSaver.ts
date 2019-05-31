import SearchSavingData from './SearchSavingData'
import SearchData from './SearchData'

export default interface SearchSaver {

    saveSearch(data: SearchSavingData): Promise<SearchData>

}
