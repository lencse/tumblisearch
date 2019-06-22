import Search from '../search/Search'
import JobRunner from './JobRunner'

export default interface Job {

    getSearch(): Search,

    getParams(): any

    run(runner: JobRunner): Promise<void>

}
