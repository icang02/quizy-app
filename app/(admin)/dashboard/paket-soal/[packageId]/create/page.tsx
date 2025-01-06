import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormAddQuestion from "./FormAddQuestion";

type Params = Promise<{ packageId: string }>;

export default async function page({ params }: { params: Params }) {
  const { packageId } = await params;

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
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-7">
        <Card>
          <CardHeader>
            <CardTitle className="leading-tight flex items-center justify-between">
              Tambah Pertanyaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormAddQuestion packageId={Number(packageId)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
