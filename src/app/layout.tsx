
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "bootstrap/dist/css/bootstrap.min.css"
import {Providers}from './redux/providers'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greya Smart Composter",
  description: "A Smart IoT-Enabled Device for On-Site Wet Waste Processing and Home Composting",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>




<meta name="theme-color" content="#561b57" />


</head>
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       <Providers> {children}</Providers>
       
      
      </body>
    </html>
  );
}
