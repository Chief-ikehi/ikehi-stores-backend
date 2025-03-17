"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_middleware_1.validateRequest)(auth_validator_1.RegisterDto), auth_controller_1.register);
router.post('/login', (0, validation_middleware_1.validateRequest)(auth_validator_1.LoginDto), auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map