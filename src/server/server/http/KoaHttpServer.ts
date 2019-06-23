
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as json from 'koa-json'
import * as serve from 'koa-static'
import 'reflect-metadata'
import { injectable } from 'inversify'
import HttpServer from './HttpServer'
import * as koaBody from 'koa-body'
import CreateSearch from '../../search/CreateSearch'

@injectable()
export default class KoaHttpServer implements HttpServer {

    private koa: Koa

    private router: Router

    constructor() {
        this.koa = new Koa()
        this.router = new Router()
    }

    public staticDir(dir: string) {
        this.koa.use(serve(dir))
    }

    public assemble(): void {
        this.koa.use(json())
            .use(this.router.routes())
            .use(this.router.allowedMethods())
    }

    public run(portNumber: number): void {
        this.koa.listen(portNumber)
        console.info(`Started webserver: http://localhost:${portNumber}`)
    }

    public get app(): any {
        return this.koa
    }

    public createSearch(handler: CreateSearch): void {
        this.router.post(
            '/api/search',
            koaBody({multipart: true}),
            async (ctx: Koa.Context, next) => {
                const search = await handler.handle({
                    date: new Date(),
                    params: {
                        blogName: ctx.request.body.blogName,
                        searchText: ctx.request.body.searchText
                    }
                })
                ctx.body = search
            }
        )
    }

}
