import JobSaver from './JobSaver'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import JobData from './JobData'
import RabbitConnection from './RabbitConnection'

@injectable()
export default class RabbitJobSaver implements JobSaver {

    constructor(
        @inject(RabbitConnection) private connection: RabbitConnection
    ) {}

    public async saveJob(jobData: JobData): Promise<void> {
        this.connection.addJob(jobData)
    }

}
