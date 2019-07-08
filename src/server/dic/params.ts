const _ = Symbol

export const TYPES = {
    IdGenerator: _(),
    SearchSaver: _(),
    JobSaver: _(),
    Server: _(),
    HttpServer: _(),
    JobPicker: _()
}

export const SCALARS = {

    Webserver: {
        portNumber: _()
    },

    PgConnection: {
        dbUrl: _()
    },

    Tumblr: {
        apiKey: _()
    },

    RabbitConnection: {
        rabbitUrl: _(),
        queueName: _()
    }
}
