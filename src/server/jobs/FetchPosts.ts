import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'

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

}
