import { Metadata } from 'next';
import Nav from "./Nav";
import DarkFooter from "../darkFooter";
import Hero from "./Hero";
import Features from "./Features";
import OpenSource from "./OpenSource";
import UseCases from "./UseCases";
import CTASection from "./CTASection";

export const metadata: Metadata = {
  title: 'About AirTally - Modern Open Source Counter App',
  description: 'AirTally is a modern, open-source counter app with cloud sync, beautiful interface, and powerful features. Perfect for inventory, sports, events, and more.',
  keywords: 'counter app, tally counter, digital counter, open source counter, inventory counter',

  icons: {
    icon: "/favicon.ico",
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Nav />
      <Hero />
      <Features />
      <OpenSource />
      <UseCases />
      <CTASection />
      <DarkFooter />
    </main>
  );
}