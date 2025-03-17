"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const index_1 = require("../index");
const error_middleware_1 = require("../middlewares/error.middleware");
const order_validator_1 = require("../validators/order.validator");
const getAllOrders = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const orders = await index_1.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                orders
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { id } = req.params;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const order = await index_1.prisma.order.findFirst({
            where: {
                id,
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!order) {
            throw new error_middleware_1.AppError('Order not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderById = getOrderById;
const createOrder = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const cartItems = await index_1.prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true
            }
        });
        if (cartItems.length === 0) {
            throw new error_middleware_1.AppError('Cart is empty', 400);
        }
        const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const order = await index_1.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total,
                    status: order_validator_1.OrderStatus.PENDING
                }
            });
            for (const item of cartItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price
                    }
                });
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }
            await tx.cartItem.deleteMany({
                where: { userId }
            });
            return newOrder;
        });
        const completeOrder = await index_1.prisma.order.findUnique({
            where: { id: order.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.status(201).json({
            status: 'success',
            data: {
                order: completeOrder
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await index_1.prisma.order.update({
            where: { id },
            data: { status },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.controller.js.map