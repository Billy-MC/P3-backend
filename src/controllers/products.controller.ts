import { Request, RequestHandler, Response } from 'express';
import Product from '@models/products.model';
import { IProduct } from '../types/products';
import  { isEmpty } from 'lodash';


const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  try{
    const product = await Product.find().exec();
    return res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
}

const getProductById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if(isEmpty(id)){
    return res.status(404).json({
      error: "ID can not found !"
    })
  }
  const productById = await Product.findOne({
    productId: String(id)
  });
  if (!productById) {
    return res.status(404).json({
      error: "product can not found !"
    })
  }
  return res.status(200).json(productById);
}

const createProduct: RequestHandler = async (req: Request, res: Response) => {
  const {
    productId,
    productName,
    category,
    price,
    quantity,
    description,
  } = req.body;
  if(!productName || !category || !quantity || !price) {
    return res.status(404).json({
      error: " Input field must not be empty ! "
    })
  }
  const product: IProduct = await Product.create({
    productId,
    productName,
    category,
    price,
    quantity,
    description,
  })
  return res.status(200).json(product);
}

const updateProductById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    productName,
    category,
    quantity,
    price,
    description,
  } = req.body;
  if(!productName || !category || !quantity || !price) {
    return res.status(404).json({
      error: " Input field must not be empty ! "
    })
  }
  const product = await Product.findOneAndUpdate({ productId: String(id)}, {
    productName,
    category,
    price,
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
  const product = await Product.findOneAndDelete({productId:String(id)}).exec();
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
  createProduct,
  updateProductById,
  deleteProductById,
}