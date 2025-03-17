"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const index_1 = require("../index");
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new error_middleware_1.AppError('No token provided', 401);
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new error_middleware_1.AppError('No token provided', 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await index_1.prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new error_middleware_1.AppError('Invalid token', 401));
        }
        else {
            next(error);
        }
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map