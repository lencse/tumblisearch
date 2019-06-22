import Job from './Job'

export default interface JobSaver {

    saveJob(job: Job): Promise<void>

}
