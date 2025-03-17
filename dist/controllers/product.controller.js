"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const index_1 = require("../index");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllProducts = async (_req, res, next) => {
    try {
        const products = await index_1.prisma.product.findMany();
        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await index_1.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            throw new error_middleware_1.AppError('Product not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const product = await index_1.prisma.product.create({
            data: productData
        });
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const existingProduct = await index_1.prisma.product.findUnique({
            where: { id }
        });
        if (!existingProduct) {
            throw new error_middleware_1.AppError('Product not found', 404);
        }
        const updatedProduct = await index_1.prisma.product.update({
            where: { id },
            data: productData
        });
        res.status(200).json({
            status: 'success',
            data: {
                product: updatedProduct
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingProduct = await index_1.prisma.product.findUnique({
            where: { id }
        });
        if (!existingProduct) {
            throw new error_middleware_1.AppError('Product not found', 404);
        }
        await index_1.prisma.product.delete({
            where: { id }
        });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map