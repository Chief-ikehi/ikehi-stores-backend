"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    res.status(statusCode).json({
        status,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map