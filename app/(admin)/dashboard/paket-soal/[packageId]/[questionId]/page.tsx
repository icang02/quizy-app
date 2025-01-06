import Link from "next/link";
import { Question } from "@/types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormEditQuestion from "./FormEditQuestion";

type Params = Promise<{ packageId: string; questionId: string }>;

const fetchData = async (id: number) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API + "/admin/question/" + id
  );
  const resJson = await res.json();
  return resJson;
};

export default async function page({ params }: { params: Params }) {
  const { packageId, questionId } = await params;

  const data = await fetchData(Number(questionId));
  const { data: question }: { data: Question } = data;

  return (
    <>
      <div className="flex items-start md:items-center gap-6 md:gp-0 justify-between flex-col md:flex-row">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard/paket-soal"}>Paket Soal</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild={true}>
                <Link href={"/dashboard/paket-soal/" + packageId}>
                  Data Paket
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-7">
        <Card>
          <CardHeader>
            <CardTitle className="leading-tight flex items-center justify-between">
              Edit Pertanyaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormEditQuestion packageId={packageId} question={question} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
