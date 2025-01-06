// lib/utils/questionUtils.ts
import type { Question, QuestionOption } from '../types/spiral';

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getQuestionWithShuffledOptions(question: Question): Question {
  return {
    ...question,
    options: shuffleArray(question.options)
  };
}

// Get a random selection of questions with shuffled options
export function getRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffledQuestions = shuffleArray(questions).slice(0, count);
  return shuffledQuestions.map(getQuestionWithShuffledOptions);
}

// Get questions by category with shuffled options
export function getQuestionsByCategory(questions: Question[], category: string): Question[] {
  return questions
    .filter(q => q.category === category)
    .map(getQuestionWithShuffledOptions);
}
