"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const product_validator_1 = require("../validators/product.validator");
const router = (0, express_1.Router)();
router.get('/', product_controller_1.getAllProducts);
router.get('/:id', product_controller_1.getProductById);
router.post('/', auth_middleware_1.authenticate, (0, validation_middleware_1.validateRequest)(product_validator_1.CreateProductDto), product_controller_1.createProduct);
router.put('/:id', auth_middleware_1.authenticate, (0, validation_middleware_1.validateRequest)(product_validator_1.UpdateProductDto), product_controller_1.updateProduct);
router.delete('/:id', auth_middleware_1.authenticate, product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.routes.js.map