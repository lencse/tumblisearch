export const TYPES = {
    Webserver: Symbol('Webserver'),
    IdGenerator: Symbol('IdGenerator'),
    SearchSaver: Symbol('SearchSaver'),
    JobSaver: Symbol('JobSaver')
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
    }
}
