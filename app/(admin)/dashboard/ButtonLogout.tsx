import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function ButtonLogout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button className="flex items-center justify-center gap-2">
        <LogOut className="mt-0.5 text-gray-600 size-4" />
        <span>Logout</span>
      </button>
    </form>
  );
}
