import { Container } from 'inversify'
import { TYPES, SCALARS } from './params'
import Server from '../server/Server'
import KoaWebserver from '../server/KoaWebserver'
import Webserver from '../server/Webserver'
import CreateSearch from '../search/CreateSearch'
import config from '../../../config/server/config'
// import PgDayStore from '../db/PgDayStore'

class DIC {

    private container: Container = new Container()

    constructor() {
        this.initInterfaces()
        this.initClasses()
        this.initScalars()
    }

    private initInterfaces() {
        this.container.bind<Webserver>(TYPES.Webserver).to(KoaWebserver)
        // this.container.bind<UserStore>(TYPES.UserStore).to(PgUserStore)
        // this.container.bind<EntrySaver>(TYPES.EntrySaver).to(PgEntrySaver)
        // this.container.bind<DayStore>(TYPES.DayStore).to(PgDayStore)
        // this.container.bind<UuidGenerator>(TYPES.UuidGenerator).to(V4UuidGenerator)
    }

    private initClasses() {
        this.container.bind<Server>(Server).to(Server)
        // this.container.bind<CreateUser>(CreateUser).toDynamicValue((ctx) => {
        //     return CreateUser.construct(
        //         ctx.container.get<UserSaver>(TYPES.UserSaver),
        //         ctx.container.get<UuidGenerator>(TYPES.UuidGenerator)
        //     )
        // })
        this.container.bind<CreateSearch>(CreateSearch).to(CreateSearch)
        // this.container.bind<GetUser>(GetUser).to(GetUser)
        // this.container.bind<EntryFactory>(EntryFactory).to(EntryFactory)
        // this.container.bind<PgConnection>(PgConnection).to(PgConnection)
        // this.container.bind<UserFactory>(UserFactory).to(UserFactory)
        // this.container.bind<GetDays>(GetDays).to(GetDays)
        // this.container.bind<DayFactory>(DayFactory).to(DayFactory)
    }

    private initScalars(): void {
        this.container.bind<number>(SCALARS.Webserver.portNumber).toConstantValue(config.portNumber)
        // this.container.bind<string>(SCALARS.PgConnection.dbUrl).toConstantValue(config.dbUrl)
    }

    public get server(): Server {
        return this.container.get<Server>(Server)
    }

}

const dic = new DIC()

export default dic
