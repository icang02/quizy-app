"use client";
import Link from "next/link";
import { useState, useTransition } from "react";

import { CircleMinus, CirclePlus } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Answer {
  id: number;
  answer: string;
  isCorrect: boolean;
}

interface Form {
  id: number;
  question: string;
  answers: Answer[];
  deleteQuestion: number[]; // Harus berupa array of numbers
}

export default function FormEditQuestion({ packageId, question }: any) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<Form>({
    id: question.id,
    question: question.question,
    answers: question.answers,
    deleteQuestion: [],
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
    // return;

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
      const { message } = await res.json();
      toast(message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });
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

  const deleteOption = (id: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      answers: prevForm.answers.filter((a: any) => a.id !== id),
      deleteQuestion: [...prevForm.deleteQuestion, id],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-3">
        <Label>Pertanyaan</Label>
        <Textarea
          className="text-sm leading-snug md:leading-normal"
          name="question"
          value={form.question}
          placeholder="Pertanyaan"
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className="mb-7 flex flex-col gap-3">
        <Label>Jawaban</Label>
        <RadioGroup>
          {form.answers.map((a: any) => (
            <div className="flex items-center space-x-2" key={a.id.toString()}>
              <RadioGroupItem
                onClick={() => handleAnswerChange(a.id)}
                id={a.id.toString()}
                value={a.id.toString()}
                checked={a.isCorrect}
              />
              <Label
                htmlFor={a.id.toString()}
                className="py-0.5 text-[13.5px] md:text-sm w-[83%] md:w-[95%]"
              >
                <Input
                  className="text-sm"
                  value={a.answer}
                  onChange={(e) => handleAnswerTextChange(a.id, e.target.value)}
                />
              </Label>
              {form.answers[form.answers.length - 1].id == a.id ? (
                form.answers.length >= 5 ? (
                  <CircleMinus
                    size={20}
                    onClick={() => deleteOption(a.id)}
                    className="text-slate-400 cursor-pointer hover:text-slate-500"
                  />
                ) : (
                  <CirclePlus
                    size={20}
                    onClick={addOption}
                    className="text-slate-400 cursor-pointer hover:text-slate-500"
                  />
                )
              ) : (
                form.answers.length > 4 && (
                  <CircleMinus
                    size={20}
                    onClick={() => deleteOption(a.id)}
                    className="text-slate-400 cursor-pointer hover:text-slate-500"
                  />
                )
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
  );
}
