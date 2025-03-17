"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const error_middleware_1 = require("../middlewares/error.middleware");
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await index_1.prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            throw new error_middleware_1.AppError('User with this email already exists', 400);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await index_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _ } = user, userData = __rest(user, ["password"]);
        res.status(201).json({
            status: 'success',
            data: {
                user: userData,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await index_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new error_middleware_1.AppError('Invalid credentials', 401);
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new error_middleware_1.AppError('Invalid credentials', 401);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _ } = user, userData = __rest(user, ["password"]);
        res.status(200).json({
            status: 'success',
            data: {
                user: userData,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map