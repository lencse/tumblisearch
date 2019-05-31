import { Container } from 'inversify'
import { TYPES, SCALARS } from './params'
import Server from '../server/Server'
import KoaWebserver from '../server/KoaWebserver'
import Webserver from '../server/Webserver'
import CreateSearch from '../search/CreateSearch'
import config from '../../../config/server/config'
import SearchSaver from '../search/SearchSaver'
import PgSearchSaver from '../db/PgSearchSaver'
import PgConnection from '../db/PgConnection'
import IdGenerator from '../id/IdGenerator'
import UuidGenerator from '../id/UuidGenerator'
import SearchFactory from '../search/SearchFactory'

class DIC {

    private container: Container = new Container()

    constructor() {
        this.initInterfaces()
        this.initClasses()
        this.initScalars()
    }

    private initInterfaces() {
        this.container.bind<Webserver>(TYPES.Webserver).to(KoaWebserver)
        this.container.bind<SearchSaver>(TYPES.SearchSaver).to(PgSearchSaver)
        this.container.bind<IdGenerator>(TYPES.IdGenerator).to(UuidGenerator)
    }

    private initClasses() {
        this.container.bind<Server>(Server).to(Server)
        this.container.bind<CreateSearch>(CreateSearch).to(CreateSearch)
        this.container.bind<PgConnection>(PgConnection).to(PgConnection)
        this.container.bind<SearchFactory>(SearchFactory).to(SearchFactory)
    }

    private initScalars(): void {
        this.container.bind<number>(SCALARS.Webserver.portNumber).toConstantValue(config.portNumber)
        this.container.bind<string>(SCALARS.PgConnection.dbUrl).toConstantValue(config.dbUrl)
    }

    public get server(): Server {
        return this.container.get<Server>(Server)
    }

}

const dic = new DIC()

export default dic
