import express from 'express';
import connectDB from './database';
import questionnaireRoutes from './routes/questionnaireRoutes';
import answersRoutes from './routes/answersRoutes';

const app = express();

app.use(express.json());

connectDB();

app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/answers', answersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
