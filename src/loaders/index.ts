import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  await mongooseLoader();
};
