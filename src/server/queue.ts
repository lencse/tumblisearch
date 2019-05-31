export function queue() {
    return {
        init() {
            return {
                run() {
                    console.info('Queue started')
                    return 1
                }
            }
        }
    }
}
