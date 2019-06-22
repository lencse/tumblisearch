import JobRunner from './JobRunner'

export default interface JobPicker {

    runNextJob(runner: JobRunner): Promise<void>

}
