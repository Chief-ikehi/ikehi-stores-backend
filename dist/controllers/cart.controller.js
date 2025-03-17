"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const index_1 = require("../index");
const error_middleware_1 = require("../middlewares/error.middleware");
const getCart = async (req, res, next) => {
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
        res.status(200).json({
            status: 'success',
            data: {
                cartItems
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCart = getCart;
const addToCart = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { productId, quantity } = req.body;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const product = await index_1.prisma.product.findUnique({
            where: { id: productId }
        });
        if (!product) {
            throw new error_middleware_1.AppError('Product not found', 404);
        }
        if (product.stock < quantity) {
            throw new error_middleware_1.AppError('Not enough stock available', 400);
        }
        const existingCartItem = await index_1.prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });
        let cartItem;
        if (existingCartItem) {
            cartItem = await index_1.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + quantity
                },
                include: {
                    product: true
                }
            });
        }
        else {
            cartItem = await index_1.prisma.cartItem.create({
                data: {
                    userId,
                    productId,
                    quantity
                },
                include: {
                    product: true
                }
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                cartItem
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { cartItemId, quantity } = req.body;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const existingCartItem = await index_1.prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                userId
            },
            include: {
                product: true
            }
        });
        if (!existingCartItem) {
            throw new error_middleware_1.AppError('Cart item not found', 404);
        }
        if (existingCartItem.product.stock < quantity) {
            throw new error_middleware_1.AppError('Not enough stock available', 400);
        }
        const updatedCartItem = await index_1.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
            include: {
                product: true
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                cartItem: updatedCartItem
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { cartItemId } = req.body;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        const existingCartItem = await index_1.prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                userId
            }
        });
        if (!existingCartItem) {
            throw new error_middleware_1.AppError('Cart item not found', 404);
        }
        await index_1.prisma.cartItem.delete({
            where: { id: cartItemId }
        });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.removeFromCart = removeFromCart;
const clearCart = async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new error_middleware_1.AppError('User not authenticated', 401);
        }
        await index_1.prisma.cartItem.deleteMany({
            where: { userId }
        });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.controller.js.map