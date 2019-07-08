import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import JobData from './JobData'
import { connect, Channel } from 'amqplib'
import { SCALARS } from '../dic/params'
import JobSaver from './JobSaver'

@injectable()
export default class RabbitMq implements JobSaver {

    private channel: Channel

    constructor(
        @inject(SCALARS.RabbitConnection.rabbitUrl) private rabbitUrl: string,
        @inject(SCALARS.RabbitConnection.queueName) private queueName: string
    ) {}

    public async saveJob(jobData: JobData): Promise<void> {
        const channel = await this.getChannel()
        channel.assertQueue(
            this.queueName,
            { durable: true }
        )
        channel.sendToQueue(
            this.queueName,
            Buffer.from(JSON.stringify(jobData)),
            { persistent: true}
        )
    }

    private async getChannel(): Promise<Channel> {
        if (!this.channel) {
            const connection = await connect(this.rabbitUrl)
            this.channel = await connection.createChannel()
        }
        return this.channel
    }

}
