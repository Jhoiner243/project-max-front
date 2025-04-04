/* eslint-disable react/react-in-jsx-scope */
import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { SiteHeader } from "../../components/app-sidebar/components/site-header"


export default function SidebarPage() {
  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      </>
  )
}
