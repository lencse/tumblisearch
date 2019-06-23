import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default class BlogInfo implements Job {

    constructor(
        private search: Search
    ) {}

    public getSearch(): Search {
        return this.search
    }

    public getParams(): any {
        return null
    }

    public async run(runner: JobRunner): Promise<void> {
        return runner.getBlogInfo(this)
    }

    public type(): string {
        return 'blog_info'
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
