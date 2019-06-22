import SearchParams from '../search/SearchParams'

export default interface JobData {

    jobId: string,

    searchId: string,

    searchParams: SearchParams,

    jobType: string,

    params: any

}
