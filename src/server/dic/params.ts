export const TYPES = {
    IdGenerator: Symbol('IdGenerator'),
    SearchSaver: Symbol('SearchSaver'),
    JobSaver: Symbol('JobSaver'),
    Server: Symbol('Server'),
    HttpServer: Symbol('HttpServer')
}

export const SCALARS = {
    Webserver: {
        portNumber: Symbol('portNumber')
    },
    PgConnection: {
        dbUrl: Symbol('dbUrl')
    },
    Tumblr: {
        apiKey: Symbol('apiKey')
    },
    RabbitConnection: {
        rabbitUrl: Symbol('rabbitUrl'),
        queueName: Symbol('rabbitUrl')
    }
}
