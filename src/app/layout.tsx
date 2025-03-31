/* eslint-disable react/react-in-jsx-scope */
import { SidebarProvider } from "@/components/ui/sidebar"
import { ToastProvider } from "@radix-ui/react-toast"
import { Toaster } from "sonner"
import { ThemeProvider } from "../components/ui/theme-provider"
import SidebarPage from "../pages/sidebar/page"

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ToastProvider>
    <SidebarProvider>
      <SidebarPage />
      <main>
        <Toaster />
      </main>
    </SidebarProvider>
    </ToastProvider>
    </ThemeProvider>
  )
}
