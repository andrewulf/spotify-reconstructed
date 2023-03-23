import { Inter, Raleway } from "@next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import QueryProviderWrapper from "./QueryProviderWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${inter.variable} ${raleway.variable} font-raleway bg-grack-900 text-white flex`}
      >
        <Suspense fallback={<Loading />}>
          <QueryProviderWrapper>{children}</QueryProviderWrapper>
        </Suspense>
      </body>
    </html>
  );
}
