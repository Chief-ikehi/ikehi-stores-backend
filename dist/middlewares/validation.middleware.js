"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const error_middleware_1 = require("./error.middleware");
const validateRequest = (type) => {
    return async (req, _res, next) => {
        try {
            const input = (0, class_transformer_1.plainToInstance)(type, req.body);
            const errors = await (0, class_validator_1.validate)(input);
            if (errors.length > 0) {
                const errorMessages = errors.map(error => Object.values(error.constraints || {}));
                throw new error_middleware_1.AppError(errorMessages.join(', '), 400);
            }
            req.body = input;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.middleware.js.map