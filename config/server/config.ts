import { config as dotenv } from 'dotenv'

dotenv()

const env = process.env

const config = {
    portNumber: Number(env.PORT || 8080),
    dbUrl: String(env.DATABASE_URL),
    tumblrApiKey: String(env.TUMBLR_API_KEY),
    rabbitUrl: String(env.CLOUDAMQP_URL),
    queueName: 'tumblisearch',
    runServer: 'true' === env.RUN_SERVER.trim().toLowerCase(),
    runQueue: 'true' === env.RUN_QUEUE.trim().toLowerCase()
}

export default config
