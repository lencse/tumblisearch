import Job from './Job'
import Search from '../search/Search'
import JobRunner from './JobRunner'

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

}
