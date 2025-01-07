"use client";
import { useEffect, useTransition } from "react";
import { useRouter } from "nextjs-toploader/app";

import { Attempt, UserAnswer } from "@/types";

import {
  useCurrentQuestionStore,
  useFinishedTimeExamStore,
  useNumberQuestionStore,
  useSelectedAnswerIdStore,
  useUserAnswersStore,
} from "@/hooks/store";
import { getLocalUserAnswers, getSelectedAnswerid } from "@/lib/constant";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Content({ attempt }: { attempt: Attempt }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { finishedTimeExam, updateFinishedTimeExam } =
    useFinishedTimeExamStore();
  const { currentQuestion, updateCurrentQuestion } = useCurrentQuestionStore();
  const { numberQuestion, updateNumberQuestion } = useNumberQuestionStore();
  const { userAnswers, updateUserAnswers } = useUserAnswersStore();
  const { selectedAnswerId, updateSelectedAnswerId } =
    useSelectedAnswerIdStore();

  useEffect(() => {
    const dataAnswers = getLocalUserAnswers(attempt.id);
    if (dataAnswers.length != 0) {
      const selectedAnswerId = getSelectedAnswerid(
        dataAnswers,
        currentQuestion.id ?? attempt.package.questions[numberQuestion - 1].id
      );

      updateSelectedAnswerId(selectedAnswerId.toString());
    }

    return () => {
      updateCurrentQuestion({ id: 0, question: "", answers: [] });
      updateNumberQuestion(1);
      updateUserAnswers([]);
      updateSelectedAnswerId("");
      setTimeout(() => {
        updateFinishedTimeExam(false);
      }, 700);
    };
  }, []);

  const handleNextQuestion = () => {
    const indexQuestion = attempt.package.questions.findIndex(
      (q) =>
        q.id == attempt.package.questions[numberQuestion - 1].id ||
        currentQuestion.id
    );

    if (
      indexQuestion !== -1 &&
      attempt.package.questions.length !== numberQuestion
    ) {
      const newNumberQuestion = numberQuestion + 1;
      const nextQuestion = attempt.package.questions[newNumberQuestion - 1];

      const dataAnswers = getLocalUserAnswers(attempt.id);
      if (dataAnswers.length != 0) {
        const selectedAnswerId = getSelectedAnswerid(
          dataAnswers,
          nextQuestion.id
        );
        updateSelectedAnswerId(selectedAnswerId.toString());
      }

      updateNumberQuestion(newNumberQuestion);
      updateCurrentQuestion(nextQuestion);
    }
  };

  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedAnswer: UserAnswer = {
      attemptId: attempt.id,
      questionId:
        attempt.package.questions[numberQuestion - 1].id ?? currentQuestion.id,
      answerId: selectedAnswerId,
    };

    // Ambil data lama dari localStorage
    const existingAnswers = JSON.parse(
      localStorage.getItem("userAnswers") ?? "[]"
    );

    // Cari indeks dari question_id yang sama
    const existingIndex = existingAnswers.findIndex(
      (answer: UserAnswer) =>
        answer.attemptId == attempt.id &&
        answer.questionId == updatedAnswer.questionId
    );
    if (existingIndex != -1) {
      existingAnswers[existingIndex] = updatedAnswer;
    } else {
      existingAnswers.push(updatedAnswer);
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("userAnswers", JSON.stringify(existingAnswers));

    const updatedUserAnswers = existingAnswers.filter(
      (item: UserAnswer) => item.attemptId == attempt.id
    );
    updateUserAnswers(updatedUserAnswers);
    handleNextQuestion();
  };

  const submitExam = () => {
    updateFinishedTimeExam(true);

    const userAnswers = getLocalUserAnswers(attempt.id);
    startTransition(async () => {
      await fetch(process.env.NEXT_PUBLIC_API + "/attempt/update", {
        method: "POST",
        body: JSON.stringify({
          attemptId: attempt.id,
          userAnswers: userAnswers,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.replace(`/ujian/${attempt.id}/skor`);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal text-sm md:text-base select-none">
          <div
            dangerouslySetInnerHTML={{
              __html:
                currentQuestion.question ||
                attempt.package.questions[numberQuestion - 1].question,
            }}
          ></div>
          {/* {currentQuestion.question ||
            attempt.package.questions[numberQuestion - 1].question} */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitAnswer} className="-mt-1.5">
          <RadioGroup className="w-fit">
            {(currentQuestion.answers.length == 0
              ? attempt.package.questions[numberQuestion - 1].answers
              : currentQuestion.answers
            ).map((q, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  onClick={() => updateSelectedAnswerId(q.id.toString())}
                  id={q.id.toString()}
                  value={q.id.toString()}
                  checked={q.id.toString() == selectedAnswerId}
                />
                <Label
                  htmlFor={q.id.toString()}
                  className="py-0.5 text-[13.5px] md:text-sm"
                >
                  <span className="leading normal md:leading-relaxed select-none">
                    {q.answer}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between select-none">
            <div>
              <Button
                disabled={!selectedAnswerId || isPending || finishedTimeExam}
                type="submit"
                size={"sm"}
                className="bg-blue-600 hover:bg-blue-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Simpan dan Lanjutkan
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={
                  attempt.package.questions.length === numberQuestion ||
                  isPending ||
                  finishedTimeExam
                }
                type="button"
                size={"sm"}
                className="ms-1.5 bg-yellow-600 hover:bg-yellow-600/90 text-white text-[10px] md:text-xs uppercase tracking-wider"
              >
                Lewatkan
              </Button>
            </div>

            {userAnswers.length === attempt.package.questions.length && (
              <div>
                <Button
                  disabled={isPending || finishedTimeExam}
                  onClick={submitExam}
                  type="button"
                  size={"sm"}
                  variant="destructive"
                  className="mt-1.5 md:mt-0 text-[10px] md:text-xs uppercase tracking-wider"
                >
                  Akhiri Ujian
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
