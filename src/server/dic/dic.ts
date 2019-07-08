import { Container } from 'inversify'
import { TYPES, SCALARS } from './params'
import WebServer from '../server/http/WebServer'
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
import RabbitConnection from '../jobs/RabbitConnection'
import Server from '../server/Server'
import CompositeServer from '../server/CompositeServer'
import Queue from '../server/queue/Queue'

const container = new Container()

// Interfaces

container.bind<HttpServer>(TYPES.HttpServer).to(KoaHttpServer)
container.bind<SearchSaver>(TYPES.SearchSaver).to(PgSearchSaver)
container.bind<IdGenerator>(TYPES.IdGenerator).to(UuidGenerator)
container.bind<JobSaver>(TYPES.JobSaver).to(RabbitJobSaver)

// Classes

container.bind<WebServer>(WebServer).to(WebServer)
container.bind<Queue>(Queue).to(Queue)
container.bind<CreateSearch>(CreateSearch).to(CreateSearch)
container.bind<PgConnection>(PgConnection).to(PgConnection)
container.bind<SearchFactory>(SearchFactory).to(SearchFactory)
container.bind<RabbitConnection>(RabbitConnection).to(RabbitConnection)

// Scalars

container.bind<number>(SCALARS.Webserver.portNumber).toConstantValue(config.portNumber)
container.bind<string>(SCALARS.PgConnection.dbUrl).toConstantValue(config.dbUrl)
container.bind<string>(SCALARS.Tumblr.apiKey).toConstantValue(config.tumblrApiKey)
container.bind<string>(SCALARS.RabbitConnection.rabbitUrl).toConstantValue(config.rabbitUrl)
container.bind<string>(SCALARS.RabbitConnection.queueName).toConstantValue(config.queueName)

// Server

container.bind<Server>(TYPES.Server).toDynamicValue((ctx) => {
    const servers: Server[] = []
    if (config.runServer) {
        servers.push(ctx.container.get<Server>(WebServer))
    }
    if (config.runQueue) {
        servers.push(ctx.container.get<Server>(Queue))
    }
    return new CompositeServer(servers)
})

const dic = {
    get server(): Server {
        return container.get<Server>(TYPES.Server)
    }
}

export default dic
