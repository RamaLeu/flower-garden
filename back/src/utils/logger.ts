export class logger {
    public static log(message: string, type: string) {
        const now = new Date().toISOString();
        switch (type) {
            case 'error':
                console.log(`[ERROR][${now}]:[${message}]`);
                break;

            case 'info':
                console.log(`[INFO][${now}]:[${message}]`);
            default:
                break;
        }
    }
}
