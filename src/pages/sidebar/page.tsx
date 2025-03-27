/* eslint-disable react/react-in-jsx-scope */
import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { SectionCards } from "@/components/app-sidebar/section-card"
import { SidebarInset } from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "../../components/app-sidebar/components/chart-area"
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
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      </>
  )
}
