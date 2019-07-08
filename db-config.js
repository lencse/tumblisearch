module.exports = {
    dev: {
        driver: 'pg',
        url: process.env.DATABASE_URL
    },
    prod: {
        driver: 'pg',
        url: process.env.DATABASE_URL,
        addIfNotExists: {
            sslmode: 'require'
        },
        overwrite: {
            native: true
        }
    }
}
