import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-shell";
import "./globals.css";

const siteUrl = "https://www.vbspu-pyq-hub.online";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VBSPU PYQ Hub",
  url: siteUrl,
  logo: `${siteUrl}/vbspupyqhub.png`,
  sameAs: ["https://github.com/Vaibhav-221/VBSPU-PYQ-Hub"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VBSPU PYQ Hub | Prepare smarter",
    template: "%s | VBSPU PYQ Hub",
  },
  description:
    "Browse and download VBSPU previous year question papers, organized by semester and subject. Free exam preparation resources for every student.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "VBSPU PYQ Hub",
    description: "Free, organized previous year question papers for VBSPU students.",
    url: "https://www.vbspu-pyq-hub.online",
    siteName: "VBSPU PYQ Hub",
    type: "website",
    images: [
      {
        url: "/vbspupyqhub.png",
        width: 1312,
        height: 1199,
        alt: "VBSPU PYQ Hub logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/vbspupyqhub.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <main className="min-h-[65vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
