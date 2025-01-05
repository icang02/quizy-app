"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function TableColAnswer({
  answer,
  index,
}: {
  answer: string;
  index: number;
}) {
  // State untuk melacak apakah jawaban terlihat
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>(
    {}
  );

  const toggleAnswerVisibility = (index: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isVisible = visibleAnswers[index] || false;

  return (
    <div className="flex items-center gap-2">
      <span className={`${isVisible ? "blur-none" : "blur-sm"} transition`}>
        {answer}
      </span>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toggleAnswerVisibility(index)}
      >
        {isVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
