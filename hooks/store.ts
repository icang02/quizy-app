import { create } from "zustand";
import {
  CurrentQuestionStore,
  FinishedTimeExamStore,
  NumberQuestionStore,
  SelectedAnswerIdStore,
  UserAnswersStore,
} from "@/types";

// Global state for number question
export const useNumberQuestionStore = create<NumberQuestionStore>((set) => ({
  numberQuestion: 1,
  updateNumberQuestion: (newValue) => set(() => ({ numberQuestion: newValue })),
}));

// Global state for current question
export const useCurrentQuestionStore = create<CurrentQuestionStore>((set) => ({
  currentQuestion: {
    id: 0,
    question: "",
    answers: [],
  },
  updateCurrentQuestion: (newValue) =>
    set(() => ({ currentQuestion: newValue })),
}));

// Global state for user when selected answer
export const useSelectedAnswerIdStore = create<SelectedAnswerIdStore>(
  (set) => ({
    selectedAnswerId: "",
    updateSelectedAnswerId: (newValue) =>
      set(() => ({ selectedAnswerId: newValue })),
  })
);

// Global state for user to save answers
export const useUserAnswersStore = create<UserAnswersStore>((set) => ({
  userAnswers: [],
  updateUserAnswers: (newValue) => set(() => ({ userAnswers: newValue })),
}));

// Global state when exam time exam is done
export const useFinishedTimeExamStore = create<FinishedTimeExamStore>(
  (set) => ({
    finishedTimeExam: false,
    updateFinishedTimeExam: (newValue) =>
      set(() => ({ finishedTimeExam: newValue })),
  })
);
