export const TYPES = {
    IdGenerator: Symbol('IdGenerator'),
    SearchSaver: Symbol('SearchSaver'),
    JobSaver: Symbol('JobSaver'),
    Server: Symbol('Server'),
    HttpServer: Symbol('HttpServer')
}

export const SCALARS = {
    Webserver: {
        portNumber: Symbol('Webserver.portNumber')
    },
    PgConnection: {
        dbUrl: Symbol('PgConnection.dbUrl')
    },
    Tumblr: {
        apiKey: Symbol('Tumblr.apiKey')
    },
    RabbitConnection: {
        rabbitUrl: Symbol('RabbitConnection.rabbitUrl'),
        queueName: Symbol('RabbitConnection.queueName')
    }
}
