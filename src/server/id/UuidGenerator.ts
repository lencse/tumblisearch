import * as uuidv4 from 'uuid/v4'
import { injectable } from 'inversify'
import 'reflect-metadata'
import IdGenerator from './IdGenerator'

@injectable()
export default class UuidGenerator implements IdGenerator {

    public generate(): string {
        return uuidv4()
    }

}
