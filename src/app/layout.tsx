import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { ThemeProvider } from "../components/ui/theme-provider"
import SidebarPage from "../pages/sidebar/page"

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark">
    <SidebarProvider>
      <SidebarPage />
      <main>
        <Outlet/>
      </main>
    </SidebarProvider>
    </ThemeProvider>
  )
}
