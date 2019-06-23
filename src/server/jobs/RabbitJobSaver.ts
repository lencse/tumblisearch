import JobSaver from './JobSaver'
import * as amqplib from 'amqplib'
import { injectable } from 'inversify'
import 'reflect-metadata'
import JobData from './JobData'

@injectable()
export default class RabbitJobSaver implements JobSaver {

    public async saveJob(jobData: JobData): Promise<void> {
        amqplib.connect('amqp://rabbitmq:rabbitmq@localhost').then((connection) => {
            connection.createChannel().then((channel) => {
                const queue = 'tumblisearch-test2'

                channel.assertQueue(queue, {
                    durable: false
                })
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(jobData)))
            })
            setTimeout(() => {
                connection.close()
            }, 500)
        })
    }

}
