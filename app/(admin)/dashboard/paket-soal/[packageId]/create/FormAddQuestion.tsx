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
import { useRouter } from "next/navigation";

export default function FormAddQuestion({ packageId }: { packageId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    packageId: packageId,
    question: "",
    answers: Array.from({ length: 4 }, (_, index) => ({
      id: index,
      answer: "",
      isCorrect: false,
    })),
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
    const updatedForm = {
      ...form,
      answers: form.answers.map(({ id, ...rest }) => rest),
    };

    startTransition(async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API + `/admin/question/store`,
        {
          method: "POST",
          body: JSON.stringify(updatedForm),
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

      setForm({
        packageId: packageId,
        question: "",
        answers: Array.from({ length: form.answers.length }, (_, index) => ({
          id: index,
          answer: "",
          isCorrect: false,
        })),
      });
      router.refresh();
    });
  };

  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      answers: [
        ...prev.answers,
        {
          id: prev.answers[prev.answers.length - 1].id + 1,
          answer: "",
          isCorrect: false,
        },
      ],
    }));
  };

  const deleteOption = (id: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      answers: prevForm.answers.filter((a) => a.id !== id),
    }));
  };

  return (
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
          {form.answers.map((a) => (
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
          Simpan
        </Button>
      </div>
    </form>
  );
}
