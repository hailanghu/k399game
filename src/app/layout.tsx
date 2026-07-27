import { Inter } from "next/font/google";
import "./globals.css";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.className} bg-dark-950 text-dark-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
