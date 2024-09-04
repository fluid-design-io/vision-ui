import "./global.css";
import "@/app/vision-pro-ui.css";

import { RootProvider } from "fumadocs-ui/provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Vision UI",
  description: "UI Experiment for Vision OS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
} satisfies Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider
          theme={{
            themes: ["dark"],
            defaultTheme: "dark",
            enableColorScheme: false,
            enableSystem: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
