import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deyan Peshev | AI Infrastructure & Cloud-Native Engineer",
  description: "Enterprise infrastructure, GPU-accelerated AI systems, cloud-native engineering and DevOps.",
  metadataBase: new URL("https://deyanpeshev.vercel.app"),
  openGraph: {
    title: "Deyan Peshev | AI Infrastructure & Cloud-Native Engineer",
    description: "Building intelligent infrastructure. Engineering scalable AI systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
