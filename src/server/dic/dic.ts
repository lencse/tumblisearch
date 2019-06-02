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

const container = new Container()

function initInterfaces(): void {
    container.bind<Webserver>(TYPES.Webserver).to(KoaWebserver)
    container.bind<SearchSaver>(TYPES.SearchSaver).to(PgSearchSaver)
    container.bind<IdGenerator>(TYPES.IdGenerator).to(UuidGenerator)
}

function initClasses(): void {
    container.bind<Server>(Server).to(Server)
    container.bind<CreateSearch>(CreateSearch).to(CreateSearch)
    container.bind<PgConnection>(PgConnection).to(PgConnection)
    container.bind<SearchFactory>(SearchFactory).to(SearchFactory)
}

function initScalars(): void {
    container.bind<number>(SCALARS.Webserver.portNumber).toConstantValue(config.portNumber)
    container.bind<string>(SCALARS.PgConnection.dbUrl).toConstantValue(config.dbUrl)
}

initInterfaces()
initClasses()
initScalars()

const dic = {
    get server(): Server {
        return container.get<Server>(Server)
    }
}

export default dic
