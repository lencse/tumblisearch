import { Container } from 'inversify'
import { TYPES, SCALARS } from './params'
import WebServer from '../server/WebServer'
import KoaHttpServer from '../server/http/KoaHttpServer'
import HttpServer from '../server/http/HttpServer'
import CreateSearch from '../search/CreateSearch'
import config from '../../../config/server/config'
import SearchSaver from '../search/SearchSaver'
import PgSearchSaver from '../db/PgSearchSaver'
import PgConnection from '../db/PgConnection'
import IdGenerator from '../id/IdGenerator'
import UuidGenerator from '../id/UuidGenerator'
import SearchFactory from '../search/SearchFactory'
import JobSaver from '../jobs/JobSaver'
import RabbitJobSaver from '../jobs/RabbitJobSaver'

const container = new Container()

// Interfaces

container.bind<HttpServer>(TYPES.Webserver).to(KoaHttpServer)
container.bind<SearchSaver>(TYPES.SearchSaver).to(PgSearchSaver)
container.bind<IdGenerator>(TYPES.IdGenerator).to(UuidGenerator)
container.bind<JobSaver>(TYPES.JobSaver).to(RabbitJobSaver)

// Classes

container.bind<WebServer>(WebServer).to(WebServer)
container.bind<CreateSearch>(CreateSearch).to(CreateSearch)
container.bind<PgConnection>(PgConnection).to(PgConnection)
container.bind<SearchFactory>(SearchFactory).to(SearchFactory)

// Scalars

container.bind<number>(SCALARS.Webserver.portNumber).toConstantValue(config.portNumber)
container.bind<string>(SCALARS.PgConnection.dbUrl).toConstantValue(config.dbUrl)
container.bind<string>(SCALARS.Tumblr.apiKey).toConstantValue(config.tumblrApiKey)

const dic = {
    get server(): WebServer {
        return container.get<WebServer>(WebServer)
    }
}

export default dic
