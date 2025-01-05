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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

export default function BtnDeletePackage({ packageId }: { packageId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = () => {
    startTransition(async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API + `/admin/package/${packageId}/destroy`,
        { method: "DELETE" }
      );
      const data = await response.json();

      toast(data.message, {
        description: Date(),
        action: {
          label: "Tutup",
          onClick: () => "",
        },
      });
      router.replace("/dashboard/paket-soal");
      setOpen(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild={true}>
        <Button size={"sm"} variant={"destructive"}>
          <Trash2 /> <span className="hidden md:inline">Hapus Paket</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>
            <b>Perhatian!</b> Seluruh data yang terkait dengan paket ini juga
            akan ikut terhapus. Klik tombol di bawah untuk melanjutkan.
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
