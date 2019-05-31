import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { SCALARS } from '../dic/params'
import { Pool } from 'pg'

@injectable()
export default class PgConnection {

    private static _pool: Pool

    constructor(
        @inject(SCALARS.PgConnection.dbUrl) dbUrl: string
    ) {
        PgConnection._pool = PgConnection._pool || new Pool({
            connectionString: dbUrl
        })
    }

    public get pool(): Pool {
        return PgConnection._pool
    }

}
