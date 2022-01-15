import { Request, RequestHandler, Response } from 'express';
import Product from '@models/products.model';
import { IProduct } from '../types/products';

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
    const product = await Product.find().exec();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getProductBySku: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const productBySku = await Product.findOne({
      sku: String(sku)
    });
    if (productBySku) {
      res.status(200).json({ message: productBySku });
    } else {
      res.status(404).json({ error: `${sku} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const createProduct: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      category,
      price,
      quantity,
    } = req.body;
    const productByName = await Product.findOne({
      productName: productName
    });
    if (!productByName) {
    const product: IProduct = await Product.create({
      productName,
      category,
      price,
      quantity,
    });
    res.status(201).json(product);
    } else {
      res.status(404).json({ error: "duplicate product name" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateProductBySku: RequestHandler = async (req: Request, res: Response) => {
  const { sku } = req.params;
  const { productName, category, price, quantity } = req.body;
  if (!productName || !category || !price || !quantity ) {
    return res.status(404).json({
      error: ' Input field must not be empty ! ',
    });
  }
  const product = await Product.findOneAndUpdate(
    { sku: String(sku) },
    {
      productName,
      category,
      price,
      quantity,
    },
    { new: true },
  ).exec();
  if (!product) {
    return res.status(404).json({
      error: 'product not found !',
    });
  }
  return res.status(200).json(product);
};

const deleteProductBySku: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const CheckBySku = await Product.findOne({
      sku: String(sku)
    });
    if (CheckBySku) {
      await Product.deleteOne({
        sku: String(sku)
      });
      res.status(204).json({ message: 'deleted' });
    } else {
      res.status(404).json({ error: `${sku} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export { getAllProducts, getProductBySku, createProduct, updateProductBySku, deleteProductBySku };
