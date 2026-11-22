import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Learn how VBSPU PYQ Hub handles website visits, contact form messages, and voluntary payments.",
};

const sections = [
  {
    title: "1. Overview",
    body: "VBSPU PYQ Hub provides free academic resources for students of Veer Bahadur Singh Purvanchal University. This policy explains how information may be handled when you browse the website or choose to contact or support the project.",
  },
  {
    title: "2. Information you provide",
    body: "If you send a message, the name, email address, and message you submit are processed by EmailJS so the team can receive and answer your inquiry. Newsletter subscriptions are sent to Web3Forms when the service is configured.",
  },
  {
    title: "3. Technical and usage information",
    body: "The website host and infrastructure providers may process standard request information, such as browser and server logs, to operate and protect the service. The browser also stores a small download counter and support-prompt preference locally.",
  },
  {
    title: "4. Cookies and advertising",
    body: "Third-party services may use cookies or similar technologies subject to their own policies. Where Google AdSense is enabled, Google may use advertising cookies. You can manage cookies in your browser settings.",
  },
  {
    title: "5. Voluntary Razorpay payments",
    body: "Contributions are optional and are processed by Razorpay. The site receives payment identifiers and a signature for server-side verification; payment card or banking details are handled by Razorpay and are not stored by this project.",
  },
  {
    title: "6. Contact forms",
    body: "Contact form details are transmitted to EmailJS to deliver your message. Please avoid including passwords, payment details, or other sensitive information in a message.",
  },
  {
    title: "7. External links",
    body: "Links to the university, GitHub, and other external websites are provided for convenience. Those services have separate privacy policies and practices.",
  },
  {
    title: "8. Children’s privacy",
    body: "This academic resource website is not designed to collect personal information from children. If you believe a child has submitted personal information, contact us so we can review the request.",
  },
  {
    title: "9. Your choices and contact",
    body: "You may contact us to ask about a message you submitted or request its deletion where applicable. Your rights depend on your location and applicable law.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300"><ShieldCheck size={19} /></div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Privacy</p>
        <h1 className="mt-3 text-4xl font-medium leading-[1.05] tracking-[-0.055em] text-white sm:text-6xl">Privacy policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: November 2026</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl space-y-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.09]">
        {sections.map((section) => (
          <section key={section.title} className="bg-[#080808] p-5 sm:p-6">
            <h2 className="text-sm font-medium text-zinc-100">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{section.body}</p>
          </section>
        ))}
        <div className="flex flex-col gap-3 bg-[#080808] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-6 text-zinc-300">Questions about privacy or a message you sent us?</p>
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white" href="/contact">Contact us <ArrowUpRight size={14} /></Link>
        </div>
        <p className="bg-[#080808] px-5 pb-5 text-xs leading-5 text-zinc-600 sm:px-6 sm:pb-6">
          Service policies: <a className="text-zinc-300 hover:text-white hover:underline" href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer">Razorpay</a> · <a className="text-zinc-300 hover:text-white hover:underline" href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noreferrer">EmailJS</a> · <a className="text-zinc-300 hover:text-white hover:underline" href="https://web3forms.com/privacy" target="_blank" rel="noreferrer">Web3Forms</a>
        </p>
      </div>
    </div>
  );
}
