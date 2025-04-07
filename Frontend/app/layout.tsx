import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SourceShip.dev",
  description: "Build your portfolio through real-world impact",
  icons: {
    icon: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    images: ["/logo/logo_long.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Main layout (commented out for maintenance)
  /*
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo/logo.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights/>
        </ThemeProvider>
      </body>
    </html>
  );
  */

  // Maintenance mode
  return (
    <html lang="en">
      <body>
        <div>Under maintenance :) </div>
      </body>
    </html>
  );
}
