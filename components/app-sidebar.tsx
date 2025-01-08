"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  name?: string | null;
};

export function AppSidebar({ name, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  // This is sample data.
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            isActive: pathname == "/dashboard" && true,
          },
        ],
      },
      {
        title: "Main Menu",
        url: "/dashboard",
        items: [
          {
            title: "Paket Soal",
            url: "/dashboard/paket-soal",
            isActive: pathname.startsWith("/dashboard/paket-soal") && true,
          },
          {
            title: "Pengaturan",
            url: "/dashboard/pengaturan",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <Image
                  src={"/logo.jpeg"}
                  width={30}
                  height={30}
                  alt="logo"
                  className="rounded"
                  unoptimized
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Quizy</span>
                  <span>{name}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
