import express from 'express';
import IndexController from '../controllers/index.controller';

const router = express.Router();

/* GET home page. */
router.get('/', IndexController);

export default router;
