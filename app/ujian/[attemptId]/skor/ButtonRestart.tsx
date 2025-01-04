"use client";

import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { getAllLocalUserAnswers } from "@/lib/constant";
import { UserAnswer } from "@/types";

export default function ButtonRestart({ attemptId }: { attemptId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const restartExam = () => {
    startTransition(async () => {
      await fetch(process.env.NEXT_PUBLIC_API + "/attempt/restart", {
        method: "POST",
        body: JSON.stringify({
          attemptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUserAnswers = getAllLocalUserAnswers();
      const filtered = allUserAnswers.filter(
        (item: UserAnswer) => item.attemptId != attemptId
      );
      localStorage.setItem("userAnswers", JSON.stringify(filtered));
      router.push(`/ujian/${attemptId}`);
    });
  };

  return (
    <>
      <Button
        onClick={restartExam}
        disabled={isPending}
        variant={"destructive"}
        className="w-fit"
      >
        Ulangi Ujian
      </Button>
      <Button
        disabled={isPending}
        onClick={() => router.push("/")}
        className="w-fit"
      >
        Selesai
      </Button>
    </>
  );
}
