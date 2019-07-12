import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default class BlogInfo implements Job {

    constructor(
        private _search: Search
    ) {}

    public get search(): Search {
        return this._search
    }

    public get params(): any {
        return null
    }

    public async run(runner: JobRunner): Promise<void> {
        return runner.getBlogInfo(this)
    }

    public get type(): string {
        return 'blog_info'
    }

    public get data(): JobData {
        return {
            jobType: this.type,
            params: this.params,
            searchId: this.search.id,
            searchParams: this.search.params
        }
    }

    public asString(): string {
        return `INFO ${this.search.params.blogName}`
    }
}
