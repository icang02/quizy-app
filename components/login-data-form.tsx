"use client";
import { useActionState } from "react";
import { loginCredentials } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginDataForm() {
  const [state, formAction, isPending] = useActionState(loginCredentials, null);
  return (
    <>
      {state?.message && (
        <Alert variant="destructive" className="text-start">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="flex flex-col gap-7">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="m@example.com"
          />
          <span className="text-red-500 text-sm">{state?.error?.email}</span>
        </div>
        <div>
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input name="password" id="password" type="password" />
          <span className="text-red-500 text-sm">{state?.error?.password}</span>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Login..." : "Login"}
        </Button>
      </form>
    </>
  );
}
