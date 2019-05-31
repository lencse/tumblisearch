import { config as dotenv } from 'dotenv'

dotenv()

const config = {

    portNumber: Number(process.env.PORT),

    dbUrl: String(process.env.DATABASE_URL)

}

export default config
