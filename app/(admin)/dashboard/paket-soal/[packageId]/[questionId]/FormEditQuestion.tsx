"use client";
import { useState, useTransition } from "react";

import { CirclePlus } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function FormEditQuestion({ packageId, question }: any) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    id: question.id,
    question: question.question,
    answers: question.answers,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnswerChange = (id: number) => {
    setForm((prev) => ({
      ...prev,
      answers: prev.answers.map((answer: any) => ({
        ...answer,
        isCorrect: answer.id === id,
      })),
    }));
  };

  const handleAnswerTextChange = (id: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      answers: prev.answers.map((answer: any) =>
        answer.id === id ? { ...answer, answer: value } : answer
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    startTransition(async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + `/admin/question/update`,
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data, message } = await res.json();
      toast(message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });
      console.log(data);
    });
  };

  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      answers: [
        ...prev.answers,
        {
          id: 0,
          questionId: prev.id,
          answer: "",
          isCorrect: false,
        },
      ],
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-3">
          <Label>Pertanyaan</Label>
          <Textarea
            className="text-sm leading-normal"
            name="question"
            value={form.question}
            placeholder="Pertanyaan"
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="mb-7 flex flex-col gap-3">
          <Label>Jawaban</Label>
          <RadioGroup>
            {form.answers.map((q: any, index: any) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  onClick={() => handleAnswerChange(q.id)}
                  id={q.id.toString()}
                  value={q.id.toString()}
                  checked={q.isCorrect}
                />
                <Label
                  htmlFor={q.id.toString()}
                  className="py-0.5 text-[13.5px] md:text-sm w-[85%] md:w-[95%]"
                >
                  <Input
                    className="text-sm"
                    value={q.answer}
                    onChange={(e) =>
                      handleAnswerTextChange(q.id, e.target.value)
                    }
                  />
                </Label>
                {form.answers.length - 1 == index && (
                  <CirclePlus
                    size={22}
                    onClick={addOption}
                    className="text-slate-500 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-row gap-2">
          <Link href={`/dashboard/paket-soal/${packageId}`}>
            <Button disabled={isPending} size={"sm"}>
              Kembali
            </Button>
          </Link>
          <Button
            disabled={isPending}
            type="submit"
            size={"sm"}
            variant={"warning"}
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
}
