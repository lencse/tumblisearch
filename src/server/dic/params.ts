export const TYPES = {
    Webserver: Symbol('Webserver')
    // Server: Symbol('Server'),
    // SearchSaver: Symbol('SearchSaver'),
    // JobSaver: Symbol('JobSaver'),
    // JobPicker: Symbol('JobPicker')
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
