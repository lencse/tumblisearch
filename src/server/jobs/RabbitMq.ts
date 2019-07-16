import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import JobData from './JobData'
import { connect, Channel } from 'amqplib'
import { SCALARS } from '../dic/params'
import JobSaver from './JobSaver'
import JobPicker from './JobPicker'
import JobRunner from './JobRunner'
import JobFactory from './JobFactory'

@injectable()
export default class RabbitMq implements JobSaver, JobPicker {

    private channel: Channel

    constructor(
        @inject(JobFactory) private jobFactory: JobFactory,
        @inject(SCALARS.RabbitConnection.rabbitUrl) private rabbitUrl: string,
        @inject(SCALARS.RabbitConnection.queueName) private queueName: string
    ) {}

    public async runNextJob(runner: JobRunner): Promise<void> {
        const channel = await this.getChannel()
        channel.prefetch(1)
        await channel.consume(
            this.queueName,
            async (msg) => {
                const jobData: JobData = JSON.parse(msg.content.toString())
                const job = this.jobFactory.createJob(jobData)
                try {
                    await job.run(runner)
                } catch (err) {
                    console.error(err)
                    await channel.reject(msg, true)
                    return
                }
                await channel.ack(msg)
            },
            {
                noAck: false
            }
        )
    }

    public async saveJob(jobData: JobData): Promise<void> {
        const channel = await this.getChannel()
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
        this.channel.assertQueue(
            this.queueName,
            { durable: true }
        )
        return this.channel
    }

}
