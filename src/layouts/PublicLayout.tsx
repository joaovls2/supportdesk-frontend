import type { ReactNode } from "react";
import { Header } from "../components/layout/Header";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}