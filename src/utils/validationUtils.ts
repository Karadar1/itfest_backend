import Joi from 'joi';
import { IProduct } from './../models/interfaces/product.interface';
import { ITransaction } from './../models/interfaces/transaction.interface';
import { IUser } from './../models/interfaces/user.interface';

export const validateProduct = (
  productData: Partial<Omit<IProduct, '_id' | 'createdAt'>>,
) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().valid('bicycle', 'scooter').required(),
    condition: Joi.string().valid('new', 'used').required(),
    imageUrl: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
  });

  return schema.validate(productData);
};

export const validateTransaction = (
  transactionData: Partial<Omit<ITransaction, '_id' | 'transactionDate'>>,
) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    sellerId: Joi.string().required(),
    buyerId: Joi.string().required(),
    transactionType: Joi.string().valid('sale', 'rent').required(),
    transactionDate: Joi.date().default(() => new Date()),
    price: Joi.number().required(),
  });

  return schema.validate(transactionData);
};

export const validateUser = (
  userData: Partial<Omit<IUser, '_id' | 'createdAt'>>,
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(/(?=.*\d)(?=.*[!@#$%^&*])/)
      .message(
        'Password must be at least 8 characters long, with at least one number and one special character',
      )
      .required(),
    role: Joi.string().valid('buyer', 'seller', 'admin').required(),
  });

  return schema.validate(userData);
};
