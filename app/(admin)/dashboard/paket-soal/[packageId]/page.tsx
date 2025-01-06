import Link from "next/link";

import { Package } from "@/types";
import { truncateSentences } from "@/lib/constant";

import {
  ArrowDownUp,
  ArrowUpDown,
  EllipsisVertical,
  FilePenLine,
  Plus,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import ButtonDeletePackage from "./BtnDeletePackage";
import TableColAnswer from "./TableColAnswer";
import FormEditPackage from "./FormEditPackage";
import ButtonDeleteQuestion from "./BtnDeleteQuestion";

type Params = Promise<{ packageId: string }>;
export default async function page({ params }: { params: Params }) {
  const { packageId } = await params;
  const response = await fetch(
    process.env.NEXT_PUBLIC_API + `/admin/package/${packageId}`
  );
  const { data: pkg }: { data: Package } = await response.json();

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
              <BreadcrumbPage>Data Paket</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link href={`/dashboard/paket-soal/${packageId}/create`}>
            <Button size={"sm"}>
              <Plus /> <span className="hidden md:inline">Tambah Soal</span>
            </Button>
          </Link>
          <Separator orientation="vertical" />
          <div className="flex space-x-1">
            <FormEditPackage
              id={pkg.id}
              name={pkg.name}
              description={pkg.description}
            />
            <ButtonDeletePackage packageId={pkg.id} />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <Card>
          <CardHeader>
            <CardTitle className="leading-tight flex items-center justify-between">
              {pkg.name}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <ArrowUpDown />
                      <span>Ascending</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ArrowDownUp />
                      <span>Descending</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pkg.questions.map((item, index) => (
              <div key={index} className="block md:hidden">
                <div>
                  <p className="text-gray-600 text-sm mb-3.5 leading-snug">
                    {truncateSentences(item.question, 100)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center gap-1">
                      <Link
                        href={`/dashboard/paket-soal/${packageId}/${item.id}`}
                      >
                        <Badge className="mt-0.5" variant={"warning"}>
                          <FilePenLine size={15} />
                        </Badge>
                      </Link>
                      <ButtonDeleteQuestion questionId={item.id} />
                    </div>
                    <span className="font-semibold text-xs text-gray-400">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                <hr className="mt-3 mb-2" />
              </div>
            ))}

            <Table className="hidden md:block">
              <TableCaption>List soal {pkg.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20px] md:w-[40px]">#</TableHead>
                  <TableHead>Soal</TableHead>
                  <TableHead>Jawaban</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pkg.questions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>
                      <TableColAnswer
                        index={index}
                        answer={
                          item.answers.find((a) => a.isCorrect)?.answer || ""
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right flex flex-col md:flex-row gap-1">
                      <Link
                        href={`/dashboard/paket-soal/${packageId}/${item.id}`}
                      >
                        <Badge variant={"warning"}>
                          <FilePenLine size={15} />
                        </Badge>
                      </Link>
                      <ButtonDeleteQuestion questionId={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
