import Search from '../search/Search'
import JobRunner from './JobRunner'
import JobData from './JobData'

export default interface Job {

    search: Search,
    params: any
    type: string
    data: JobData

    run(runner: JobRunner): Promise<void>

    asString(): string

}
