import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/semester.html", destination: "/semesters", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/support.html", destination: "/support", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/maintinance.html", destination: "/materials", permanent: true },
      { source: "/maintenance.html", destination: "/materials", permanent: true },
      { source: "/subject.html", destination: "/subjects", permanent: true },
      { source: "/papers.html", destination: "/papers", permanent: true },
    ];
  },
};

export default nextConfig;
