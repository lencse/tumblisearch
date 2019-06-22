import JobSaver from './JobSaver'
import Job from './Job'
import * as amqplib from 'amqplib'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export default class RabbitJobSaver implements JobSaver {

    public async saveJob(job: Job): Promise<void> {
        amqplib.connect('amqp://rabbitmq:rabbitmq@rabbitmq', (error0, connection) => {
            if (error0) {
                throw error0
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1
                }

                const queue = 'tumblisearch'

                channel.assertQueue(queue, {
                    durable: false
                })
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(job)))
            })
            setTimeout(() => {
                connection.close()
                process.exit(0)
            }, 500)
        })
    }

}
