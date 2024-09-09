import { Router } from 'express';
import {
  getAllAnswers,
  createAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer
} from '../controllers/answersController';

const router = Router();

router.get('/', getAllAnswers);
router.post('/', createAnswer);
router.get('/:id', getAnswerById);
router.put('/:id', updateAnswer);
router.delete('/:id', deleteAnswer);

export default router;
