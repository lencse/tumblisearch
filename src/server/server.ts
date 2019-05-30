export function server() {
    return {
        init() {
            return {
                run() {
                    console.info('Server started')
                    return 1
                }
            }
        }
    }
}
