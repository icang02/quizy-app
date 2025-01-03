import Link from "next/link";

import { Package } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const fetchData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API + "/packages");
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return resJson;
};

export default async function Home() {
  const resJson = await fetchData();
  const { data: packages }: { data: Package[] } = resJson;

  return (
    <div className="px-5 md:px-0 mt-10 md:mt-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle> {pkg.name} </CardTitle>
              <CardDescription>
                {pkg.questions.length === 0 ? (
                  <span>Belum ada soal.</span>
                ) : (
                  <span>
                    Terdiri dari {pkg.questions.length} nomor soal latihan.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Try Out</p>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {pkg.questions.length === 0 ? (
                <Button disabled className="w-fit">
                  Kerjakan
                </Button>
              ) : (
                <Link href={`/paket-soal/${pkg.slug}`}>
                  <Button className="w-fit">Kerjakan</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
