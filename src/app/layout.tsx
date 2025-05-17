import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";
import { Header } from "@/components/layout/Header";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";

export const metadata: Metadata = {
  title: "Pinkcollar",
  description: "What's your story?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <div className="min-h-screen w-full flex flex-row">
            <div className=" flex-4 flex flex-col border-0 border-black">
              {/* Header */}
              <div className="h-20 pl-16">
                <Header />
              </div>

              {/* Content */}
              <div className="flex-2 border-1 border-l-0 rounded-tl-none rounded-2xl border-black ">
                {children}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 pl-1">
              <SidebarNavigation />
            </div>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
