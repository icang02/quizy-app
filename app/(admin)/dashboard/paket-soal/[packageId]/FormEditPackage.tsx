"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PenLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Form = {
  id: number;
  name: string;
  description: string;
};

export default function FormEditPackage({ id, name, description }: Form) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: name,
    description: description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API + `/admin/package/${id}/update`,
        {
          method: "PATCH",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { message } = await response.json();

      toast(message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });

      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"warning"}
          onClick={() => setIsOpen(true)}
          type="button"
          size={"sm"}
        >
          <PenLine /> <span className="hidden md:inline">Edit Paket</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Paket Soal</DialogTitle>
            <DialogDescription>Isi data lalu klik simpan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Paket
              </Label>
              <Input
                onChange={handleChange}
                id="name"
                value={form.name}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                onChange={handleChange}
                id="description"
                rows={4}
                value={form.description}
                className="col-span-3"
                required
                maxLength={120}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isPending} type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
