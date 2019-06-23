import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default class FetchPosts implements Job {

    constructor(
        private _search: Search,
        private offset: number
    ) {}

    public get search(): Search {
        return this._search
    }

    public get params(): any {
        return { offset: this.offset}
    }

    public async run(runner: JobRunner): Promise<void> {
        return runner.fetchPosts(this)
    }

    public get type(): string {
        return 'fetch_posts'
    }

    public get data(): JobData {
        return {
            jobType: this.type,
            params: this.params,
            searchId: this.search.id,
            searchParams: this.search.params
        }
    }

}
