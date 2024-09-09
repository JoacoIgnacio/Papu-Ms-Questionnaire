import { Request, Response } from 'express';
import Answer from '../models/answers';

export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    const answers = await Answer.find();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const createAnswer = async (req: Request, res: Response) => {
  const { questionnaireId, answerText } = req.body;

  try {
    const newAnswer = new Answer({ questionnaireId, answerText });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (answer) {
      res.json(answer);
    } else {
      res.status(404).json({ message: 'Answer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedAnswer) {
      res.json(updatedAnswer);
    } else {
      res.status(404).json({ message: 'Answer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);
    if (deletedAnswer) {
      res.json({ message: 'Answer deleted' });
    } else {
      res.status(404).json({ message: 'Answer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
