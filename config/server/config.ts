import { config as dotenv } from 'dotenv'

dotenv()

const env = process.env

const config = {
    portNumber: Number(env.PORT || 8080),
    dbUrl: String(env.DATABASE_URL),
    tumblrApiKey: String(env.TUMBLR_API_KEY),
    rabbitUrl: String(env.CLOUDAMQP_URL),
    queueName: 'tumblisearch',
    fetchPostCount: Number(env.FETCH_POST_COUNT),
    serverType: String(env.SERVER_TYPE || 'web')
}

export default config
