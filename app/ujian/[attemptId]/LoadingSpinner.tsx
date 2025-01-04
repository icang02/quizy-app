"use client";
import { Spinner } from "@/components/spinner";
import { useFinishedTimeExamStore } from "@/hooks/store";
import React from "react";

export default function LoadingSpinner() {
  const { finishedTimeExam } = useFinishedTimeExamStore();

  return (
    <div
      className={`absolute top-0 left-0 right-0 h-screen z-[99] transition-opacity duration-150 ${
        finishedTimeExam
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Latar belakang gelap dengan transisi */}
      <div className="bg-black/50 absolute inset-0 transition-all"></div>

      {/* Spinner */}
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Spinner />
      </div>
    </div>
  );
}
