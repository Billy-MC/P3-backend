import { Request, RequestHandler, Response } from 'express';
import Product from '../models/products.model';

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  const product: Object = await Product.find().exec();
  return res.json(product);
}

const getProductById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  if (!product) {
    return res.status(404).json({
      error: "product not found !"
    })
  }
  return res.json(product);
}

const addProducts: RequestHandler = async (req: Request, res: Response) => {
  const {
    productId,
    productName,
    categoary,
    quantity,
    description,
  } = req.body;
  const product = new Product({
    productId,
    productName,
    categoary,
    quantity,
    description,
  })

  await product.save();
  return res.status(201).json(product);
}

const updateProductById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    productId,
    productName,
    categoary,
    quantity,
    description,
  } = req.body;
  const product = await Product.findByIdAndUpdate(id, {
    productId,
    productName,
    categoary,
    quantity,
    description,
  }, { new: true }).exec();
  if (!product) {
    return res.status(404).json({
      error: "product not found !"
    })
  }
  return res.json(product);
}

const deleteProductById: RequestHandler = async (req: Request, res: Response) => {
  const {
    id
  } = req.params;
  const product = await Product.findOneAndDelete().exec();
  if (!product) {
    return res.status(404).json({
      error: "product not found "
    })
  }
  return res.sendStatus(204);
}

export {
  getAllProducts,
  getProductById,
  addProducts,
  updateProductById,
  deleteProductById,
};