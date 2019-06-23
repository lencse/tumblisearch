import JobData from './JobData'

export default interface JobSaver {

    saveJob(job: JobData): Promise<void>

}
