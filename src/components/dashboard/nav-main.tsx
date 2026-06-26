import {
  HomeIcon,
  ImageIcon,
  WandIcon,
  // WrenchIcon,
  Upload,
  MessageSquareIcon,
  PlusIcon
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ActiveLink from "./active-link";
// import { Badge } from "../ui/badge";

export function NavMain() {
  return (
    <div className="font-satoshi mx-2 group-data-[collapsible=icon]:mx-0">
      {/* HOME Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm my-2 font-semibold uppercase text-gray-400">HOME</SidebarGroupLabel>
        <SidebarGroupContent className="">
          <SidebarMenu>
            <ActiveLink href="/dashboard" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Overview">
                  <HomeIcon className="" />
                  <span className="text-base font-semibold">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
            <ActiveLink href="/albums" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="My Albums">
                  <ImageIcon className="" />
                  <span className="text-base font-semibold">My Albums</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
            <ActiveLink href="/uploads" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="My Uploads">
                  <Upload className="" />
                  <span className="text-base font-semibold">My Uploads</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
            <ActiveLink href="/photos" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Create More Photos">
                  <PlusIcon className="" />
                  <span className="text-base font-semibold">Create My Headshots</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* AI TOOLS Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm my-2 font-semibold uppercase text-gray-400">AI TOOLS</SidebarGroupLabel>
        <SidebarGroupContent className="">
          <SidebarMenu>
            <ActiveLink href="/editor" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="AI Editor">
                  <WandIcon className="" />
                  <span className="text-base font-semibold">AI Photo Editor</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
            {/* <ActiveLink href="/tools" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Tools">
                  <WrenchIcon className="" />
                  <span className="text-base font-semibold">Tools <Badge variant="secondary" className="text-sm rounded-full">Coming Soon</Badge></span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink> */}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* HELP Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm my-2 font-semibold uppercase text-gray-400">HELP</SidebarGroupLabel>
        <SidebarGroupContent className="">
          <SidebarMenu>
            <ActiveLink href="/feedback" className="">
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Share Feedback">
                  <MessageSquareIcon className="" />
                  <span className="text-base font-semibold">Share Feedback</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </ActiveLink>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}