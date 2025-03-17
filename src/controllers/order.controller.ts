import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from '../middlewares/error.middleware';
import { OrderStatus, UpdateOrderStatusDto } from '../validators/order.validator';
import { RequestHandler } from '../types/express';

interface CartItemWithProduct {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    price: number;
    name: string;
    stock: number;
  };
}

export const getAllOrders: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const orders = await prisma.order.findMany({
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
  } catch (error) {
    next(error);
  }
};

export const getOrderById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    const order = await prisma.order.findFirst({
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
      throw new AppError('Order not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true
      }
    });

    if (cartItems.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum: number, item: CartItemWithProduct) =>
        sum + item.product.price * item.quantity,
      0
    );

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx: typeof prisma) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: OrderStatus.PENDING
        }
      });

      // Create order items
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }
        });

        // Update product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return newOrder;
    });

    // Get complete order with items
    const completeOrder = await prisma.order.findUnique({
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
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body as UpdateOrderStatusDto;

    const order = await prisma.order.update({
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
  } catch (error) {
    next(error);
  }
};