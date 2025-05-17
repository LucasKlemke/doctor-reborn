import type { Metadata } from "next";
import AuthGuard from "@/components/auth-guard";


export const metadata: Metadata = {
  title: "Doctor Reborn",
  description: "Uma IA especializada em cuidados, dicas e informações para bebês reborn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
         <AuthGuard>     {children} </AuthGuard>
   

  );
}
