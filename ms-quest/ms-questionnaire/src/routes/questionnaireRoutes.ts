import { Router } from 'express';
import {
  getAllQuestionnaires,
  createQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire
} from '../controllers/questionnaireController';

const router = Router();

router.get('/', getAllQuestionnaires);
router.post('/', createQuestionnaire);
router.get('/:id', getQuestionnaireById);
router.put('/:id', updateQuestionnaire);
router.delete('/:id', deleteQuestionnaire);

export default router;
