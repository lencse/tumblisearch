import CreateSearch from '../search/CreateSearch'

export default interface Webserver {

    app: any

    staticDir(dir: string): void

    createSearch(handler: CreateSearch): void

    assemble(): void,

    run(portNumber: number): void

}
