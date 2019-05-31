import { injectable, inject } from 'inversify'
import Webserver from './Webserver'
import { TYPES, SCALARS } from '../dic/params'
import 'reflect-metadata'

@injectable()
export default class Server {

    constructor(
        @inject(SCALARS.Webserver.portNumber) private portNumber: number,
        @inject(TYPES.Webserver) private webserver: Webserver
    ) {}

    public init(): Server {
        this.webserver.staticDir('./public')
        this.webserver.assemble()
        return this
    }

    public run(): void {
        this.webserver.run(this.portNumber)
    }

    public get app(): any {
        return this.webserver.app
    }

}
