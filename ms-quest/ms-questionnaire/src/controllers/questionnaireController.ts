import { Request, Response } from 'express';
import Questionnaire from '../models/questionnaire';

export const getAllQuestionnaires = async (req: Request, res: Response) => {
  try {
    const questionnaires = await Questionnaire.find();
    res.json(questionnaires);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createQuestionnaire = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newQuestionnaire = new Questionnaire({ title, description });
    await newQuestionnaire.save();
    res.status(201).json(newQuestionnaire);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getQuestionnaireById = async (req: Request, res: Response) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);
    if (questionnaire) {
      res.json(questionnaire);
    } else {
      res.status(404).json({ message: 'Questionnaire not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateQuestionnaire = async (req: Request, res: Response) => {
  try {
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedQuestionnaire) {
      res.json(updatedQuestionnaire);
    } else {
      res.status(404).json({ message: 'Questionnaire not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteQuestionnaire = async (req: Request, res: Response) => {
  try {
    const deletedQuestionnaire = await Questionnaire.findByIdAndDelete(req.params.id);
    if (deletedQuestionnaire) {
      res.json({ message: 'Questionnaire deleted' });
    } else {
      res.status(404).json({ message: 'Questionnaire not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
