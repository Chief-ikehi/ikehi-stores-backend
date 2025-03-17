import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from '../middlewares/error.middleware';
import { CreateProductDto, UpdateProductDto } from '../validators/product.validator';
import { RequestHandler } from '../types/express';

export const getAllProducts: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({
      status: 'success',
      data: {
        products
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productData = req.body as CreateProductDto;

    const product = await prisma.product.create({
      data: productData
    });

    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const productData = req.body as UpdateProductDto;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new AppError('Product not found', 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: productData
    });

    res.status(200).json({
      status: 'success',
      data: {
        product: updatedProduct
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      throw new AppError('Product not found', 404);
    }

    await prisma.product.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 