import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from '../middlewares/error.middleware';
import { AddToCartDto, RemoveFromCartDto, UpdateCartItemDto } from '../validators/cart.validator';
import { RequestHandler } from '../types/express';

export const getCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const cartItems = await prisma.cartItem.findMany({
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
  } catch (error) {
    next(error);
  }
};

export const addToCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body as AddToCartDto;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Check if product exists and has enough stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.stock < quantity) {
      throw new AppError('Not enough stock available', 400);
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if item already exists
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity
        },
        include: {
          product: true
        }
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
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
  } catch (error) {
    next(error);
  }
};

export const updateCartItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { cartItemId, quantity } = req.body as UpdateCartItemDto;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Check if cart item exists and belongs to user
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId
      },
      include: {
        product: true
      }
    });

    if (!existingCartItem) {
      throw new AppError('Cart item not found', 404);
    }

    // Check if product has enough stock
    if (existingCartItem.product.stock < quantity) {
      throw new AppError('Not enough stock available', 400);
    }

    // Update cart item
    const updatedCartItem = await prisma.cartItem.update({
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
  } catch (error) {
    next(error);
  }
};

export const removeFromCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { cartItemId } = req.body as RemoveFromCartDto;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Check if cart item exists and belongs to user
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId
      }
    });

    if (!existingCartItem) {
      throw new AppError('Cart item not found', 404);
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const clearCart: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Delete all cart items for user
    await prisma.cartItem.deleteMany({
      where: { userId }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}; 