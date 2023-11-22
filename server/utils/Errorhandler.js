class ErrorHandler extends Error{
    constructor(message,statusCode) {
        super(message);
        this.statusCode= statusCode;
        Error.captureStackTrace(this,this.statusCode)
    }
}
module.exports = ErrorHandler;
