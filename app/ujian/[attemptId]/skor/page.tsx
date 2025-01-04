import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Attempt } from "@/types";
import ButtonRestart from "./ButtonRestart";

type Params = Promise<{ attemptId: string }>;

export default async function page({ params }: { params: Params }) {
  const { attemptId } = await params;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API + `/attempt/${attemptId}/score`
  );
  const { data: attempt }: { data: Attempt } = await res.json();

  return (
    <div className="px-5 md:px-0 max-w-lg mx-auto pt-10 md:pt-12 gap-8">
      <Card>
        <CardHeader>
          <CardTitle> {attempt.package.name} </CardTitle>
          <CardDescription>
            <p>Ujian Selesai</p>
            <p>
              Nama : <b>{attempt.name}</b>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <div className="rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Skor</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-4xl font-medium"> {attempt.score} </span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <ButtonRestart attemptId={parseInt(attemptId)} />
        </CardFooter>
      </Card>
    </div>
  );
}
