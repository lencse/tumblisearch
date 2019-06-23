import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default interface Job {

    getSearch(): Search,

    getParams(): any

    run(runner: JobRunner): Promise<void>

    type(): string

    data(): JobData

}
