import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoginDataForm from "./login-data-form";
import BtnGoogle from "./btn-google";

export function LoginForm() {
  return (
    <Card>
      <CardContent>
        <div className="py-6 px-3">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 items-center text-center">
              <div>
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
            </div>

            <LoginDataForm />

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div className="grid grid-cols-1">
              <BtnGoogle />
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
