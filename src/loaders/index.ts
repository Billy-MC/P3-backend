import expressLoader from './express';
import mongooseLoader from './mongoose';

exports.init = async expressApp => {
  await mongooseLoader();

  await expressLoader({ app: expressApp });
};
