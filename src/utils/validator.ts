import Product from '@models/products.model';
import { IProduct } from 'order';

// /**
//  * @description
//  * @param IProducts[]
//  * @return true if all input product's quantity is greater than inventory's(Database) quantity
//  */
// const productStockFullfiiled = async (products: IProduct[]): Promise<boolean> => {
//   try {
//     const result = products.reduce(async (prev: boolean, selectedProduct: IProduct) => {
//       const query = await Product.findOne({ sku: String(selectedProduct.sku) });
//       if (!query) return prev && false;
//       return prev && query.quantity >= selectedProduct.quantity;
//     }, true);
//   } catch (e) {
//     return false;
//   }
// };

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

export { validatePassword, validateEmail };
