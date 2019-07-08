import { injectable } from 'inversify'
import 'reflect-metadata'
import Server from '../Server'

@injectable()
export default class Queue implements Server {

    public init(): Server {
        return this
    }

    public run(): void {
        console.info('Started queue')
    }

    public get webApp(): any {
        return null
    }

}
