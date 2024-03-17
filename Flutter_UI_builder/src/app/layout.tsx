import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Builder",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        {children}
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
      </body>
    </html>
  );
}
