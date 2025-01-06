"use client";
import { useEffect } from "react";
import { getLocalUserAnswers, getSelectedAnswerid } from "@/lib/constant";
import { Attempt } from "@/types";

import {
  useCurrentQuestionStore,
  useNumberQuestionStore,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "@/hooks/store";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const originalArray = attempt.package.questions; // Array [1, 2, ..., 36]
  const chunkSize = 12;
  const result = [];

  // Membagi array menjadi beberapa kelompok
  for (let i = 0; i < originalArray.length; i += chunkSize) {
    result.push(originalArray.slice(i, i + chunkSize));
  }

  return (
    <div className="w-fuil md:w-1/4 bg-gray-50 p-3 md:p-4 border-b md:border-r">
      <h2 className="text-lg font-bold mb-4">Navigasi Soal</h2>
      <Carousel className="block md:hidden">
        <CarouselContent>
          {result.map((item, indexResult) => (
            <CarouselItem key={indexResult}>
              <div className="grid grid-cols-6 md:grid-cols-5 gap-1">
                {item.map((q, index) => (
                  <Button
                    onClick={() =>
                      changeQuestion(indexResult * chunkSize + index)
                    }
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
                    {indexResult * chunkSize + index + 1}
                  </Button>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      <div className="hidden md:grid grid-cols-6 md:grid-cols-5 gap-1">
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
