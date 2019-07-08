import { injectable , inject } from 'inversify'
import 'reflect-metadata'
import Server from '../Server'
import JobPicker from '../../jobs/JobPicker'
import { TYPES } from '../../dic/params'
import JobRunner from '../../jobs/JobRunner'

@injectable()
export default class Queue implements Server {

    constructor(
        @inject(TYPES.JobPicker) private jobPicker: JobPicker,
        @inject(JobRunner) private jobRunner: JobRunner
    ) {}

    public init(): Server {
        return this
    }

    public async run(): Promise<void> {
        console.info('Started queue')
        while (true) {
            await this.jobPicker.runNextJob(this.jobRunner)
        }
    }

    public get webApp(): any {
        return null
    }

}
