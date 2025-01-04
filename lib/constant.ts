import { UserAnswer } from "@/types";

export const getLocalUserAnswers = (attemptId: number) => {
  const allUserAnswers = JSON.parse(
    localStorage.getItem("userAnswers") ?? "[]"
  );

  const userAnswers = allUserAnswers.filter(
    (item: UserAnswer) => item.attemptId == attemptId
  );

  return userAnswers;
};

export const getAllLocalUserAnswers = () => {
  const allUserAnswers = JSON.parse(
    localStorage.getItem("userAnswers") ?? "[]"
  );

  return allUserAnswers;
};

export const getSelectedAnswerid = (
  dataAnswers: UserAnswer[],
  questionId: number
) => {
  const selectedAnswerId =
    dataAnswers.find((item) => item.questionId == questionId)?.answerId ?? "";

  return selectedAnswerId;
};

export const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const ucFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
