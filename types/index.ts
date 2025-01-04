export type Package = {
  id: number;
  name: string;
  slug: string;
  description: string;
  questions: Question[];
};

export type Question = {
  id: number;
  packageId?: number;
  question: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  answer: string;
  questionId: number;
  isCorrect?: boolean;
};

export type Attempt = {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  score: number;
  status: boolean;
  package: Package;
};

export type UserAnswer = {
  id?: number;
  attemptId: number;
  questionId: number;
  answerId: string;
};

// Type store
export type NumberQuestionStore = {
  numberQuestion: number;
  updateNumberQuestion: (newValue: number) => void;
};

export type CurrentQuestionStore = {
  currentQuestion: Question;
  updateCurrentQuestion: (newValue: Question) => void;
};

export type SelectedAnswerIdStore = {
  selectedAnswerId: string;
  updateSelectedAnswerId: (newValue: string) => void;
};

export type UserAnswersStore = {
  userAnswers: UserAnswer[];
  updateUserAnswers: (newValue: UserAnswer[]) => void;
};

export type FinishedTimeExamStore = {
  finishedTimeExam: boolean;
  updateFinishedTimeExam: (newValue: boolean) => void;
};
