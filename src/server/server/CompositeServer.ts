import Server from './Server'

export default class CompositeServer implements Server {

    constructor(
        private servers: Server[]
    ) {}

    public init(): Server {
        this.servers.forEach((server) => server.init())
        return this
    }

    public run(): void {
        this.servers.forEach((server) => server.run())
    }

    public get webApp(): any {
        return this.servers.reduce((current, server) => current || server.webApp, null)
    }

}
