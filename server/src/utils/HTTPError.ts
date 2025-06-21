export default class HTTPError extends Error{
    statusCode: number;
    name: string;
    constructor(message: string, name?: string, statusCode?: number) {
        super(message);
        console.log(message)
        this.name = name || 'Error del servidor';
        // this.message = message
        this.statusCode = statusCode || 500;
        Object.setPrototypeOf(this, HTTPError.prototype);
    }
}