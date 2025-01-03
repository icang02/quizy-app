"use client";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  packageId: z.number(),
  name: z
    .string()
    .min(3, { message: "Masukkan minimal 3 karakter." })
    .max(50, "Maksimal 50 karakter."),
});

export default function FormStoreAttempt({ packageId }: { packageId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: packageId,
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/attempt/store", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data: attempt } = await res.json();
      const newAttemptId = attempt.id;
      router.replace(`/ujian/${newAttemptId}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nama lengkap"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            disabled={isPending}
            onClick={() => router.push("/")}
            type="button"
          >
            Kembali
          </Button>
          <Button disabled={isPending} variant={"destructive"} type="submit">
            Mulai Ujian
          </Button>
        </div>
      </form>
    </Form>
  );
}
