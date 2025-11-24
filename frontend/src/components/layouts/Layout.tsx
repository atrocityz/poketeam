import type { ReactNode } from "react"

import { Header } from "@/components/layouts"

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-8">{children}</main>
    </>
  )
}
