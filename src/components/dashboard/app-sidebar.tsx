import * as React from "react"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import Logo from "../shared/logo"
// import { UpgradeBtn } from "@/components/pricing/upgrade-btn"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient()
  const { data:userData, error } = await supabase.auth.getClaims()
  if (error || !userData?.claims) {
    redirect('/signin')
  }

  // const { data: subscriptionData } = await supabase
  //   .from('subscriptions')
  //   .select('*')
  //   .eq('user_id', userData.user.id)
    
    
  const user = {
    name: userData.claims.user_metadata?.full_name ?? "",
    email: userData.claims.email ?? "",
  }

  // const activeSubscription = subscriptionData?.find((subscription: any) => subscription.status === 'active')
  
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
      <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-neutral-700 upper font-mont relative z-10"
            >
              <div className="size-9  rounded-lg flex items-center justify-center font-bold text-base sm:text-lg mr-1">
                <Logo className="size-7" />
              </div>
              <span className="hidden sm:inline">Headshot.AI</span>
              <span className="sm:hidden">Headshot.AI</span>
            </Link>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
      </SidebarContent>
      <SidebarFooter>
        {/* {activeSubscription?.status !== 'active' && (
            <UpgradeBtn 
              variant="default" 
              size="default" 
              className="w-full bg-primary hover:bg-primary/80 text-white rounded-sm py-5 cursor-pointer"
              text="Upgrade to Pro"
            />
        )} */}
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}