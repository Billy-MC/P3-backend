import { Request, RequestHandler, Response } from 'express';
import Product from '../models/products.model';

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  const product: Object = await Product.find().exec();
  return res.status(200).json(product);
}

const getProductById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId } = req.body;
  if(!productId) {
    return res.status(404).json({
      error: " product id can not be empty ! "
    })
  }
  const product = await Product.findById(id).exec();
  if (!product) {
    return res.status(404).json({
      error: "product can not found !"
    })
  }
  return res.status(200).json(product);
}

const addProduct: RequestHandler = async (req: Request, res: Response) => {
  const {
    productId,
    productName,
    categoary,
    quantity,
    description,
  } = req.body;
  if(!productName || !categoary || !quantity) {
    return res.status(404).json({
      error: " Input field must not be empty ! "
    })
  }
  const product = new Product({
    productId,
    productName,
    categoary,
    quantity,
    description,
  })

  await product.save();
  return res.status(200).json(product);
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
  if(!productName || !categoary || !quantity) {
    return res.status(404).json({
      error: " Input field must not be empty ! "
    })
  }
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
  return res.status(200).json(product);
}

const deleteProductById: RequestHandler = async (req: Request, res: Response) => {
  const {
    id
  } = req.params;
  const product = await Product.findOneAndDelete({productId:id}).exec();
  if (!product) {
    return res.status(404).json({
      error: "product not found "
    })
  }
  return res.status(204).json({
    message : " Successfully deleted "
  })
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};