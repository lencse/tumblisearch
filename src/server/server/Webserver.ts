import { injectable, inject } from 'inversify'
import HttpServer from './http/HttpServer'
import { TYPES, SCALARS } from '../dic/params'
import 'reflect-metadata'
import CreateSearch from '../search/CreateSearch'
import Server from './Server'

@injectable()
export default class WebServer implements Server {

    constructor(
        @inject(SCALARS.Webserver.portNumber) private portNumber: number,
        @inject(TYPES.Webserver) private webserver: HttpServer,
        @inject(CreateSearch) private createSearch: CreateSearch
    ) {}

    public init(): WebServer {
        this.webserver.createSearch(this.createSearch)
        this.webserver.staticDir('./public')
        this.webserver.assemble()
        return this
    }

    public run(): void {
        this.webserver.run(this.portNumber)
    }

    public get webApp(): any {
        return this.webserver.app
    }

}
