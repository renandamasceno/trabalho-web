import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController';

// Create an Express application instance
const router = Router();

// Routes
router.get('/', ServiceController.index);

export { router };
