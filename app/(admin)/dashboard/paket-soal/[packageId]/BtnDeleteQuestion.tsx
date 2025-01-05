"use client";
import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function BtnDeleteQuestion({
  questionId,
}: {
  questionId: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/question/${questionId}/destroy`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      toast(data.message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });
      router.refresh();
      setOpen(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild={true}>
        <Badge className="cursor-pointer" variant={"destructive"}>
          <Trash size={15} />
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Perhatian!</b> Pernyataan ini akan dihapus. Klik tombol di bawah
            untuk melanjutkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={handleDelete}>
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
