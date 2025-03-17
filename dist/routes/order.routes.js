"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const order_validator_1 = require("../validators/order.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", order_controller_1.getAllOrders);
router.get("/:id", order_controller_1.getOrderById);
router.post("/", order_controller_1.createOrder);
router.patch("/:id/status", (0, validation_middleware_1.validateRequest)(order_validator_1.UpdateOrderStatusDto), order_controller_1.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=order.routes.js.map