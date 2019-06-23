import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default class FetchPosts implements Job {

    constructor(
        private search: Search,
        private offset: number
    ) {}

    public getSearch(): Search {
        return this.search
    }

    public getParams(): any {
        return { offset: this.offset}
    }

    public async run(runner: JobRunner): Promise<void> {
        return runner.fetchPosts(this)
    }

    public type(): string {
        return 'fetch_posts'
    }

    public data(): JobData {
        return {
            jobType: this.type(),
            params: this.getParams(),
            searchId: this.search.id,
            searchParams: this.search.params
        }
    }

}
