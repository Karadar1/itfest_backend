import Product from '../models/product.model';
import { Request, Response } from 'express';
import { validateProduct } from '../utils/validationUtils';
import createHttpError from 'http-errors';
import logger from '../utils/logger';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    logger.error('Error fetching all products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw createHttpError(404, 'Product not found');
    }
    res.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const status =
      error instanceof createHttpError.HttpError ? error.status : 500;
    logger.error(`Error fetching product by ID ${req.params.id}: ${message}`);
    res.status(status).send(message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error creating product:', message);
    res.status(500).send('Internal Server Error');
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error updating product ID ${req.params.id}: ${message}`);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting product ID ${req.params.id}: ${message}`);
    res.status(500).send('Internal Server Error');
  }
};
