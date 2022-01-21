import Product from '@models/products.model';
import { IProduct } from 'order';

const inventoryFullfilled = async (products: IProduct[]): Promise<boolean> => {
  let check = true;
  products.forEach(async product => {
    const inventory = await Product.findOne({ sku: String(product.sku) });
    if (!inventory) check = false;
    if (product.quantity > inventory.quantity) check = false;
  });
  return check;
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^_&*])[a-zA-Z0-9!@#$%^_&*]{8,32}$/;
  const passwordValidataResult = passwordRegex.test(password);
  return passwordValidataResult;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailValidateResult = emailRegex.test(email);
  return emailValidateResult;
};

export { inventoryFullfilled, validatePassword, validateEmail };
