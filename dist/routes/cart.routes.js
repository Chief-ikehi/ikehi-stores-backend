"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const cart_validator_1 = require("../validators/cart.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", cart_controller_1.getCart);
router.post("/add", (0, validation_middleware_1.validateRequest)(cart_validator_1.AddToCartDto), cart_controller_1.addToCart);
router.put("/update", (0, validation_middleware_1.validateRequest)(cart_validator_1.UpdateCartItemDto), cart_controller_1.updateCartItem);
router.delete("/remove", (0, validation_middleware_1.validateRequest)(cart_validator_1.RemoveFromCartDto), cart_controller_1.removeFromCart);
router.delete("/clear", cart_controller_1.clearCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map