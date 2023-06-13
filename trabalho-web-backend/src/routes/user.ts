import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { CardControler } from '../controllers/CardController';

// Create an Express application instance
const router = Router();

// Routes
// - User routes
router.post('/', UserController.create);
router.post('/authenticate', UserController.authenticate);

// - Card routes
router.get('/:user_id/cards', CardControler.index);
router.post('/:user_id/cards', CardControler.create);
router.delete('/:user_id/cards/:id', CardControler.destroy);

export { router };
