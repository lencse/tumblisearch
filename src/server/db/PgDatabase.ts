import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import PgConnection from './PgConnection'

@injectable()
export default class PgDatabase {

    constructor(
        @inject(PgConnection) protected connection: PgConnection
    ) {}

}
