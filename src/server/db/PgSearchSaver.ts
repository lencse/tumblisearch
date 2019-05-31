import PgDatabase from './PgDatabase'
import SearchSaver from '../search/SearchSaver'
import SearchSavingData from '../search/SearchSavingData'
import SearchData from '../search/SearchData'

export default class PgSearchSaver extends PgDatabase implements SearchSaver {

    public async saveSearch(data: SearchSavingData): Promise<SearchData> {
        const dbResult = await this.connection.pool.query(`
            INSERT INTO searches (
                id,
                search_date,
                blog_name,
                search_text
            )
            VALUES (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING
                id,
                search_date,
                blog_name,
                search_text
            `, [
                data.id,
                data.date,
                data.params.blogName,
                data.params.searchText
            ]
        )

        const result = dbResult.rows.pop()

        return {
            id: result.id,
            params: {
                blogName: result.blog_name,
                searchText: result.search_text
            }
        }
    }
}
