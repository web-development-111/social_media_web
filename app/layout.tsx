import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/SessionProvider";
import LeftSidebar from "@/components/LeftSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Media App",
  description: "A modern social media app powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              <NavBar />
              <main className="flex flex-1 justify-center">
                <div className="max-w-7xl w-full flex">
                  {/* Left Sidebar (Fixed) */}
                  <aside className="hidden lg:flex w-1/4 h-screen sticky top-0">
                    <LeftSidebar />
                  </aside>

                  {/* Main Content (Scrollable, Separated Box) */}
                  <section className="flex-1 max-w-[600px] border-x border-b h-full overflow-y-auto">
                    {children}
                  </section>

                  {/* Right Sidebar (Fixed) */}
                  <aside className="hidden lg:flex w-1/4 h-screen sticky top-0">
                    <Sidebar />
                  </aside>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
