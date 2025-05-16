import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";
import { Header } from "@/components/layout/Header";

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
          <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Header />

            <aside className="fixed top-20 right-0 w-20 h-[calc(100vh-80px)] border-l flex flex-col items-center justify-start gap-2 py-4 bg-background">
              <NavIcon icon="👤" label="Profile" />
              <NavIcon icon="🔍" label="Explore" />
              <NavIcon icon="👕" label="Garments" />
              <NavIcon icon="⚙️" label="Settings" />
            </aside>

            <main className="mt-20 pr-20 h-[calc(100vh-80px)] overflow-y-auto px-6">
              {children}
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}

function NavIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="w-12 h-12 rounded-md flex items-center justify-center border hover:bg-muted transition"
      title={label}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );
}
