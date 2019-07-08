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
        @inject(TYPES.HttpServer) private httpServer: HttpServer,
        @inject(CreateSearch) private createSearch: CreateSearch
    ) {}

    public init(): Server {
        this.httpServer.createSearch(this.createSearch)
        this.httpServer.staticDir('./public')
        this.httpServer.assemble()
        return this
    }

    public run(): void {
        this.httpServer.run(this.portNumber)
    }

    public get webApp(): any {
        return this.httpServer.app
    }

}
