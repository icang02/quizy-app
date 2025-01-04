"use client";
import { useEffect } from "react";
import { getLocalUserAnswers, getSelectedAnswerid } from "@/lib/constant";

import {
  useCurrentQuestionStore,
  useNumberQuestionStore,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "@/hooks/store";
import { Button } from "@/components/ui/button";
import { Attempt } from "@/types";

export default function Sidebar({ attempt }: { attempt: Attempt }) {
  const { updateNumberQuestion } = useNumberQuestionStore();
  const { userAnswers } = useUserAnswersStore();
  const { numberQuestion } = useNumberQuestionStore();
  const { updateCurrentQuestion } = useCurrentQuestionStore();
  const { updateUserAnswers } = useUserAnswersStore();
  const { updateSelectedAnswerId } = useSelectedAnswerIdStore();

  const changeQuestion = (index: number) => {
    const newNumberQuestion = index + 1;
    const newNextQuestion = attempt.package.questions[index];
    const dataAnswers = getLocalUserAnswers(attempt.id);

    if (dataAnswers.length != 0) {
      const selectedAnswerId = getSelectedAnswerid(
        dataAnswers,
        newNextQuestion.id
      );
      updateSelectedAnswerId(selectedAnswerId.toString());
    }

    updateNumberQuestion(newNumberQuestion);
    updateCurrentQuestion(newNextQuestion);
  };

  useEffect(() => {
    const dataAnswers = getLocalUserAnswers(attempt.id);
    updateUserAnswers(dataAnswers);
  }, []);

  return (
    <div className="w-fuil md:w-1/4 bg-gray-50 p-3 md:p-4 border-b md:border-r">
      <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>
      <div className="grid grid-cols-6 md:grid-cols-5 gap-1">
        {attempt.package.questions.map((q, index) => (
          <Button
            onClick={() => changeQuestion(index)}
            key={q.id}
            size={"sm"}
            variant={
              userAnswers.map((q) => q.questionId).includes(q.id)
                ? "success"
                : "destructive"
            }
            className={`${
              index === numberQuestion - 1 &&
              (userAnswers.some((ans) => ans.questionId === q.id)
                ? "bg-green-600/90"
                : "bg-destructive/90")
            } text-[10px] md:text-xs font-semibold select-none`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
