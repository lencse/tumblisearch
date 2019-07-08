export const TYPES = {
    IdGenerator: Symbol(),
    SearchSaver: Symbol(),
    JobSaver: Symbol(),
    Server: Symbol(),
    HttpServer: Symbol()
}

export const SCALARS = {
    Webserver: {
        portNumber: Symbol()
    },
    PgConnection: {
        dbUrl: Symbol()
    },
    Tumblr: {
        apiKey: Symbol()
    },
    RabbitConnection: {
        rabbitUrl: Symbol(),
        queueName: Symbol()
    }
}
